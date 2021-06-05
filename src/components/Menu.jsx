import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { themeOptions } from './Theme'
import Divider from '@material-ui/core/Divider'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Drawer from '@material-ui/core/Drawer'
import clsx from 'clsx'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
// import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    '&:hover': {
      color: '#e0e0e0'
    },
    '&:active': {
      color: '#616161'
    }
  }
}))
function ListItemLink (props) {
  const classes = useStyles(themeOptions)
  const { icon, primary, to, onClick } = props

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to]
  )

  return (
    <ListItem button onClick={onClick} component={renderLink} className={classes.link}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItem>
  )
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default function Menu ({ classes, open, handleDrawerOpen, handleDrawerClose }) {
  return (
    <span>
      <IconButton
        edge='start'
        className={clsx(classes.menuButton, {
          [classes.hide]: open
        })}
        color='inherit'
        aria-label='menu'
        onClick={handleDrawerOpen}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        open={open}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {themeOptions.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItemLink onClick={handleDrawerClose} to='/' primary='Home' />
          <ListItemLink onClick={handleDrawerClose} to='/' primary='Portfolio (WIP)' />
          <ListItemLink onClick={handleDrawerClose} to='/' primary='Market (WIP)' />
          <ListItemLink onClick={handleDrawerClose} to='/pools' primary='Pools' />
        </List>
      </Drawer>
    </span>
  )
}
