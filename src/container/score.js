import React, { Component } from 'react'
import {
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  Slide} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

function Transition(props) {
  return <Slide direction="up" {...props} />
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexlWrap: 'wrap'
  },
  button: {
    float: 'right'
  },
  date: {
    display: 'flex',
    marginBottom: 10,
    justifyContent: 'center'
  },
  submit: {
    float: 'none'
  }
})

let holes = []
for (let i = 1; i < 19; i++) {
  holes.push(i)
}

function holeInput() {
  return holes.map((hole) => {
    let holeLabel = 'Hole ' + hole
    return (<TextField
      key={hole}
      autoFocus
      margin='dense'
      id='hole'
      label= {holeLabel}
      fullWidth/>)
  })
}
class Score extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [],
      courseName: '',
      open: true
    }
  }

  componentDidMount() {
    fetch('/data/history', {method: 'GET'})
      .then(res => res.json())
      .then(res => {
        let newPlayers = [ ]
        const lastCourse = res.length - 1
        for (let i = 0; i < res[lastCourse].players.length; i++) {
          newPlayers.push(res[lastCourse].players[i])
        }
        this.setState({
          players: newPlayers,
          courseName: res[lastCourse].course
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  handleClose(e) {
    e.preventDefault()
    if (typeof (e.target[0].value) !== 'string') {
      this.setState({
        open: false
      })
    }
    else {
      const { players, lastId } = this.state
      const playerInfo = {
        id: lastId,
        name: e.target[0].value,
        avgScore: +e.target[1].value,
        email: e.target[2].value
      }
      const newPlayer = players.map((player) => {
        return Object.assign({}, player)
      })
      this.setState({
        open: false,
        players: [...newPlayer, playerInfo],
        lastId: lastId + 1
      })
    }
    e.target.reset()
  }

  handleCancel(e) {
    this.setState({
      open: false
    })
  }
  render() {
    console.log(this.state)
    const {courseName} = this.state
    return (
      <div>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description">
          <DialogTitle id="alert-dialog-slide-title">
            Pleaes enter pars for each hole at {courseName}?
          </DialogTitle>
          <DialogContent>
            {holeInput()}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(Score)
