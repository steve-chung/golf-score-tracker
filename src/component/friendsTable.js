import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Grid} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  add: {
    float: 'right',
    height: 80
  },
  title: {
    marginTop: '3.5rem',
    marginBottom: '2.5rem'
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 400
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }

})

const FriendsTable = (props) => {
  const playerList = props.players.map((player, i) => (
    <TableRow className={styles.row} key={i}>
      <CustomTableCell component='th' scope='row'>
        {player.name}
      </CustomTableCell>
      <CustomTableCell >
        {player.avgScore}
      </CustomTableCell>
      <CustomTableCell >
        {player.email}
      </CustomTableCell>
    </TableRow>
  ))
  return (
    <Grid container direction='column' justify='center' alignItems='stretch'>

      <Grid item xs={12}>
        <Paper className={styles.paper}>
          <Table className={styles.table}>
            <colgroup>
              <col style={{width: '30%'}}/>
              <col style={{width: '20%'}}/>
              <col style={{width: '50%'}}/>
            </colgroup>
            <TableHead>
              <TableRow>
                <CustomTableCell>Name</CustomTableCell>
                <CustomTableCell>Average Score</CustomTableCell>
                <CustomTableCell>Email</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playerList}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(FriendsTable)
