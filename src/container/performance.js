import React, { Component } from 'react'

class Performance extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    const date = Date.now()
    let dataObj = {}
    dataObj.puttsGreen = 0
    fetch('/data/games', {method: 'GET'})
      .then(res => res.json())
      .then(res => {
        console.log(res)
        const history = res.filter(coures => (
          coures.date < date)).map(course => {
          console.log(course)
          let courseObj = {}
          const scoreStat = course.players[0].hole.map(
            hole => {
              console.log(hole)
              if (!dataObj[hole.firstClub]) {
                dataObj[hole.firstClub] = +hole.firstDistance
              }
              else {
                dataObj[hole.firstClub] += +hole.firstDistance
              }
              if (!dataObj[hole.secondClub]) {
                dataObj[hole.secondClub] = +hole.secondDistance
              }
              else {
                dataObj[hole.secondClub] += +hole.secondDistance
              }
              dataObj.puttsGreen += +hole.stroksGreen
              console.log(dataObj)
            })
          courseObj = Object.assign({},
            {id: course.id,
              date: course.date,
              playerName: course.players[0].name,
              scores: +course.players[0].totalScore,
              scoreStats: scoreStat})
          console.log(courseObj)
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
