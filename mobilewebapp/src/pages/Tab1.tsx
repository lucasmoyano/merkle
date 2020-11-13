import React, { Component } from 'react';
import {
    IonContent,
    IonHeader,    
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";

export class Tab1 extends Component {
    render() {       
        return (
            <IonPage id="tab1">
                <IonHeader>
                    <IonToolbar>                        
                        <IonTitle>ROOT 1, Tab 1</IonTitle>                        
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                ROOT 1, Tab 1
                </IonContent>
            </IonPage>
        );
    }
}