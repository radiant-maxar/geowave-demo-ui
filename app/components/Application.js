import React, {Component} from 'react'
import MapView from './MapView'
import Duration from './Duration'
import styles from './Application.css'

export default class Application extends Component {
  constructor() {
    super()
    this.state = {duration: null}
    this._destinationChanged = this._destinationChanged.bind(this)
    this._originChanged = this._originChanged.bind(this)
  }

  render() {
    return (
      <main className={styles.root}>
        <header className={styles.header}>
          <h1>geowave-demo-ui</h1>
        </header>
        <MapView originChanged={this._originChanged}
                 destinationChanged={this._destinationChanged}>
          {this.state.duration && <Duration seconds={this.state.duration}/>}
        </MapView>
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
