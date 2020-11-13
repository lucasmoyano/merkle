import {
  IonAvatar,
  IonButton,

  IonIcon,
  IonItem,
  IonLabel, IonList,

  IonPopover
} from '@ionic/react';
import { logOut, person } from 'ionicons/icons';
import React, { useState } from 'react';
import FirebaseUtil from '../../utils/FirebaseUtil';

const ButtonProfile: React.FC = () => {

  const [showPopover, setShowPopover] = useState<{ open: boolean, event: Event | undefined }>({
    open: false,
    event: undefined,
  });

  const logout = () => {
    FirebaseUtil.logout();
  }

  return (
    <>

      <IonPopover
        isOpen={showPopover.open}
        event={showPopover.event}
        mode="ios"
        onDidDismiss={e => setShowPopover({ open: false, event: undefined })}
      >

        <div className="ion-text-center">
          <IonAvatar style={{ border: '2px solid lime', margin: '10px auto' }}>
            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
          </IonAvatar>

          <IonLabel>Lucas Moyano</IonLabel>
        </div>

        <IonList>

          <IonItem button>
            <IonIcon slot="start" icon={person} />
            <IonLabel>Editar Perfil</IonLabel>
          </IonItem>

          <IonItem button onClick={logout}>
            <IonIcon slot="start" icon={logOut} />
            <IonLabel>Cerrar Sesión</IonLabel>
          </IonItem>

        </IonList>

      </IonPopover>

      <IonButton onClick={(e) => setShowPopover({ open: true, event: e.nativeEvent })}>

        <IonAvatar style={{ transform: "scale(0.5)", border: '6px solid lime' }}>
          <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
        </IonAvatar>
      </IonButton>

    </>
  );
};

export default ButtonProfile;
