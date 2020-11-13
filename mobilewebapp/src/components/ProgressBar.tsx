import { IonProgressBar } from '@ionic/react';
import * as React from 'react';
import './ProgressBar.css';


const styleComponent: React.CSSProperties = {
  position: 'absolute',
  zIndex: 1,
  minWidth: '101vw',
  top: '56px',
  left: '0px',
  height: '4px'
};

export default class ProgressBar extends React.Component<any, any> {

  public static instance: any = null;
  private static count: number = 0;

  public static enable() {
    ProgressBar.count++;
    ProgressBar.instance.setState({ "isLoading": true });
  }

  public static disable() {
    ProgressBar.count--;
    if (ProgressBar.count == 0) {
      ProgressBar.instance.setState({ "isLoading": false });
    }
  }

  constructor(props: any) {
    super(props);
    ProgressBar.instance = this;
    this.state = { "isLoading": false }
  }

  render() {
    return <>
      {this.state.isLoading &&
        <span style={styleComponent}>
          <IonProgressBar type="indeterminate" ></IonProgressBar>
        </span>
      }
    </>;
  }
}