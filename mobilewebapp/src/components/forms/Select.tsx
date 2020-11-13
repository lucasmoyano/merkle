import {
  IonCol,

  IonIcon,




  IonItem, IonLabel, IonSelect, IonSelectOption
} from '@ionic/react';
import React from 'react';

interface Props {
  placeholder?: string;
  value?: string;
  label?: string;
  icon?: any;
  size?: string;
  type?: any;
  elements: any[];
  onChange?: (value: any) => void;
}

const Select: React.FC<Props> = (props: Props) => {

  return (
    <IonCol size="12" sizeSm={props.size ?? '6'}>
      <IonItem>
        {props.icon &&
          <IonIcon icon={props.icon} slot="start" style={{ margin: '22px 10px 0px -12px' }} />
        }
        <IonLabel position="stacked">{props.label ?? 'Nombre'}:</IonLabel>

        <IonSelect
          interface="alert"
          placeholder={props.placeholder ?? "Ingrese el Nombre"}
          onIonChange={(e: any) => props.onChange && props.onChange(e.target.value)}
          value={props.value}
        >
          {props.elements.map(element =>
            <IonSelectOption value={element.id}>{element.name}</IonSelectOption>
          )}
        </IonSelect>

      </IonItem>
    </IonCol>
  );
};

export default Select;
