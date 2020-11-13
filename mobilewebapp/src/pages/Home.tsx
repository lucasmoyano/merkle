import {
  IonAvatar,
  IonButton, IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol, IonContent,
  IonFab,
  IonFabButton, IonIcon,
  IonLabel,
  IonPage,
  IonRow
} from '@ionic/react';
import { add, close, eye, search } from 'ionicons/icons';
import React, { useState } from 'react';
import InputText from '../components/forms/InputText';
import Pagination from '../components/forms/Pagination';
import './Home.css';
import PatientProfile from './patient/PatientProfile';
import Header from './shared/Header';

const HomePage: React.FC = () => {

  const [searchText, setSearchText] = useState<string>('');

  return (

    <IonPage>
      <Header />
      <IonContent>

        <IonCard>

          <IonCardContent>
            {/* <IonTitle>Pacientes</IonTitle> */}
            <IonRow>
              <InputText value={searchText} icon={search} label="Buscar" placeholder="Ingrese la Búsqueda" />

              <IonCol>
                <IonButton color="primary" fill="solid" className="ion-float-right">
                  <IonIcon icon={add} slot="start" /> Agregar paciente
                </IonButton>
              </IonCol>

            </IonRow>

            <IonFab slot="fixed" style={{ position: 'fixed', right: 30, bottom: 55 }}>
              <IonFabButton><IonIcon icon={add} /></IonFabButton>
            </IonFab>


            <div className="table-striped">
              <IonRow>
                <IonCol sizeLg="1">
                </IonCol>

                <IonCol sizeLg="2">
                  <b>Nombre</b>
                </IonCol>

                <IonCol sizeLg="2" className="ion-hide-sm-down">
                  <b>Teléfono</b>
                </IonCol>

                <IonCol sizeLg="3" className="ion-hide-sm-down">
                  <b>Email</b>
                </IonCol>

                <IonCol sizeLg="2" className="ion-hide-sm-down">
                  <b>Rol de Usuario</b>
                </IonCol>

                <IonCol sizeLg="2">
                </IonCol>

              </IonRow>

              <IonRow>
                <IonCol sizeLg="1">
                  <IonAvatar className="small">
                    <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                  </IonAvatar>
                </IonCol>

                <IonCol sizeLg="2">
                  <IonLabel>Martin</IonLabel>
                </IonCol>

                <IonCol sizeLg="2" className="ion-hide-sm-down">
                  <IonLabel>+234234234234</IonLabel>
                </IonCol>

                <IonCol sizeLg="3" className="ion-hide-sm-down">
                  <IonLabel>lucasmoyano.ar@gmail.com</IonLabel>
                </IonCol>

                <IonCol sizeLg="2" className="ion-hide-sm-down">
                  <IonLabel>Administrador</IonLabel>
                </IonCol>

                <IonCol sizeLg="2">
                  <IonButtons>
                    <IonButton>
                      <IonIcon slot="icon-only" color="primary" icon={eye} />
                    </IonButton>
                    <IonButton>
                      <IonIcon slot="icon-only" color="danger" icon={close} />
                    </IonButton>
                  </IonButtons>
                </IonCol>

              </IonRow>


              <IonRow>
                <IonCol sizeLg="1">
                  <IonAvatar className="small">
                    <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                  </IonAvatar>
                </IonCol>

                <IonCol sizeLg="2">
                  <IonLabel>Martin</IonLabel>
                </IonCol>

                <IonCol sizeLg="2" className="ion-hide-sm-down">
                  <IonLabel>+234234234234</IonLabel>
                </IonCol>

                <IonCol sizeLg="3" className="ion-hide-sm-down">
                  <IonLabel>lucasmoyano.ar@gmail.com</IonLabel>
                </IonCol>

                <IonCol sizeLg="2" className="ion-hide-sm-down">
                  <IonLabel>Administrador</IonLabel>
                </IonCol>

                <IonCol sizeLg="2">
                  <IonButtons>
                    <IonButton>
                      <IonIcon slot="icon-only" color="primary" icon={eye} />
                    </IonButton>
                    <IonButton>
                      <IonIcon slot="icon-only" color="danger" icon={close} />
                    </IonButton>
                  </IonButtons>
                </IonCol>

              </IonRow>


            </div>


            <IonRow className="ion-float-right">
              <Pagination page={2} totalPages={6} onChange={() => { }} />
            </IonRow>

          </IonCardContent>
        </IonCard>


        <IonCard className="welcome-card">
          <IonCardHeader>
            <IonCardTitle>Welcome to Ionic</IonCardTitle>
            <IonCardSubtitle>Get Started</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <PatientProfile />

          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
