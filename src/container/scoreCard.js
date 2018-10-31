import React, { Component, Fragment } from 'react'
import { Paper,
  CssBaseline,
  TextField,
  MenuItem,
  InputAdornment,
  Button} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },

  form: {
    width: '100%',
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  textField: {
    width: 200,
    margin: theme.spacing.unit
  },
  next: {
    float: 'right'
  },
  prev: {
    float: 'left'
  }
})

const firstClub = ['Driver', '3-wood', '3-iron', '6-iron', '9-iron']
const secondClub = ['3-wood', '3-iron', '6-iron', '9-iron', 'PW']
const strokGreen = [1, 2, 3, 4, 5, 6]

class scoreCard extends Component {
  constructor(props) {
    super(props)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
  }

  handlePrev(e) {
    console.log(e)
    this.props.handleOnPrev(e)
  }
  handleOnSubmit(e) {
    e.preventDefault()
    this.props.handleOnNext(e.target[0].value,
      e.target[1].value,
      e.target[2].value,
      e.target[3].value,
      e.target[4].value,
      e.target[5].value)
    e.target.reset()
  }

  render() {
    const { classes } = this.props
    const currentPlayer = this.props.currentPlayer ? this.props.currentPlayer : ' '
    const currentHole = this.props.currentHole ? this.props.currentHole : 1
    const currentPar = this.props.currentPar.length !== 0 ? this.props.currentPar : [{ 1: 0 }]
    return (
      <Fragment>
        <CssBaseline />
        <main className={classes.layout} style={{margin: '0, auto'}}>
          <Paper className={classes.paper} elevation={1}>
            <h2> {currentPlayer.name} play </h2>
            <h3> Hole {currentHole}/ Par {currentPar[0][currentHole]} </h3>
            <form onSubmit={this.handleOnSubmit}>
              <TextField
                select
                className={classes.textField}
                value={firstClub[0]}
                label='Club at Tee Off'>
                {firstClub.map((club, i) => (
                  <MenuItem key={i} value={club}>
                    {club}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Distance of first shot"
                className={classes.textField}
                InputProps={{
                  endAdornment: <InputAdornment position='end'>Yard</InputAdornment>
                }}/>
              <TextField
                select
                className={classes.textField}
                value={secondClub[0]}
                label='Club at Second Shot'>
                {secondClub.map((club, i) => (
                  <MenuItem key={i} value={club}>
                    {club}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Distance of second shot"
                className={classes.textField}
                InputProps={{
                  endAdornment: <InputAdornment position='end'>Yard</InputAdornment>
                }}/>
              <TextField
                select
                className={classes.textField}
                value={strokGreen[0]}
                label='Num of Stroks at Green'>
                {strokGreen.map((num, i) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                label="Total Number of Shots"
                className={classes.textField}/>
              <Button type='submit' className={classes.next} color='primary'> Next</Button>
              <Button onClick={this.handlePrev} className={classes.prev} color='primary'> Prev </Button>

            </form>

          </Paper>
        </main>

      </Fragment>

    )
  }
}

export default withStyles(styles)(scoreCard)
