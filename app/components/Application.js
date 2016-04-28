import React, {Component} from 'react'
import MapView from './MapView'
import Duration from './Duration'
import styles from './Application.css'

export default class Application extends Component {
  constructor() {
    super()
    this.state = {duration: null, origin: {lat: 40.78, lng: -73.96}, destination: {lat: 40.65, lng: -73.78}}
    this._destinationChanged = this._destinationChanged.bind(this)
    this._originChanged = this._originChanged.bind(this)
  }

  render() {
    return (
      <main className={styles.root}>
        <header className={styles.header}>
          <h1>geowave-demo-ui</h1>
        </header>
        <MapView origin={this.state.origin}
                 destination={this.state.destination}
                 originChanged={this._originChanged}
                 destinationChanged={this._destinationChanged}>
        </MapView>
        {this.state.duration && <Duration seconds={this.state.duration}/>}
      </main>
    )
  }

  //
  // Events
  //

  _destinationChanged(origin, destination) {
    console.debug('@_destinationChanged', origin, destination);
  }

  _originChanged(origin, destination) {
    console.debug('@_originChanged', origin, destination);
  }
}
