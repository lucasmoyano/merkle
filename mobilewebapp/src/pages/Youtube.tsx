import {
  IonCard,
  IonCardContent,
  IonContent,
  IonPage
} from '@ionic/react';
import React, { useEffect } from 'react';
import Header from './shared/Header';



export default function YoutubePage() {


  useEffect(() => {
  }, []);


  return (
    <IonPage>
      <Header />

      <IonContent>
        <IonCard>
          <IonCardContent>
            <h1>Check the Real Rover Streaming</h1>
            <iframe width="720" height="480" src="https://www.youtube.com/embed/6B_6K-splRU?autoplay=1&mute=1&enablejsapi=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>

          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}