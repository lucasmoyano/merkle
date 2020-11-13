import {
  IonCard,
  IonCardContent,
  IonContent,
  IonImg,


  IonPage
} from '@ionic/react';
import React from 'react';
import DialogUtil from '../../components/forms/DialogUtil';
import ImgLogo from './images/logo.png';
import './LoginWrapper.css';

const LoginWrapper: React.FC = (props: any) => {

  return (
    <IonPage>

      <IonContent className="auth-page">

        <DialogUtil />

        <IonCard>
          <IonCardContent>

            <IonImg src={ImgLogo} className="logo" />

            {props.children}

          </IonCardContent>
        </IonCard>


      </IonContent>
    </IonPage >
  );
};

export default LoginWrapper;
