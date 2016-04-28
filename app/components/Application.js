import React, {Component} from 'react'
import MapView from './MapView'
import Duration from './Duration'
import styles from './Application.css'

export default class Application extends Component {
  constructor() {
    super()
    this.state = {duration: null}
    this._pointsChanged = this._pointsChanged.bind(this)
    this._inputsSubmitted = this._inputsSubmitted.bind(this)
  }

  render() {
    return (
      <main className={styles.root}>
        <header className={styles.header}>
          <h1>map-thingy</h1>
        </header>
        <MapView pointsChanged={this._pointsChanged}>
          {this.state.duration && <Duration seconds={this.state.duration}/>}
        </MapView>
      </main>
    )
  }

  _pointsChanged(origin, destination) {
    console.debug('@_pointsChanged', origin, destination);
  }

  _inputsSubmitted() {}
}
