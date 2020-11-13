import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel
} from '@ionic/react';
import { logoFacebook, logoGoogle } from 'ionicons/icons';
import React, { useRef, useState } from 'react';
import DialogUtil from '../../components/forms/DialogUtil';
import i18n from '../../languages/i18n';
import FirebaseUtil from '../../utils/FirebaseUtil';
import LoginWrapper from './LoginWrapper';

const Login: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const form = useRef<any>(null);

  const login = async () => {
    if (!isValid()) { return; }
    let credentials: any = await FirebaseUtil.loginWithEmail(email, password);
    console.log(credentials);

    if (credentials) {
      if (credentials.user.emailVerified == false) {
        DialogUtil.showAlert(i18n.t('login.errorVerifyEmail'));
      } else {
        window.location.href = 'home';
      }
    }
  }

  const isValid = () => {
    return form.current.reportValidity();
  }


  const onPressEnter = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      login();
    }
  }

  return (
    <LoginWrapper>

      <form ref={form} onKeyPress={onPressEnter}>
        <IonButton size="default" className="btn-facebook" onClick={() => { FirebaseUtil.loginWithFacebook(); }}>
          <IonIcon slot="icon-only" icon={logoFacebook} />
          {i18n.t('login.loginFacebook')}
        </IonButton>

        <IonButton size="default" className="btn-google" onClick={() => { FirebaseUtil.loginWithGoogle(); }}>
          <IonIcon slot="icon-only" icon={logoGoogle} />
          {i18n.t('login.loginGoogle')}
        </IonButton>

        <span className="or">{i18n.t('login.or')}</span>

        <IonItem>
          <IonLabel position="floating">
            {i18n.t('user.email')}
          </IonLabel>
          <IonInput value={email} type="email" onIonInput={(e: any) => setEmail(e.target.value)} required={true} />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">
            {i18n.t('login.password')}
          </IonLabel>
          <IonInput value={password} onIonInput={(e: any) => setPassword(e.target.value)} type="password" required={true} minlength={6} />
        </IonItem>


        <div className="login-buttons">
          <IonButton fill="outline" onClick={() => {
            window.location.href = 'register';
          }}>
            {i18n.t('login.registerButton')}
          </IonButton>

          <IonButton onClick={login}>
            {i18n.t('login.loginLabel')}
          </IonButton>

          <a onClick={() => {
            window.location.href = 'reset-password';
          }}>
            {i18n.t('login.requestResetPassword')}
          </a>

        </div>


        {/* <IonSelect>
              <IonSelectOption>English</IonSelectOption>
              <IonSelectOption>Portugues</IonSelectOption>
              <IonSelectOption>Español</IonSelectOption>
              <IonSelectOption>Italiano</IonSelectOption>
              <IonSelectOption>Frances</IonSelectOption>
            </IonSelect> */}
      </form>
    </LoginWrapper >
  );
};

export default Login;
