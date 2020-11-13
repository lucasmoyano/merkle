import { IonAvatar, IonButton, IonCard, IonCardContent, IonCol, IonIcon, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption } from '@ionic/react';
import { checkmark, close, mail, person } from 'ionicons/icons';
import React, { useState } from 'react';
import InputText from '../../components/forms/InputText';



const PatientProfile: React.FC = () => {

  const [text, setText] = useState("");

  return (
    <IonCard>
      <IonCardContent>

        <IonRow>
          <IonCol size="12" sizeMd="2">

            <IonAvatar className="big">
              <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
            </IonAvatar>
          </IonCol>

          <IonCol size="12" sizeMd="10">
            <IonRow>

              <InputText value={"searchText"} icon={person} />
              <InputText value={"searchText"} label="Apellido" placeholder="Ingrese el Apellido" />

            </IonRow>

            <IonRow>
              <IonCol size="12" sizeSm="6">
                <IonItem>
                  <IonLabel position="stacked">Idioma:</IonLabel>
                  <IonSelect value="axll" interface="popover" placeholder="Elige una Opción...">
                    <IonSelectOption value="all">Español</IonSelectOption>
                    <IonSelectOption value="all">Ingles</IonSelectOption>
                    <IonSelectOption value="all">Frances</IonSelectOption>
                  </IonSelect>
                </IonItem>


              </IonCol>

              <InputText value={"searchText"} icon={mail} label="Email" placeholder="Ingrese el Email" />
            </IonRow>


            <IonRow className="ion-text-right">
              <IonCol>

                <IonButton color="danger" fill="solid">
                  <IonIcon icon={close} slot="start" /> Eliminar
                    </IonButton>

                <IonButton color="success" fill="solid">
                  <IonIcon icon={checkmark} slot="start" /> Guardar
                    </IonButton>

              </IonCol>
            </IonRow>

          </IonCol>
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
};

export default PatientProfile;
