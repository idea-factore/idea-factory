import React, {useEffect }from "react";
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { themeOptions  } from './Theme';
import { Account } from './index';
/**
 * TODO:
 *   1. change twitter link to button maybe? Or something else more nonobtrusive
 *   2. Grab version from github tags
 */
 const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: 40,
    marginRight: '10px'
  }
}));


export default function Header({ address, provider, userProvider, wallet}) {
  const classes = useStyles();
  return (
    <ThemeProvider theme={themeOptions} className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <img src={"/image.png"} className={classes.logo}/>
          <Typography align="left" variant="h6" className={classes.title}>
            Idea Factory: A decentralized marketplace for ideas
          </Typography> 
            <Account
            address={address}
            localProvider={provider}
            userProvider={userProvider}
            wallet={wallet}
            isMenu={true}
            />
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
