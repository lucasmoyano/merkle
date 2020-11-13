import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonIcon,
  IonPage,
  IonRow
} from '@ionic/react';
import { arrowRoundDown, arrowRoundUp, redo, undo } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import './Monitor.css';
import Header from './shared/Header';


export default function MonitorPage() {

  const [orientation, setOrientation] = useState(2);
  const [x, setX] = useState(9);
  const [y, setY] = useState(9);

  const [obstacles, setObstacles] = useState<any[]>([]);

  useEffect(() => {
    loadRover();
    loadObstacles();
  }, []);

  const loadObstacles = () => {
    fetch('http://localhost/api/map/obstacles/', {
      method: 'GET'
    })
      .then(function (response) { return response.json(); })
      .then(function (obstacles) {
        setObstacles(obstacles);
      });
  }

  const loadRover = () => {
    fetch('http://localhost/api/rover/', {
      method: 'GET'
    })
      .then(function (response) { return response.json(); })
      .then(function (json) {
        setPosition(json);
      });
  }

  const sendCommand = (command: string) => {
    fetch('http://localhost/api/rover/command/' + command, {
      method: 'GET'
    })
      .then(function (response) { return response.json(); })
      .then(function (json) {
        setPosition(json);
      });
  }

  const setPosition = (json: any) => {
    let orientation = 0;
    if (json.orientation == 'EAST') {
      orientation = 1;
    }
    else if (json.orientation == 'SOUTH') {
      orientation = 2;
    }
    if (json.orientation == 'WEST') {
      orientation = 3;
    }
    setOrientation(orientation);
    setX(json.x);
    setY(json.y);
  }

  return (
    <IonPage>
      <Header />

      <IonContent>
        <IonCard>
          <IonCardContent>
            <IonRow>
              <IonButton onClick={() => sendCommand('r')} color="primary" fill="solid" className="ion-float-right">
                <IonIcon icon={redo} slot="start" /> Turn Right</IonButton>

              <IonButton onClick={() => sendCommand('l')} color="primary" fill="solid" className="ion-float-right">
                <IonIcon icon={undo} slot="start" /> Turn Left</IonButton>

              <IonButton onClick={() => sendCommand('b')} color="primary" fill="solid" className="ion-float-right">
                <IonIcon icon={arrowRoundDown} slot="start" /> Backward</IonButton>

              <IonButton onClick={() => sendCommand('f')} color="primary" fill="solid" className="ion-float-right">
                <IonIcon icon={arrowRoundUp} slot="start" /> Forward</IonButton>
            </IonRow>

            <IonRow>
              <img src={`assets/rover_${orientation}.png`} className="rover"
                style={{
                  left: `${(x * 50) + 16}px`,
                  top: `${(y * 50) + 59}px`
                }}
              />

              {obstacles?.map((obstacle: any) =>
                <img src={`assets/obstacle.png`} className="obstacle"
                  style={{
                    left: `${(obstacle.x * 50) + 16}px`,
                    top: `${(obstacle.y * 50) + 59}px`
                  }}
                />
              )}

              <img src="assets/map.png" style={{ width: '500px' }} />
            </IonRow>

          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage >
  );
}