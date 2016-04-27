import 'leaflet-providers'
import '!style!css!../../node_modules/leaflet/dist/leaflet.css'
import React, {Component} from 'react'
import leaflet from 'leaflet'
import styles from './MapView.css'

export default class MapView extends Component {
  constructor() {
    super()
    this._located = this._located.bind(this)
  }

  componentDidUpdate() {

  }

  componentDidMount() {
    this.map = leaflet.map(this.refs.container, {
      center: [0, 0],
      zoom: 3
    })

    leaflet.tileLayer.provider('OpenStreetMap.Mapnik').addTo(this.map)

    navigator.geolocation.getCurrentPosition(this._located)
  }

  render() {
    return (
      <div ref="container" className={styles.root}/>
    )
  }

  _located({coords: {accuracy, latitude, longitude}}) {
    leaflet.circle([latitude, longitude], {radius: accuracy}).addTo(this.map)
    leaflet.circle([latitude, longitude], {radius: accuracy * 30}).addTo(this.map)
    this.map.flyTo([latitude, longitude], 15)
  }
}

MapView.propTypes = {
  className: React.PropTypes.string
}
