import React, { Component} from 'react'
import Map from '../component/map'
import {TextField, List, ListItem} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng, loading
} from 'react-places-autocomplete'
import {connect} from 'react-redux'
import {setCenter} from '../store/action/map'

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
  }
})

class App extends Component {
  constructor() {
    super()
    this.state = {
      address: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.hanleSelect = this.handleSelect.bind(this)
  }

  handleChange(e) {
    this.setState({
      address: e
    })
  }

  handleSelect(e) {
    geocodeByAddress(e)
      .then(res => getLatLng(res[0]))
      .then(latLng => {
        this.props.setCenter(latLng.lat, latLng.lng)
      })
  }

  render() {
    const { classes } = this.props
    const renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
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
      <div className='container'>
        <PlacesAutocomplete value={this.state.address}
          onChange={this.handleChange} onSelect={this.hanleSelect} >
          {renderFunc}
        </PlacesAutocomplete>

        <Map style={{height: `20rem`}}>
        </Map>

      </div>

    )
  }
}

export default connect(null, {setCenter})(withStyles(styles)(App))
