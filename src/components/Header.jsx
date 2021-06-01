import React, { useState } from 'react'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { themeOptions } from './Theme'
import { Account } from './index'
import clsx from 'clsx'
import Tab from '@material-ui/core/Tab'
import TabContext from '@material-ui/lab/TabContext'
import TabList from '@material-ui/lab/TabList'
// import TabPanel from '@material-ui/lab/TabPanel'
// import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  logo: {
    maxWidth: 40
  },
  hide: {
    display: 'none'
  },
  account: {
    left: theme.spacing(4),
    marginLeft: theme.spacing(4)
  },
  toolbar: {
    minWidth: '100vh',
    position: 'relative'
  },
  logoTitle: {
    minWidth: '10%'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  }

}))

// TODO: Shift content over when menu open?
export default function Header ({ address, provider, userProvider, wallet }) {
  const classes = useStyles(themeOptions)
  const open = false
  const [value, setValue] = useState(1)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  /**
    const handleDrawerOpen = () => {
      setOpen(true)
    }

    const handleDrawerClose = () => {
      console.log('Closing drawer from Link')
      setOpen(false)
    }
   * TOODO:
   *
   * Look at using Tabbed Navigation instead
   * Refactory Account and connect buttons
   */
  return (
    <ThemeProvider theme={themeOptions}>
      <TabContext value={value}>
        <AppBar
          position='static'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar className={classes.toolbar} disableGutters>
            <Grid
              container
              direction='row'
              justify='space-between'
              alignItems='center'
            >
              {
            // <Menu classes={classes} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} open={open}/>
          }
              <Grid item container direction='row' className={classes.logoTitle} xs={2}>
                <Grid item>
                  <img src='/image.png' className={classes.logo} />
                </Grid>
                <Grid item>
                  <Typography align='left' variant='h6' className={classes.title}>
                    Idea Factory
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <TabList
                  value={value}
                  onChange={handleChange}
                  aria-label='nav tabs example'
                  className='navbar'
                >
                  <Tab data-cy='home' component={Link} label='Home' value='1' to='/' />
                  <Tab data-cy='portfolio' component={Link} label='Portfolio' value='2' to='/' />
                  <Tab data-cy='market' component={Link} label='Market' value='3' to='/' />
                  <Tab data-cy='pools' component={Link} label='Pools' value='4' to='/pools' />
                </TabList>
              </Grid>
              <Grid item>
                <Account
                  address={address}
                  localProvider={provider}
                  userProvider={userProvider}
                  wallet={wallet}
                  isMenu
                />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </TabContext>
    </ThemeProvider>
  )
}
