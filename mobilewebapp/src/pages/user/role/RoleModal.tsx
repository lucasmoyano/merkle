import {
  IonButton,
  IonCol,
  IonIcon,
  IonItem,

  IonLabel,
  IonList,
  IonModal, IonRow, IonTitle, IonToggle
} from '@ionic/react';
import { arrowBack, checkmark, people } from 'ionicons/icons';
import React, { useState } from 'react';
import InputText from '../../../components/forms/InputText';
import i18n from '../../../languages/i18n';
import Role from './Role';
import RoleApi from './RoleApi';

interface Props {
  isOpen: boolean;
  role: Role;
  onClose: (role: Role | null) => void;
}

export default function RoleProfile(props: Props) {

  const [searchText, setSearchText] = useState<string>('');
  const [checked, setChecked] = useState(false);

  const { role } = props;

  const addRole = () => {
    window.location.href = '/role/add';
  }

  const save = () => {
    RoleApi.save(role).then(() => {
      props.onClose(role);
    });
  }

  const renderPermission = (property: string) => {
    role.permissions = role.permissions || {};
    const permissions: any = role.permissions;

    return (
      <IonItem>
        <IonLabel>{i18n.t(`role.permissions.${property}`)}</IonLabel>
        <IonToggle checked={permissions[property]} onIonChange={e => permissions[property] = (e.detail.checked)} />
      </IonItem>
    );
  }

  return (
    <IonModal
      isOpen={props.isOpen}
      backdropDismiss={true}

      // swipeToClose={true}
      // presentingElement={router || undefined}
      onDidDismiss={() => props.onClose(null)}>
      <IonRow>
        <IonCol size="12">
          <IonTitle size="large">{role.id ? i18n.t('role.editRole') : i18n.t('role.addRole')}</IonTitle>
        </IonCol>

        <IonCol size="12">
          <IonRow>
            <InputText icon={people} label={i18n.t('role.name')}
              placeholder={i18n.t('role.placeholder.name')}
              value={role.name} onChange={value => role.name = value} />
          </IonRow>

          <IonList>
            {renderPermission('editPatients')}
            {renderPermission('editCalendar')}
            {renderPermission('editCashFlow')}
            {renderPermission('editConfig')}
            {renderPermission('editUsers')}
            {renderPermission('viewReports')}
          </IonList>
        </IonCol>
      </IonRow>

      <IonRow className="ion-text-right">
        <IonCol className="ion-float-right">

          <IonButton fill="outline" onClick={() => props.onClose(null)}>
            <IonIcon icon={arrowBack} slot="start" /> {i18n.t('button.cancel')}
          </IonButton>

          <IonButton color="success" onClick={save}>
            <IonIcon icon={checkmark} slot="start" /> {i18n.t('button.save')}
          </IonButton>

        </IonCol>
      </IonRow>

    </IonModal>
  );
};