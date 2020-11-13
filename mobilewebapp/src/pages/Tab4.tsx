import React, { Component } from 'react';
import {
    IonContent,
    IonHeader,    
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";

export class Tab4 extends Component {
    render() {       
        return (
            <IonPage id="tab4">
                <IonHeader>
                    <IonToolbar>                        
                        <IonTitle>ROOT 2, Tab 4</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                ROOT 2, Tab 4
                </IonContent>
            </IonPage>
        );
    }
}