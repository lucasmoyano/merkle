import React from "react";
import {   
    IonIcon,
    IonLabel,
    IonBadge,    
    IonTabs, IonTabBar, IonTabButton,IonRouterOutlet
} from '@ionic/react';
import { Route, Redirect } from "react-router-dom";
import {Tab3} from './Tab3';
import {Tab4} from './Tab4';

export const TabRoot2 = () => {
        return (
            <IonTabs>
                <IonRouterOutlet >          
                    <Route path="/tabroot2/:tab(tab3)" render={() => <Tab3 />} exact={true} />
                    <Route path="/tabroot2/:tab(tab4)" render={() => <Tab4 />} exact={true} />
                    <Route path="/tabroot2" render={() => <Redirect to="/tabroot2/tab3" />} />
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="tab3" href="/tabroot2/tab3">
                        <IonIcon name="calendar" />
                        <IonLabel>Tab 3</IonLabel>
                        <IonBadge>6</IonBadge>
                    </IonTabButton>

                    <IonTabButton tab="tab4" href="/tabroot2/tab4">
                        <IonIcon name="contacts" />
                        <IonLabel>Tab 4</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        );
};
