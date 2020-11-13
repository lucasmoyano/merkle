import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol, IonContent,
  IonFab,
  IonFabButton, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonToolbar
} from '@ionic/react';
import { add, search as searchIcon } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import DialogUtil from '../../../components/forms/DialogUtil';
import InputText from '../../../components/forms/InputText';
import useForceUpdate from '../../../hooks/useForceUpdate';
import i18n from '../../../languages/i18n';
import ArrayUtil from '../../../utils/ArrayUtil';
import { clone, executeLastCallWithDelay } from '../../../utils/CommonUtils';
import EditButtons from '../../shared/EditButtons';
import Header from '../../shared/Header';
import Role from './Role';
import RoleApi from './RoleApi';
import RoleModal from './RoleModal';

export default function RoleList() {

  const forceUpdate = useForceUpdate();
  const [roles, setRoles] = useState<Role[]>([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>(RoleApi.getNewRole());

  const [searchText, setSearchText] = useState<string>('');
  const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false);
  const page = useRef<number>(1);
  const PAGE_SIZE = 50;

  useEffect(() => {
    search();
  }, []);

  /** Open a modal to create a new role */
  const create = () => {
    setModalIsOpen(true);
    setSelectedRole(RoleApi.getNewRole());
  }

  /** Open modal and edit selected role */
  const edit = (role: Role) => {
    setModalIsOpen(true);
    setSelectedRole(clone(role));
  }

  /** Delete selected role */
  const remove = async (role: Role) => {
    if (await RoleApi.remove(role.id)) {
      ArrayUtil.remove(roles, role);
      DialogUtil.showToast(i18n.t('alert.removed'));
      forceUpdate();
    }
  }

  /** Search roles by text */
  const search = async (text: string = '') => {
    let lastElement: any = roles.length > 0 && page.current > 0 ? roles[roles.length - 1] : null;
    let result: Role[] = await RoleApi.search(text, lastElement, PAGE_SIZE);
    setRoles([...roles, ...result]);
    setDisableInfiniteScroll(result.length < PAGE_SIZE);
  }

  const onChangeTextSearch = (text: string) => {
    setSearchText(text);
    executeLastCallWithDelay(() => {
      page.current = 0;
      search(text);
    });
  }

  /** Close modal and update role */
  const closeModal = (role: Role | null) => {
    setModalIsOpen(false);
    if (role) {
      ArrayUtil.addOrUpdate(roles, role, (x: Role) => x.id == role.id);
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

  /** Render the table of results */
  const renderTable = () => {
    return <>
      <div className="table-striped">
        <IonRow>
          <IonCol size="10">
            <b>{i18n.t('role.name')}</b>
          </IonCol>

          <IonCol size="2"></IonCol>
        </IonRow>

        {roles.map((role, index) =>
          <IonRow key={index}>
            <IonCol size="10">
              <IonLabel onClick={() => edit(role)}>{role.name}</IonLabel>
            </IonCol>

            <IonCol size="2">
              <EditButtons onEdit={() => edit(role)} onRemove={() => remove(role)} />
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
            <IonSegment value="roles">
              <IonSegmentButton value="users" onClick={() => window.location.href = '/user'}>{i18n.t('menu.users')}</IonSegmentButton>
              <IonSegmentButton value="roles">{i18n.t('menu.roles')}</IonSegmentButton>
            </IonSegment>
          </IonToolbar>
        </IonCol>
      </IonRow>

      <IonContent>
        <IonCard>
          <IonCardContent>
            <RoleModal isOpen={modalIsOpen} role={selectedRole} onClose={closeModal} />

            <IonRow>
              <InputText value={searchText} onChange={onChangeTextSearch} icon={searchIcon}
                label={i18n.t('form.search')} placeholder={i18n.t('form.search.placeholder')} />

              <IonCol className="ion-hide-down">
                <IonButton onClick={create} color="primary" fill="solid" className="ion-float-right">
                  <IonIcon icon={add} slot="start" /> {i18n.t('role.create')}
                </IonButton>
              </IonCol>
            </IonRow>

            <IonFab slot="fixed" className="ion-hide-md-up"
              style={{ position: 'fixed', right: 20, bottom: 55 }}>
              <IonFabButton onClick={create}><IonIcon icon={add} /></IonFabButton>
            </IonFab>

            {roles.length > 0 && renderTable()}
            {roles.length == 0 &&
              <IonRow style={{ padding: '40px 0' }}>{i18n.t('form.searchNoResults')}</IonRow>
            }
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}