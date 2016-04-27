import 'leaflet-providers'
import '!style!css!../../node_modules/leaflet/dist/leaflet.css'
import React, {Component} from 'react'
import leaflet from 'leaflet'
import Mask from './Mask'
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
    this._mouseEnter = this._mouseEnter.bind(this)
    this._mouseExit = this._mouseExit.bind(this)
    this._mouseMove = this._mouseMove.bind(this)
  }

  componentDidUpdate() {
    this._clearMarkers()
    this._drawMarkers()
    this._recenterIfNeeded(...arguments)
  }

  componentDidMount() {
    this.map = leaflet.map(this.refs.container, {
      center: [38.5, -74],
      zoom: 5,
      layers: [
        leaflet.tileLayer.provider('OpenStreetMap.Mapnik'),
        this.markers
      ]
    })
    this._activateTooltip()

    this.map.on('click', this._clicked)
    this.map.on('locationfound', this._located)
    this._locateUser()
  }

  render() {
    return (
      <div ref="container" className={styles.root}>
        {this.props.children}
        <Mask className={styles.mask} visible={!this.state.origin}>
          <div className={styles.locatingMessage}>
            <h2>So where are you anyway?</h2>
            Please wait while we find your location...
          </div>
        </Mask>
      </div>
    )
  }

  _activateTooltip() {
    const pane = this.map.createPane('tooltip')
    pane.classList.add(styles.tooltipPane)
    this.tooltip = document.createElement('tooltip')
    this.tooltip.className = styles.tooltip
    this.tooltip.textContent = 'Click anywhere to set destination'
    pane.appendChild(this.tooltip)
    this.map.on('mouseover', this._mouseEnter)
    this.map.on('mouseout', this._mouseExit)
    this.map.on('mousemove', this._mouseMove)
  }

  _mouseEnter() {
    this.map.getPane('tooltip').classList.add(styles.isMousedOver)
  }

  _mouseExit() {
    this.map.getPane('tooltip').classList.remove(styles.isMousedOver)
  }

  _mouseMove(event) {
    const {x, y} = event.containerPoint
    this.tooltip.setAttribute('style', `transform: translate(${x + 10}px, ${y - 20}px)`)
  }

  _clicked({latlng: {lat, lng}}) {
    this.setState({destination: {lat, lng}})
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

  _located({latlng: {lat, lng}}) {
    this.setState({origin: {lat, lng}})
  }

  _recenterIfNeeded(_, previousState) {
    const {origin} = this.state;
    if (origin && origin !== previousState.origin) {
      this.map.flyTo(origin, 15, {
        duration: 1.5
      })
    }
  }
}

MapView.propTypes = {
  children: React.PropTypes.object,
  className: React.PropTypes.string
}
