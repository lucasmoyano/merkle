import { IonAlert, IonToast } from '@ionic/react';
import * as React from 'react';
import i18n from '../../languages/i18n';


export default class DialogUtil extends React.Component<any, any> {

  public static instance: any = null;

  constructor(props: any) {
    super(props);
    DialogUtil.instance = this;

    this.state = {
      "title": '',
      "description": '',
      "isVisibleAlert": false,
      "isConfirmDialog": false
    }
  }

  static showToast(message: any = null) {
    DialogUtil.instance.setState({
      "toastMessage": message || i18n.t('alert.saved'),
      "isVisibleToast": true
    });
  }

  static showAlert(description: any = null, title: any = null, onConfirm: any = null) {
    DialogUtil.instance.setState({
      "title": title || i18n.t('alert.title'),
      "description": description || i18n.t('alert.saved'),
      "onConfirm": onConfirm || function () { },
      "isVisibleAlert": true,
      "isConfirmDialog": false
    });
  }

  static confirm(onConfirm: any = null, description: any = null, title: any = null) {
    DialogUtil.instance.setState({
      "title": title || i18n.t('alert.title'),
      "description": description || i18n.t('alert.removeDescription'),
      "onConfirm": onConfirm || function () { },
      "isVisibleAlert": true,
      "isConfirmDialog": true
    });
  }

  getButtons() {
    let btnOk: any = {
      text: i18n.t('button.done'),
      handler: () => {
        this.state.onConfirm();
      }
    };

    let btnCancel: any = {
      text: i18n.t('button.cancel'),
      role: 'cancel',
      cssClass: 'secondary',
      handler: () => { }
    }

    return this.state.isConfirmDialog ? [btnCancel, btnOk] : [btnOk];
  }

  render() {
    return (
      <>
        <IonAlert
          isOpen={this.state.isVisibleAlert}
          onDidDismiss={() => this.setState({ "isVisibleAlert": false })}
          onWillDismiss={() => !this.state.isConfirmDialog && this.state.onConfirm()}
          header={this.state.title}
          message={this.state.description}
          buttons={this.getButtons()}
        />

        <IonToast
          isOpen={this.state.isVisibleToast}
          onDidDismiss={() => this.setState({ "isVisibleToast": false })}
          message={this.state.toastMessage}
          position="bottom"
          duration={1000}
        />

      </>
    );
  }

}
