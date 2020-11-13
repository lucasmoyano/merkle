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

const Register: React.FC = () => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const form = useRef<any>(null);

  const registerWithEmail = async () => {
    if (isValid()) {
      if (await FirebaseUtil.register(email, password)) {
        window.location.href = 'login'
      }
    }
  }

  const registerWithGoogle = () => {
    FirebaseUtil.loginWithGoogle();
  }

  const registerWithFacebook = () => {
    FirebaseUtil.loginWithFacebook();
  }

  const onPressEnter = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      registerWithEmail();
    }
  }

  const isValid = () => {
    let isValid: boolean = false;
    isValid = form.current.reportValidity();
    if (isValid && password != repeatPassword) {
      DialogUtil.showAlert(i18n.t('register.validation.repeatPassword'));
      isValid = false;
    }
    return isValid;
  }

  return (
    <LoginWrapper>
      <form ref={form} onKeyPress={onPressEnter}>
        <IonButton size="default" className="btn-facebook" onClick={registerWithFacebook}>
          <IonIcon slot="icon-only" icon={logoFacebook} />
          {i18n.t('register.facebook')}
        </IonButton>

        <IonButton size="default" className="btn-google" onClick={registerWithGoogle}>
          <IonIcon slot="icon-only" icon={logoGoogle} />
          {i18n.t('register.google')}
        </IonButton>

        <span className="or">{i18n.t('login.or')}</span>


        <IonItem>
          <IonLabel position="floating">
            {i18n.t('user.firstname')} *
          </IonLabel>
          <IonInput value={firstname} onIonInput={(e: any) => setFirstname(e.target.value)} required={true} />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">
            {i18n.t('user.lastname')} *
          </IonLabel>
          <IonInput value={lastname} onIonInput={(e: any) => setLastname(e.target.value)} required={true} />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">
            {i18n.t('user.email')} *
          </IonLabel>
          <IonInput value={email} type="email" onIonInput={(e: any) => setEmail(e.target.value)} required={true} />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">
            {i18n.t('login.password')} *
          </IonLabel>
          <IonInput value={password} onIonInput={(e: any) => setPassword(e.target.value)} type="password" required={true} minlength={6} />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">
            {i18n.t('register.repeatPassword')} *
          </IonLabel>
          <IonInput value={repeatPassword} onIonInput={(e: any) => setRepeatPassword(e.target.value)} type="password" required={true} minlength={6} />
        </IonItem>


        <div className="login-buttons">
          <IonButton fill="outline" onClick={() => { window.location.href = 'login'; }}>
            {i18n.t('button.back')}
          </IonButton>

          <IonButton onClick={registerWithEmail}>
            {i18n.t('login.registerButton')}
          </IonButton>
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

export default Register;
