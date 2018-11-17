import React, { Component } from 'react'

class Performance extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    const date = Date.now()
    fetch('/data/games', {method: 'GET'})
      .then(res => res.json())
      .then(res => {
        const history = res.filter(coures => (
          coures.date < date)).map(course => {
          let courseObj = {}
          let initObj = {}
          const scoreStat = course.players[0].hole.reduce((acc, hole) => {
            let count = 0
            if (!acc[hole.firstClub]) {
              acc[hole.firstClub] = +hole.firstDistance
              acc.count = Object.assign(initObj, {[hole.firstClub]: 1})
            }
            else {
              acc[hole.firstClub] += +hole.firstDistance
              count = acc.count[hole.firstClub] + 1
              acc.count = Object.assign(acc.count, {[hole.firstClub]: count})
            }
            if (!acc[hole.secondClub]) {
              acc[hole.secondClub] = +hole.secondDistance
              acc.count = Object.assign(initObj, {[hole.secondClub]: 1})
            }
            else {
              count = acc.count[hole.secondClub] + 1
              acc[hole.secondClub] += +hole.secondDistance
              acc.count = Object.assign(acc.count, {[hole.secondClub]: count})
            }
            acc.puttsGreen += +hole.stroksGreen
            return acc
          }, {puttsGreen: 0})
          courseObj = Object.assign({},
            {id: course.id,
              date: course.date,
              playerName: course.players[0].name,
              scores: +course.players[0].totalScore,
              scoreStats: scoreStat})
          return courseObj
        })

        console.log(history)

      //   this.setState({
      //     history
      //   })
      })
      .catch(err => {
        console.error(err)
      })
  }
  render() {
    return (
      <div>
       Performance
      </div>
    )
  }
}

export default Performance
