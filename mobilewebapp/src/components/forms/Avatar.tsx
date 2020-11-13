import { IonAvatar, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { create } from 'ionicons/icons';
import * as React from 'react';
import { useState } from 'react';

interface Props {
  url: string;
  onChange?: () => void;
}

export default function Avatar(props: Props) {

  const [currentPage, setPage] = useState<number>(1);

  return (
    <>
      <IonAvatar style={{ margin: 'auto' }}>
        <img src={props.url} style={{ transform: "scale(1.25)" }} />

        <IonFab style={{ transform: "scale(0.75)", margin: "30px 0 0 -25px" }}>
          <IonFabButton size="small"><IonIcon icon={create} /></IonFabButton>
        </IonFab>

      </IonAvatar>
    </>

  );
}
