import firebase from 'firebase';
import DialogUtil from '../components/forms/DialogUtil';
import ProgressBar from '../components/ProgressBar';
import i18n from '../languages/i18n';
import { mergeArrays } from './CommonUtils';

export default class FirebaseUtil {

  // private static fire: firabase.app.App;

  public static config(firebaseConfig: any) {
    firebase.initializeApp(firebaseConfig);
  }

  public static logout() {
    return firebase.auth().signOut();
  }

  public static getCurrentUser() {
    return firebase.auth().currentUser;
  }

  public static register(email: string, pass: string): Promise<Boolean> {
    return new Promise(resolve => {

      firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then((result) => {
          result.user?.sendEmailVerification();
          DialogUtil.showAlert(i18n.t('register.completed.description'), i18n.t('register.completed.title'));
          resolve(true);
        }).catch(function (error) {
          if (error.code == 'auth/email-already-in-use') {
            DialogUtil.showAlert(i18n.t('register.emailAlreadyExists'));
          } else {
            DialogUtil.showAlert(error.message);
          }
          resolve(false);
        });

    });
  }


  public static resetPassword(email: string) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  public static loginWithEmail(email: string, pass: string) {
    return new Promise(resolve => {

      firebase.auth().signInWithEmailAndPassword(email, pass)
        .then((result) => {
          resolve(result);
        }).catch(function (error) {
          if (error.code == 'auth/user-not-found') {
            DialogUtil.showAlert(i18n.t('login.error'));
          }
          else if (error.code == 'auth/wrong-password') {
            DialogUtil.showAlert(i18n.t('login.error'));
          } else {
            DialogUtil.showAlert(error.message);
          }
          resolve(false);
        });

    });
  }

  public static loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return this.login(provider);
  }

  public static loginWithFacebook() {
    let provider = new firebase.auth.FacebookAuthProvider();
    return this.login(provider);
  }

  private static login(provider: any) {
    return firebase.auth().signInWithPopup(provider)
      .then((result: any) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }

  public static save = async (table: string, id: string, json: any) => {
    ProgressBar.enable();
    await firebase.firestore().collection(table).doc(id).set(json);
    ProgressBar.disable();
    return true;
  };

  public static get = async (table: string, id: string) => {
    ProgressBar.enable();
    const docRef = firebase.firestore().collection(table).doc(id);
    let result = docRef.get();
    ProgressBar.disable();
    return result;
  };

  static async remove(table: string, id: string) {
    ProgressBar.enable();
    await firebase.firestore().collection(table).doc(id).delete();
    ProgressBar.disable();
  }

  /**
   * Make a search of documents in firestore
   */
  public static search = async (table: string, queries: any[] = [], orderBy: string = '', orderType: 'asc' | 'desc' = 'asc', lastElement: any, pageSize: number = 50) => {
    let result: any = [];
    let collection = firebase.firestore().collection(table);

    const QUERY_FIELD = 0;
    const QUERY_OPERATOR = 1;
    const QUERY_VALUE = 2;

    ProgressBar.enable();

    let query: any = collection;
    if (queries.length > 0) {
      for (let queryArray of queries) {
        if (queryArray[QUERY_OPERATOR] == '=*') {
          query = query.where(queryArray[QUERY_FIELD], '>=', queryArray[QUERY_VALUE].toLowerCase());
          query = query.where(queryArray[QUERY_FIELD], '<=', queryArray[QUERY_VALUE].toLowerCase() + '~');
        } else {
          query = query.where(queryArray[QUERY_FIELD], queryArray[QUERY_OPERATOR], queryArray[QUERY_VALUE]);
        }
      }
    }
    if (orderBy && orderType) {
      query = query.orderBy(orderBy, orderType);
    }

    if (lastElement) {
      query = query.startAfter(lastElement[orderBy]);
    }
    query = query.limit(pageSize);


    let elements = await query?.get();
    elements?.forEach((snap: any) => {
      result.push(snap.data());
    })

    ProgressBar.disable();
    return result;
  }


  /**
   * Make a search with OR statement.
   */
  public static searchWithOr = async (table: string, queries: any[] = [], orderBy: string = '', orderType: 'asc' | 'desc' = 'asc', lastElement: any, pageSize: number = 50) => {
    let resultMerged: any[] = [];

    if (queries.length > 0) {
      for (let query of queries) {
        let result = await FirebaseUtil.search(table, [query], orderBy, orderType, lastElement, pageSize);
        resultMerged = mergeArrays(result, resultMerged, 'id');
      }
    } else {
      return await FirebaseUtil.search(table, [], orderBy, orderType, lastElement, pageSize);
    }
    resultMerged.length = resultMerged.length >= pageSize ? pageSize : resultMerged.length;
    return resultMerged;
  }

}