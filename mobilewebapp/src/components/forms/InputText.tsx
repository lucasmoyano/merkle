import {
  IonCol,

  IonIcon,




  IonInput, IonItem, IonLabel
} from '@ionic/react';
import React from 'react';

interface Props {
  placeholder?: string;
  value?: string;
  label?: string;
  icon?: any;
  size?: string;
  type?: any;
  onChange?: (value: any) => void;
}

const InputText: React.FC<Props> = (props: Props) => {

  const { type = 'text' } = props;

  return (
    <IonCol size="12" sizeSm={props.size ?? '6'}>
      <IonItem>
        {props.icon &&
          <IonIcon icon={props.icon} slot="start" style={{ margin: '22px 10px 0px -12px' }} />
        }
        <IonLabel position="stacked">{props.label ?? 'Nombre'}:</IonLabel>
        <IonInput value={props.value} type={type}
          onIonInput={(e: any) => {
            props.onChange && props.onChange(e.target.value);
          }}
          placeholder={props.placeholder ?? "Ingrese el Nombre"}></IonInput>
      </IonItem>
    </IonCol>
  );
};

export default InputText;
