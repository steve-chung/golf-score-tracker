import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
})

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle(e) {
    console.log(e.target)
    this.setState((prevState) => {
      return {open: !prevState}
    })
  }

  render() {
    const {classes} = this.props

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleToggle}>
              <MenuIcon />
            </IconButton>
            <Drawer open={this.state.open} onClose={this.handleToggle}>
              <div>

              </div>
            </Drawer>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Link to='/' style={{textDecoration: 'none', color: 'white'}}>
               Golf Score Tracker
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>

    )

  }

}

export default withStyles(styles)(Navbar)
