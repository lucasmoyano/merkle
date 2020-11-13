import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonToolbar
} from '@ionic/react';
import React from 'react';

const Header: React.FC = () => {

  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>

      </IonToolbar>

    </IonHeader>
  );
};

export default Header;
