import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/typography.css';
import { desktop, help, videocam } from 'ionicons/icons';
import React from 'react';
import { Route } from 'react-router-dom';
import DialogUtil from './components/forms/DialogUtil';
import Menu from './components/Menu';
import ProgressBar from './components/ProgressBar';
import { AppPage } from './declarations';
import AboutPage from './pages/About';
import MonitorPage from './pages/Monitor';
import YoutubePage from './pages/Youtube';
import './theme/style.css';
/* Theme variables */
import './theme/variables.css';
import FirebaseUtil from './utils/FirebaseUtil';


const firebaseConfig = {
  apiKey: "AIzaSyB4Oo5fvC-XP4Adc9cwF_TCHpUQ1t0Wd_E",
  authDomain: "healthcare-f2fea.firebaseapp.com",
  databaseURL: "https://healthcare-f2fea.firebaseio.com",
  projectId: "healthcare-f2fea",
  storageBucket: "healthcare-f2fea.appspot.com",
  messagingSenderId: "1018390425187",
  appId: "1:1018390425187:web:7f4f286dff760d47105256",
  measurementId: "G-7H5H5F8LWE"
};
FirebaseUtil.config(firebaseConfig);


const appPages: AppPage[] = [
  {
    title: 'Rover Monitor',
    url: '/',
    icon: desktop
  },
  {
    title: 'About',
    url: '/about',
    icon: help
  },
  {
    title: 'Real Rover Cams Online',
    url: '/cams-online',
    icon: videocam
  }
];

const App: React.FC = () => (
  <IonApp>
    <DialogUtil />

    <IonReactRouter>
      <IonSplitPane contentId="main">

        <ProgressBar />

        <Menu appPages={appPages} />
        <IonRouterOutlet id="main">
          <Route path="/about" component={AboutPage} />
          <Route path="/cams-online" component={YoutubePage} />
          <Route path="/" component={MonitorPage} />

        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
