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
    this._fetchDurations = debounce(this._fetchDurations.bind(this), 500)
  }

  componentDidMount() {
    this._fetchDurations()
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
  // Internals
  //

  _fetchDurations() {
    const {origin, destination} = this.state
    const now = new Date().toISOString()
    fetch(`/nyc-taxi/tripInfo?startLat=${origin.lat}&startLon=${origin.lng}&destLat=${destination.lat}&destLon=${destination.lng}&startTime=${now}`)
      .then(response => response.json())
      .then(([[, duration]]) => {
        console.debug('travel times:', duration)
        this.setState({duration})
      })
  }

  //
  // Events
  //

  _destinationChanged(destination) {
    this.setState({destination})
    this._fetchDurations()
  }

  _originChanged(origin) {
    this.setState({origin})
    this._fetchDurations()
  }
}

function debounce(callback, ms) {
  let id
  return () => {
    clearTimeout(id)
    id = setTimeout(callback, ms)
  }
}
