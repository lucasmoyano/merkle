import {
  IonButton,


  IonCol,


  IonIcon,


  IonModal, IonRow, IonTitle
} from '@ionic/react';
import { arrowBack, checkmark, key, mail, people, person, phonePortrait } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import Avatar from '../../components/forms/Avatar';
import InputText from '../../components/forms/InputText';
import Select from '../../components/forms/Select';
import i18n from '../../languages/i18n';
import Role from './role/Role';
import RoleApi from './role/RoleApi';
import User from './User';
import UserApi from './UserApi';

interface Props {
  isOpen: boolean;
  user: User;
  onClose: (user: User | null) => void;
}

export default function UserProfile(props: Props) {

  const [roles, setRoles] = useState<Role[]>([]);

  const { user } = props;

  useEffect(() => {
    loadRoles();
  });

  const loadRoles = async () => {
    setRoles(await RoleApi.search());
  }

  const save = () => {
    UserApi.save(user).then(() => {
      props.onClose(user);
    });
  }

  return (
    <IonModal
      isOpen={props.isOpen}
      backdropDismiss={true}

      onDidDismiss={() => props.onClose(null)}>
      <IonRow>
        <IonCol size="12">
          <IonTitle size="large">{user.id ? i18n.t('user.editUser') : i18n.t('user.addUser')}</IonTitle>
        </IonCol>

        <IonCol size="12">
          <IonRow className="ion-text-center">
            <Avatar url={"https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"} />
          </IonRow>
        </IonCol>

        <IonCol size="12">

          <IonRow>
            <InputText icon={mail} label={i18n.t('user.email')}
              placeholder={i18n.t('user.placeholder.email')}
              value={user.email} onChange={value => {
                // alert(value)
                user.email = value;
              }} />

            <InputText icon={key} label={i18n.t('login.password')} type="password"
              value={user.password} onChange={value => user.password = value} />
          </IonRow>

          <IonRow>
            <InputText icon={person} label={i18n.t('user.firstname')}
              placeholder={i18n.t('user.placeholder.firstname')}
              value={user.firstname} onChange={value => user.firstname = value} />

            <InputText label={i18n.t('user.lastname')} placeholder={i18n.t('user.placeholder.lastname')}
              value={user.lastname} onChange={value => user.lastname = value} />
          </IonRow>

          <IonRow>
            <InputText icon={phonePortrait} label={i18n.t('user.phone')}
              placeholder={i18n.t('user.placeholder.phone')}
              value={user.phone} onChange={value => user.phone = value} />

            <Select icon={people} label={i18n.t('user.role')}
              placeholder={i18n.t('user.placeholder.role')}
              elements={roles}
              value={user.roleId} onChange={value => user.roleId = "" + value} />

          </IonRow>

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