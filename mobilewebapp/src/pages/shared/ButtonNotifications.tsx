import {
  IonBadge, IonButton,

  IonIcon,
  IonItem,
  IonLabel, IonList,

  IonPopover
} from '@ionic/react';
import { notifications } from 'ionicons/icons';
import React, { useState } from 'react';

const ButtonNotifications: React.FC = () => {

  const [showPopover, setShowPopover] = useState<{ open: boolean, event: Event | undefined }>({
    open: false,
    event: undefined,
  });

  return (
    <>

      <IonPopover
        isOpen={showPopover.open}
        event={showPopover.event}
        mode="ios"
        onDidDismiss={e => setShowPopover({ open: false, event: undefined })}
      >

        <IonList>

          <IonItem button>
            <IonLabel>Editar Perfil Editar Perfil<br /> Editar Perfil</IonLabel>
          </IonItem>

          <IonItem button>
            <IonLabel>Cerrar Sesión</IonLabel>
          </IonItem>

        </IonList>

      </IonPopover>


      <IonButton onClick={(e) => setShowPopover({ open: true, event: e.nativeEvent })}>
        <IonIcon slot="icon-only" icon={notifications} />
        <IonBadge color="danger" style={{ position: 'absolute', right: '7px', top: '4px', borderRadius: '10px', height: '19px' }}>1</IonBadge>
      </IonButton>

    </>
  );
};

export default ButtonNotifications;
