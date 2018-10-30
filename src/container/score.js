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
import ScoreCard from '../container/scoreCard'

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
      open: true,
      holes: [],
      currentHole: 1,
      currentPlayer: null
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleOnNext = this.handleOnNext.bind(this)
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
          courseName: res[lastCourse].course,
          currentPlayer: res[lastCourse].players[0]
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  handleClose(e) {
    e.preventDefault()
    console.log(e)
    if (typeof (e.target[0].value) !== 'string') {
      this.setState({
        open: false
      })
    }
    else {
      let eachHole = {}
      const newHoles = holes.map((hole, i) => {
        eachHole = {}
        eachHole[hole] = +e.target[i].value
        return eachHole
      })
      this.setState({
        open: false,
        holes: newHoles
      })
    }
    e.target.reset()
  }

  handleOnNext(firstClub, firstDistance, secondClub, secondDistance, stroksGreen, totalShots) {
    const playerScore = {
      firstClub,
      firstDistance,
      secondClub,
      secondDistance,
      stroksGreen,
      totalShots
    }
    const {players, currentPlayer} = this.state
    const newPlayer = players.map((player) => {
      if (player.id === currentPlayer.id) {
        return Object.assign(player, playerScore)
      }
      else {
        return player
      }
    })
    const nextPlayerIndex = players.indexOf(currentPlayer) + 1
    if (nextPlayerIndex < players.length) {
      this.setState({
        players: newPlayer,
        currentPlayer: newPlayer[nextPlayerIndex],
        open: false
      })
    }
  }

  handleCancel(e) {
    this.setState({
      open: false
    })
  }
  render() {
    console.log(this.state)
    const { courseName, currentPlayer, currentHole, holes } = this.state
    const currentPar = holes.filter((hole) => (
      currentHole in hole
    ))
    return (
      <div className='container' style={{margin: '0, auto'}}>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description">
          <form onSubmit = {this.handleClose}>
            <DialogTitle id="alert-dialog-slide-title">
            Pleaes enter pars for each hole at {courseName}?
            </DialogTitle>
            <DialogContent>
              {holeInput()}
            </DialogContent>
            <DialogActions>

              <Button onClick={this.handleCancel} color="primary">
              Cancel
              </Button>
              <Button type='submit' color="primary">
              Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        <h1 className='title'>Welcome to {courseName}</h1>
        <ScoreCard
          currentPlayer={currentPlayer}
          currentHole={currentHole}
          currentPar={currentPar}
          handleOnNext={this.handleOnNext}/>
      </div>
    )
  }
}

export default withStyles(styles)(Score)
