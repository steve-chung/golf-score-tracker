import React, { Component } from 'react'

class History extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    fetch('/data/games', {method: 'GET'})
      .then(res => res.json())
      .then(res => {
        // let history = []
        // let players = []
        let playerList = []
        let courseObj = {}
        // for (let i = 1; i < res.length; i++) {
        //   for (let j = 0; j < res[i].players.length; j++) {
        //     console.log(res[i].players[j])
        //     playerObj = {}
        //     playerObj.id = res[i].players[j].id
        //     playerObj.name = res[i].players[j].name
        //     playerObj.totalScore = res[i].players[j].totalScore
        //     players.push(playerObj)
        //     console.log(players)
        //   }
        //   courseObj.date = res[i].date
        //   courseObj.course = res[i].course
        //   courseObj.players = players
        //   console.log(courseObj)
        //   history.push(courseObj)
        //   console.log(history)
        //   players = [ ]
        // }
        const history = res.map(course => {
          console.log(courseObj)
          playerList = course.players.map(player => {
            return Object.assign({}, {id: player.id, name: player.name, totalScore: player.totalScore})
            // playerObj.id = player.id
            // playerObj.name = player.name
            // playerObj.totalScore = player.totalScore
            // return playerObj
          })
          courseObj = Object.assign({},
            {id: course.id, date: course.date, name: course.course, player: playerList})

          return courseObj
        })
        console.log(history)
      })
  }

  render() {
    return (
      <div>
        I am history!!
      </div>
    )
  }
}

export default History
