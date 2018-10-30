import React, { Component } from 'react'
import { Paper } from '@material-ui/core'

class scoreCard extends Component {
  // constructor(props) {
  //   super(props)
  // }
  render() {
    const currentPlayer = this.props.currentPlayer ? this.props.currentPlayer : ' '
    const currentHole = this.props.currentHole ? this.props.currentHole : 1
    const currentPar = this.props.currentPar ? this.props.currentPar : { }
    console.log(currentPlayer, currentHole, currentPar)
    return (
      <Paper>
        <h3>Hi </h3>
      </Paper>

    )
  }
}

export default scoreCard
