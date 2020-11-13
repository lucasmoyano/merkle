import {
  IonButton,

  IonInput,
  IonItem,
  IonLabel
} from '@ionic/react';
import React, { useRef, useState } from 'react';
import DialogUtil from '../../components/forms/DialogUtil';
import i18n from '../../languages/i18n';
import FirebaseUtil from '../../utils/FirebaseUtil';
import LoginWrapper from './LoginWrapper';

const ResetPassword: React.FC = () => {

  const [email, setEmail] = useState('');
  const form = useRef<any>(null);

  const sendEmailToResetPassword = () => {
    if (isValid()) {
      FirebaseUtil.resetPassword(email);
      DialogUtil.showAlert(
        i18n.t('resetPassword.emailSent'),
        i18n.t('resetPassword.resetTitle'),
        () => window.location.href = 'login'
      );
    }
  }

  const isValid = () => {
    return form.current.reportValidity();
  }

  const onPressEnter = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      sendEmailToResetPassword();
    }
  }

  return (
    <LoginWrapper>

      <form ref={form} onKeyPress={onPressEnter}>
        <p>
          {i18n.t('resetPassword.help')}
        </p>

        <IonItem>
          <IonLabel position="floating">
            {i18n.t('user.email')} *
          </IonLabel>
          <IonInput value={email} type="email" onIonInput={(e: any) => setEmail(e.target.value)} required={true} />
        </IonItem>
        <br />

        <div className="login-buttons">
          <IonButton fill="outline" onClick={() => {
            window.location.href = 'login';
          }}>
            {i18n.t('button.back')}
          </IonButton>

          <IonButton onClick={() => sendEmailToResetPassword()}>
            {i18n.t('resetPassword.resetTitle')}
          </IonButton>
        </div>
      </form>
    </LoginWrapper >
  );
};

export default ResetPassword;
