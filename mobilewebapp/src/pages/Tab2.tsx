import React, { Component } from 'react';
import {
    IonContent,
    IonHeader,    
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";

export class Tab2 extends Component {
    render() {       
        return (
            <IonPage id="tab2">
                <IonHeader>
                    <IonToolbar>                        
                        <IonTitle>ROOT 1, Tab 2</IonTitle>                        
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                ROOT 1, Tab 2
                </IonContent>
            </IonPage>
        );
    }
}