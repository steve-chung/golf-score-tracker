import React, {Component} from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { connect } from 'react-redux'
import { setCenter } from '../store/action/map'

class Map extends Component {

  componentDidMount() {

    navigator.geolocation.watchPosition(position => {
      this.props.setCenter(position.coords.latitude, position.coords.longitude)
    }, (err) => {
      console.error(err)
    })
  }
  render() {
    const {lat, lng} = this.props.map

    const GoogleMapContainer = withGoogleMap(props => (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat, lng }}
      >
        <Marker position={{ lat, lng }} />
      </GoogleMap>
    ))

    return (
      <div style={{height: `20rem`}}>
        <GoogleMapContainer
          loadingElement={<div style={{ heigh: `100%` }}/>}
          containerElement={<div style={{height: `100%`}}/>}
          mapElement={<div style={{height: `100%`}}/>}
        />
      </div>

    )
  }

}

function mapStateToProps(state) {
  return {
    map: state.map.map
  }
}

export default connect(mapStateToProps, {setCenter})(Map)
