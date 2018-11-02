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
      margin='dense'
      id='hole'
      label= {holeLabel}
      style={{width: 80}}/>)
  })
}
class Score extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [{
        hole: []
      }],
      courseName: '',
      open: true,
      holes: [],
      currentHole: 1,
      currentPlayer: null,
      prevHolePlayers: [],
      gameId: 0
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleOnNext = this.handleOnNext.bind(this)
    this.handleOnPrev = this.handleOnPrev.bind(this)
  }

  componentDidMount() {
    fetch('/data/games', {method: 'GET'})
      .then(res => res.json())
      .then(res => {
        let newPlayers = [ ]
        const lastCourse = res.length - 1
        for (let i = 0; i < res[lastCourse].players.length; i++) {
          newPlayers.push(res[lastCourse].players[i])
        }

        this.setState({
          players: newPlayers,
          date: res[lastCourse].date,
          courseName: res[lastCourse].course,
          currentPlayer: res[lastCourse].players[0],
          currentHole: 1,
          gameId: res[lastCourse].id
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
      let eachHole = {}
      const newHoles = holes.map((hole, i) => {
        eachHole = {}
        eachHole[hole] = +e.target[i].value
        return eachHole
      })
      this.setState({
        open: false,
        holes: newHoles,
        currentHole: newHoles[0]
      })
    }
    e.target.reset()
  }

  handleOnNext(firstClub, firstDistance, secondClub, secondDistance, stroksGreen, totalShots) {
    const { currentHole, players, currentPlayer, holes } = this.state
    const playerScore = {
      hole: currentHole,
      firstClub,
      firstDistance,
      secondClub,
      secondDistance,
      stroksGreen,
      totalShots
    }
    const holeIndex = Object.keys(playerScore.hole)[0] - 1
    let newHole = []
    newHole.push(playerScore)
    const nextPlayerIndex = players.indexOf(currentPlayer) + 1
    let playerNow = players.filter(player => (
      player.id === currentPlayer.id))
    let playerNowObj = {}
    if (!playerNow[0].hole) {
      playerNow[0].hole = newHole
      playerNowObj = playerNow[0]
    }
    else if (JSON.stringify(playerNow[0].hole[holeIndex]) !== JSON.stringify(playerScore)) {
      console.log(playerNow[0].hole[holeIndex], playerScore)
      if (JSON.stringify(playerNow[0].hole[holeIndex]) === undefined) {
        playerNow[0].hole.push(playerScore)
      }
      else {
        playerNow[0].hole[holeIndex] = playerScore
      }
      playerNowObj = playerNow[0]

    }
    let updatedPlayers = players.filter(player => (
      player.id !== currentPlayer.id
    ))
    updatedPlayers.push(playerNowObj)
    const nextHole = holes.indexOf(currentHole) + 1
    if (JSON.stringify(playerNow[0].hole[holeIndex]) === JSON.stringify(playerScore)) {
      updatedPlayers = players
    }
    if (nextPlayerIndex === players.length) {
      this.setState({
        players: updatedPlayers,
        currentHole: holes[nextHole],
        currentPlayer: players[0]
      })
    }
    else {
      this.setState({
        players: updatedPlayers,
        currentPlayer: players[nextPlayerIndex]
      })
    }
    this.handlePutScores(updatedPlayers)

  }

  handlePutScores(players) {
    const { gameId, courseName, date } = this.state

    fetch(`/data/games/${gameId}`, {method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({course: courseName, date: date, players: players})})
      .then(res => res.json())
      .then(res =>
        console.log(res))
      .catch(err =>
        console.error(err))

  }

  handleOnPrev() {
    const {players, currentHole, currentPlayer} = this.state
    const newHoles = this.state.holes
    let playerIndex = players.indexOf(currentPlayer)
    let holeIndex = newHoles.indexOf(currentHole)
    if (!holeIndex) {
      holeIndex = 0
    }
    else {
      if (!playerIndex) {
        holeIndex--
      }
      else {
        holeIndex = currentHole
      }
    }

    if (playerIndex < 0) {
      playerIndex--
    }
    else {
      playerIndex = 0
    }
    this.setState({
      currentHole: newHoles[holeIndex],
      currentPlayer: players[playerIndex]
    })
  }

  handleCancel(e) {
    this.setState({
      open: false
    })
  }
  render() {
    const { courseName, currentPlayer, currentHole } = this.state
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
          handleOnNext={this.handleOnNext}
          handleOnPrev={this.handleOnPrev}/>
      </div>
    )
  }
}

export default withStyles(styles)(Score)
