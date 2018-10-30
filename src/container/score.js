import React, { Component } from 'react'

class Score extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: []
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
          players: newPlayers
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <h1>Score</h1>
      </div>
    )
  }
}

export default Score
