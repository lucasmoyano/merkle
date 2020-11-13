import { IonButton, IonButtons, IonIcon } from '@ionic/react';
import { arrowBack, arrowForward, swap } from 'ionicons/icons';
import * as React from 'react';
import { useState } from 'react';

interface Props {
  orderType: any;
  columnName: any;
  selectedColumn: any;
  label: any;
  onChange: any;
}

export default function OrderColumn(props: Props) {

  const ORDER_ASC: string = 'asc';
  const ORDER_DESC: string = 'desc';
  const ORDER_DEFAULT: string = '';

  const [orderType, setOrderType] = useState('');

  const changeOrderType = () => {

    if (props.columnName != props.selectedColumn) {
      setOrderType(ORDER_ASC);
      props.onChange(props.columnName, ORDER_ASC);
    } else {
      if (orderType == ORDER_ASC) {
        setOrderType(ORDER_DESC);
        props.onChange(props.columnName, ORDER_DESC);
      }
      else if (orderType == ORDER_DESC) {
        setOrderType(ORDER_DEFAULT);
        props.onChange(props.columnName, ORDER_DEFAULT);
      }
      else {
        setOrderType(ORDER_ASC);
        props.onChange(props.columnName, ORDER_ASC);
      }
    }

  }

  var icon: any = swap;

  if (props.columnName == props.selectedColumn) {
    if (orderType == ORDER_ASC) {
      icon = arrowForward;
    } else if (orderType == ORDER_DESC) {
      icon = arrowBack;
    }
  }

  return <>
    <b>{props.label}</b>
    <IonButtons style={{
      display: 'inline-block',
      marginTop: '-12px',
      position: 'absolute'
    }}>
      <IonButton onClick={changeOrderType} style={{ transform: 'rotate(90deg)' }}>
        <IonIcon slot="icon-only" color="primary" icon={icon} />
      </IonButton>
    </IonButtons>
  </>
}
