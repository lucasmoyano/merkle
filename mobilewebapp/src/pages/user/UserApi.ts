import Uuid from 'uuid';
import FirebaseUtil from '../../utils/FirebaseUtil';
import User from "./User";

export default class UserApi {

  /** Save User */
  static async save(user: User): Promise<Boolean> {
    let isNew: boolean = !user.id;
    user.id = user.id || Uuid.v4();

    if (user.email && user.password) {
      let email: string = user.email.toLowerCase();
      let password: string = user.password;
      let result: any;

      if (isNew) {
        result = await FirebaseUtil.register(email, password);
        if (result) {
          await FirebaseUtil.save('user', user.id, user);
        }
      } else {
        await FirebaseUtil.save('user', user.id, user);
      }

      return result;
    }
    return false;
  }

  public static async remove(userId: string | undefined) {
    if (userId) {
      await FirebaseUtil.remove('user', userId);
    }
    return true;
  }

  /**
   * Search of users
   */
  public static search = async (search: string = '', lastElement: any = null, pageSize: number = 50): Promise<User[]> => {

    let queries: any[] = [];

    if (search) {
      queries = [
        ['firstname', '=*', search],
        ['lastname', '=*', search],
        ['email', '=*', search],
        ['phone', '=*', search]
      ];
    }
    return FirebaseUtil.searchWithOr('user', queries, 'firstname', 'asc', lastElement, pageSize);
  }

}