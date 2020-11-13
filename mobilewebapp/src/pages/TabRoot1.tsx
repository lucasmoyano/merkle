import React from "react";
import {
    IonIcon,
    IonLabel,
    IonBadge,    
    IonTabs, IonTabBar, IonTabButton,IonRouterOutlet
} from '@ionic/react';
import { Route, Redirect } from "react-router-dom";
import {Tab1} from './Tab1';
import {Tab2} from './Tab2';

export const TabRoot1 = () => {
        return (
            <IonTabs>
                <IonRouterOutlet>
                    <Route path="/tabroot1/:tab(tab1)" render={() => <Tab1 />} exact={true} />
                    <Route path="/tabroot1/:tab(tab2)" render={() => <Tab2 />} exact={true} />
                    <Route path="/tabroot1" render={() => <Redirect to="/tabroot1/tab1" />} />
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="tab1" href="/tabroot1/tab1">
                        <IonIcon name="calendar" />
                        <IonLabel>Tab 1</IonLabel>
                        <IonBadge>6</IonBadge>
                    </IonTabButton>

                    <IonTabButton tab="tab2" href="/tabroot1/tab2">
                        <IonIcon name="contacts" />
                        <IonLabel>Tab 2</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        );
};
