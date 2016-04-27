import 'leaflet-providers'
import '!style!css!../../node_modules/leaflet/dist/leaflet.css'
import React, {Component} from 'react'
import leaflet from 'leaflet'
import destinationMarker from '../images/destination-marker.svg'
import originMarker from '../images/origin-marker.svg'
import styles from './MapView.css'

const ORIGIN_MARKER = leaflet.icon({
  iconUrl: originMarker,
  iconSize: [100, 100],
  iconAnchor: [50, 100]
});

const DEST_MARKER = leaflet.icon({
  iconUrl: destinationMarker,
  iconSize: [100, 100],
  iconAnchor: [50, 100]
});

export default class MapView extends Component {
  constructor() {
    super()
    this.state = {origin: null, destination: null}
    this.markers = leaflet.layerGroup()
    this._located = this._located.bind(this)
    this._clicked = this._clicked.bind(this)
  }

  componentDidUpdate() {
    this._clearMarkers()
    this._drawMarkers()
    this._recenterIfNeeded(...arguments)
  }

  componentDidMount() {
    this.map = leaflet.map(this.refs.container, {
      center: [0, 0],
      zoom: 3,
      layers: [
        leaflet.tileLayer.provider('OpenStreetMap.Mapnik'),
        this.markers
      ]
    })

    this.map.on('click', this._clicked)
    this.map.on('locationfound', this._located)
    this._locateUser()

  }

  render() {
    return (
      <div ref="container" className={styles.root}>
        {this.props.children}
      </div>
    )
  }

  _clicked({latlng}) {
    this.setState({destination: latlng})
  }

  _clearMarkers() {
    this.markers.eachLayer(l => l.remove())
  }

  _drawMarkers() {
    const {origin, destination} = this.state
    if (origin) {
      this.markers.addLayer(leaflet.marker(origin, {icon: ORIGIN_MARKER}))
    }
    if (destination) {
      this.markers.addLayer(leaflet.marker(destination, {icon: DEST_MARKER}))
    }
  }

  _locateUser() {
    this.map.locate()
  }

  _located({latlng}) {
    this.setState({origin: latlng})
  }

  _recenterIfNeeded(_, previousState) {
    const {origin} = this.state;
    if (origin && origin !== previousState.origin) {
      this.map.flyTo(origin, 15, {
        duration: 0.1,
        easeLinearity: 0.1
      })
    }
  }
}

MapView.propTypes = {
  children: React.PropTypes.object,
  className: React.PropTypes.string
}
