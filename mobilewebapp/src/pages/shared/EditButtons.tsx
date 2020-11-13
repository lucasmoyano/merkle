import {
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonLabel, IonList,
  IonPopover
} from '@ionic/react';
import { close, create, more } from 'ionicons/icons';
import React, { useState } from 'react';
import DialogUtil from '../../components/forms/DialogUtil';

interface Props {
  onEdit: () => void;
  onRemove: () => void;
}

export default function EditButtons(props: Props) {

  const [showPopover, setShowPopover] = useState<{ open: boolean, event: Event | undefined }>({
    open: false,
    event: undefined,
  });

  const remove = (e: any) => {
    setShowPopover({ open: false, event: e.nativeEvent });
    DialogUtil.confirm(async () => {
      props.onRemove();
    });
  }

  return (
    <>

      <IonPopover
        isOpen={showPopover.open}
        event={showPopover.event}
        mode="ios"
        onDidDismiss={e => setShowPopover({ open: false, event: undefined })}
      >

        <IonList>

          <IonItem button onClick={(e) => {
            setShowPopover({ open: false, event: e.nativeEvent });
            props.onEdit();
          }}>
            <IonLabel>Editar</IonLabel>
            <IonButtons>
              <IonButton>
                <IonIcon slot="icon-only" color="primary" icon={create} />
              </IonButton>
            </IonButtons>
          </IonItem>

          <IonItem button onClick={remove}>
            <IonLabel>Eliminar</IonLabel>
            <IonButtons>
              <IonButton>
                <IonIcon slot="icon-only" color="danger" icon={close} />
              </IonButton>
            </IonButtons>
          </IonItem>

        </IonList>

      </IonPopover>


      <IonButtons>
        <IonButton className="ion-hide-sm-up" onClick={(e) => setShowPopover({ open: true, event: e.nativeEvent })}>
          <IonIcon slot="icon-only" color="primary" icon={more} />
        </IonButton>

        <IonButton className="ion-hide-down" onClick={() => props.onEdit()}>
          <IonIcon slot="icon-only" color="primary" icon={create} />
        </IonButton>

        <IonButton className="ion-hide-down" onClick={remove}>
          <IonIcon slot="icon-only" color="danger" icon={close} />
        </IonButton>
      </IonButtons>


    </>
  );
}