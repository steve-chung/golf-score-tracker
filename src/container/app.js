import React, { Component } from 'react'
import Map from '../component/map'
import { TextField, List, ListItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import { connect } from 'react-redux'
import { setCenter } from '../store/action/map'
import CourseList from '../component/courseList'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  add: {
    float: 'right',
    height: 80
  },
  title: {
    marginTop: '3.5rem',
    marginBottom: '2.5rem'
  }
})

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentPosition: {
        lat: 0,
        lng: 0
      },
      address: '',
      courses: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleCourseInfo = this.handleCourseInfo.bind(this)
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        currentPosition: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      }, () => {
        const {lat, lng} = this.state.currentPosition
        this.handleCourseApi(lat, lng)
      })
    }, (err) => {
      console.error(err)
    },
    {timeout: 10000})
  }

  handleChange(e) {
    this.setState({
      address: e
    })
  }

  handleCourseApi(lat, lng) {
    fetch(`/api/courses?lat=${lat}&lng=${lng}`, {method: 'GET'})
      .then(res => res.json())
      .then(res => this.handleCourseInfo(res))
      .catch(err => {
        console.error(err)
      })
  }

  handleCourseInfo(info) {
    const newCourseInfo = info.map((course) => {
      return {
        id: course.id,
        name: course.name,
        address: course.location.display_address,
        phone: course.display_phone,
        coords: course.coordinates,
        distance: (course.distance / 1609.344).toFixed(2)
      }
    })
    this.setState({
      courses: newCourseInfo
    })
  }

  handleSelect(e) {
    geocodeByAddress(e)
      .then(res => getLatLng(res[0]))
      .then(latLng => {
        this.setState({
          currentPosition: {
            lat: latLng.lat,
            lng: latLng.lng
          }
        }, () => {
          const {lat, lng} = this.state.currentPosition
          this.handleCourseApi(lat, lng)
        })
      })
  }

  render() {
    const { classes } = this.props
    const { courses } = this.state
    const { lat, lng } = this.state.currentPosition
    const renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions, loading }) => (
      <div className="autocomplete-root">
        <TextField label='search city' placeholder='search' className={classes.textField}
          fullWidth InputLabelProps={{ shrink: true }} {...getInputProps()} />
        <List componet='nav' className="autocomplete-dropdown-container">
          {loading && <div>Loading...</div>}
          {suggestions.map((suggestion, i) => (
            <ListItem key={i} button component='nav' {...getSuggestionItemProps(suggestion)}>
              <span>{suggestion.description}</span>
            </ListItem>
          ))}
        </List>
      </div>
    )
    return (
      <div className='container' style={{width: '80%', margin: 'auto'}}>
        <h1 className='title'> Golf Score Keeper </h1>
        <PlacesAutocomplete value={this.state.address}
          onChange={this.handleChange} onSelect={this.handleSelect} >
          {renderFunc}
        </PlacesAutocomplete>
        <Map courses = {courses} lat={lat} lng={lng}>
        </Map>
        { courses && <CourseList courses={courses}>
        </CourseList>}
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    map: state.map.map
  }
}

export default connect(mapStateToProps, {setCenter})(withStyles(styles)(App))
