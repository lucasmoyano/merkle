import React, { Component } from 'react';
import {
    IonContent,
    IonHeader,    
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";

export class Tab3 extends Component {
    render() {       
        return (
            <IonPage id="tab3">
                <IonHeader>
                    <IonToolbar>                        
                        <IonTitle>ROOT 2, Tab 3</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                ROOT 2, Tab 3
                </IonContent>
            </IonPage>
        );
    }
}