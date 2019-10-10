import React, {Component} from 'react';

import logo from './logo.svg';
import './App.css';
import GoogleMap from './1_components/atoms/GoogleMap';

interface Props {

}
interface State {
  isGoogleMapReady: boolean;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isGoogleMapReady: false,
    };

    // Asynchronously checking if Google Map JavaScript API loaded successfully
    const googleMapLoadTimer = setInterval(() => {
      console.log('google.maps = ', google.maps);
      if (google.maps) {
        this.setState({ isGoogleMapReady: true });
        clearInterval(googleMapLoadTimer);
      }
    }, 500);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <GoogleMap isGoogleMapReady={this.state.isGoogleMapReady} />

          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
