import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCol, IonContent,
  IonFab,
  IonFabButton, IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonToolbar
} from '@ionic/react';
import { add, search as searchIcon } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import DialogUtil from '../../components/forms/DialogUtil';
import InputText from '../../components/forms/InputText';
import useForceUpdate from '../../hooks/useForceUpdate';
import i18n from '../../languages/i18n';
import ArrayUtil from '../../utils/ArrayUtil';
import { clone, executeLastCallWithDelay } from '../../utils/CommonUtils';
import EditButtons from '../shared/EditButtons';
import Header from '../shared/Header';
import User from './User';
import UserApi from './UserApi';
import UserProfile from './UserProfile';



export default function UserList() {

  const forceUpdate = useForceUpdate();
  const [users, setUsers] = useState<User[]>([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalUser, setModalUser] = useState<User>({});

  const [searchText, setSearchText] = useState<string>('');
  const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false);
  const page = useRef<number>(1);
  const PAGE_SIZE = 50;

  useEffect(() => {
    search();
  }, []);

  /** Open a modal to create a new user */
  const create = () => {
    setModalIsOpen(true);
    setModalUser({});
  }

  /** Open modal and edit selected user */
  const edit = (user: User) => {
    setModalIsOpen(true);
    setModalUser(clone(user));
  }

  /** Delete selected user */
  const remove = async (user: User) => {
    if (await UserApi.remove(user.id)) {
      ArrayUtil.remove(users, user);
      DialogUtil.showToast(i18n.t('alert.removed'));
      forceUpdate();
    }
  }

  /** Search users by text */
  const search = async (text: string = '') => {
    let lastElement: any = users.length > 0 && page.current > 0 ? users[users.length - 1] : null;
    let result: User[] = await UserApi.search(text, lastElement, PAGE_SIZE);
    setUsers([...users, ...result]);
    setDisableInfiniteScroll(result.length < PAGE_SIZE);
  }

  const onChangeTextSearch = (text: string) => {
    setSearchText(text);
    executeLastCallWithDelay(() => {
      page.current = 0;
      search(text);
    });
  }

  /** Close modal and update user */
  const closeModal = (user: User | null) => {
    setModalIsOpen(false);
    if (user) {
      ArrayUtil.addOrUpdate(users, user, (x: User) => x.id == user.id);
      DialogUtil.showToast();
      forceUpdate();
    }
  }

  /** Load next results of search */
  async function searchNext(event: CustomEvent<void>) {
    page.current++;
    await search(searchText);
    (event.target as HTMLIonInfiniteScrollElement).complete();
  }

  const renderTable = () => {
    return <>

      <div className="table-striped">
        <IonRow>
          <IonCol sizeSm="1">
          </IonCol>

          <IonCol size="6" sizeSm="2">
            <b>{i18n.t('user.fullname')}</b>
          </IonCol>

          <IonCol sizeSm="2" className="ion-hide-down">
            <b>{i18n.t('user.phone')}</b>
          </IonCol>

          <IonCol sizeSm="3" className="ion-hide-down">
            <b>{i18n.t('user.email')}</b>
          </IonCol>

          <IonCol sizeSm="2" className="ion-hide-sm-down">
            <b>{i18n.t('user.user')}</b>
          </IonCol>

          <IonCol sizeSm="2">
          </IonCol>

        </IonRow>

        {users.map(user =>
          <IonRow>
            <IonCol sizeSm="1">
              <IonAvatar className="small">
                <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
              </IonAvatar>
            </IonCol>

            <IonCol size="6" sizeSm="2">
              <IonLabel onClick={() => edit(user)}>{user.firstname} {user.lastname}</IonLabel>
            </IonCol>

            <IonCol sizeSm="2" className="ion-hide-down">
              <IonLabel>{user.phone}</IonLabel>
            </IonCol>

            <IonCol sizeSm="3" className="ion-hide-down">
              <IonLabel>{user.email}</IonLabel>
            </IonCol>

            <IonCol sizeSm="2" className="ion-hide-sm-down">
              <IonLabel>Administrador</IonLabel>
            </IonCol>

            <IonCol sizeSm="2">
              <EditButtons onEdit={() => edit(user)} onRemove={() => remove(user)} />
            </IonCol>

          </IonRow>
        )}

        <IonInfiniteScroll threshold="100px" disabled={disableInfiniteScroll}
          onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}>
          <IonInfiniteScrollContent loadingText="Loading..." />
        </IonInfiniteScroll>
      </div>
    </>;
  }

  return (
    <IonPage>
      <Header />
      <IonRow>
        <IonCol size="12" sizeMd="4">
          <IonToolbar>
            <IonSegment value="users">
              <IonSegmentButton value="users">{i18n.t('menu.users')}</IonSegmentButton>
              <IonSegmentButton value="users" onClick={() => window.location.href = '/user'}>{i18n.t('menu.users')}</IonSegmentButton>
            </IonSegment>
          </IonToolbar>
        </IonCol>
      </IonRow>

      <IonContent>
        <IonCard>
          <IonCardContent>
            <UserProfile isOpen={modalIsOpen} user={modalUser} onClose={closeModal} />

            <IonRow>
              <InputText value={searchText} onChange={onChangeTextSearch} icon={searchIcon}
                label={i18n.t('form.search')} placeholder={i18n.t('form.search.placeholder')} />

              <IonCol className="ion-hide-down">
                <IonButton onClick={create} color="primary" fill="solid" className="ion-float-right">
                  <IonIcon icon={add} slot="start" /> {i18n.t('user.addUser')}
                </IonButton>
              </IonCol>

            </IonRow>

            <IonFab slot="fixed" className="ion-hide-md-up"
              style={{ position: 'fixed', right: 20, bottom: 55 }}>
              <IonFabButton onClick={create}><IonIcon icon={add} /></IonFabButton>
            </IonFab>

            {users.length > 0 && renderTable()}
            {users.length == 0 &&
              <IonRow style={{ padding: '40px 0' }}>{i18n.t('form.searchNoResults')}</IonRow>
            }

          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}