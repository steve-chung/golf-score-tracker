import React, { Component } from 'react'
import {
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  Slide} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import FriendsTable from '../component/friendsTable'

function Transition(props) {
  return <Slide direction="up" {...props} />
}

function getDate() {
  const date = new Date()
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let dt = date.getDate()
  let time = date.toLocaleTimeString()

  if (dt < 10) {
    dt = '0' + dt
  }
  if (month < 10) {
    month = '0' + month
  }
  let hour = time.substring(0, 2)
  if (hour < 10) {
    hour = '0' + hour
  }
  let min = time.substring(3, 5)
  if (min < 10) {
    min = '0' + min
  }
  return (year + '-' + month + '-' + dt + 'T' + hour + ':' + min)
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
  }
})

class Invite extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      players: []
    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  componentDidMount() {
    console.log('reload')
    fetch(`/courses`, {method: 'GET'})
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => {
        console.error(err)
      })
  }

  handleClickOpen() {
    this.setState({
      open: true
    })
  }

  handleCancel(e) {
    this.setState({
      open: false
    })
  }
  handleClose(e) {
    e.preventDefault()
    if (!e.target[0].value) {
      const { players } = this.state
      const playerInfo = {
        name: e.target[0].value,
        avgScore: +e.target[1].value,
        email: e.target[2].value
      }
      this.setState({
        open: false,
        players: [...players, playerInfo]
      })
    }
    e.target.reset()
  }

  render() {
    const { courseName } = this.props.match.params
    const { classes } = this.props
    const { open, players } = this.state
    const date = getDate()
    console.log(date)
    return (
      <div className='container' style={{width: '80%', margin: 'auto'}}>
        <h1 className='title'>Invite to Play</h1>
        <p className='invite'> Please invite friends to play at {courseName} </p>
        <div className={classes.date}>
          <form className={classes.container} noValidate>
            <TextField
              id='date'
              label='Schedule'
              type='datetime-local'
              className={classes.TextField}
              defaultValue={date}
              InputLabelProps={{
                shrink: true
              }}
            />
          </form>
        </div>

        <FriendsTable courseName={courseName} players={players}/>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <form onSubmit={this.handleClose}>
            <DialogTitle id="alert-dialog-slide-title">
            Enter Players Info?
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
              Please Enter Player&aposs Name
              </DialogContentText>
              <TextField
                autoFocus
                margin='dense'
                id='name'
                label='Player Name'
                required
                fullWidth/>
            </DialogContent>
            <DialogContent>
              <DialogContentText>
              Please Enter Player&aposs Average Score
              </DialogContentText>
              <TextField
                autoFocus
                margin='dense'
                id='score'
                label='Average Score'
                fullWidth/>
            </DialogContent>
            <DialogContent>
              <DialogContentText>
              Please Enter Email
              </DialogContentText>
              <TextField
                autoFocus
                margin='dense'
                id='email'
                label='Player Name'
                type='email'
                fullWidth/>
            </DialogContent>
            <DialogActions>
              <Button type='submit' color="primary">
              OK
              </Button>
              <Button onClick={this.handleCancel} color="primary">
              Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        <Button className={classes.button} onClick={this.handleClickOpen} color='primary'> Add </Button>
      </div>

    )
  }
}

export default withStyles(styles)(Invite)
