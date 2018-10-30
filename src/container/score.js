import React, { Component } from 'react'

class Score extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    fetch('/history', {method: 'GET'})
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    return (
      <div>
        <h1>Score</h1>
      </div>
    )
  }
}

export default Score
