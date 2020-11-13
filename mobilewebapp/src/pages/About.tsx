import {
  IonCard,
  IonCardContent,
  IonContent,
  IonPage
} from '@ionic/react';
import React, { useEffect } from 'react';
import Header from './shared/Header';



export default function AboutPage() {


  useEffect(() => {
  }, []);


  return (
    <IonPage>
      <Header />

      <IonContent>
        <IonCard>
          <IonCardContent>
            <h1>About The Mars Rover Kata</h1>

            <p>
              You are part of the team that explores Mars by sending remotely controlled vehicles to the surface of the
              planet. Develop an API that translates the commands sent from earth to instructions that are understood
by the rover.</p>
            <h3>Requirements</h3>
            <ul>
              <li>You are given the initial starting point (x,y) of a rover and the direction (N,S,E,W) it is facing.</li>
              <li>The rover receives a character array of commands.</li>
              <li>Implement commands that move the rover forward/backward (f,b).</li>
              <li>Implement commands that turn the rover left/right (l,r).</li>
              <li>Implement wrapping from one edge of the grid to another. (planets are spheres after all)</li>
              <li>Implement obstacle detection before each move to a new square. If a given sequence of
              commands encounters an obstacle, the rover moves up to the last possible point, aborts the
sequence and reports the obstacle.</li>
            </ul>

            <h3>Rules</h3>
            <ul>
              <li>Be careful about edge cases and exceptions. We cannot afford to lose a mars rover, just because
the developers overlooked a null pointer.</li>
              <li>Feel free to use any libraries, maven or gradle, GitHub or bitbucket, etc.</li>
              <li>Try using the patterns or architecture that you think best fit the problem, however, feel free to
use this kata to learn to use a pattern you never used before even if it does not fit, just tell us.</li>
              <li>No REST API or Spring, or database is required, but feel free to use one if you want.</li>
              <li>This kata is a good exercise to practice TDD, so we encourage you to do it this way!</li>
            </ul>

          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}