import React, {useState} from "react";
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { themeOptions  } from './Theme';
import { Account, Menu} from './index';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';

 const drawerWidth = 240;

 const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
  },
  hide: {
    display: 'none',
  },
drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  
}));

//TODO: Shift content over when menu open?
export default function Header({ address, provider, userProvider, wallet }) {
  const classes = useStyles(themeOptions);
  const [open, setOpen] = useState(false);
   
  const handleDrawerOpen = () => {
        setOpen(true);
      };
    
  const handleDrawerClose = () => {
        console.log("Closing drawer from Link");
        setOpen(false);
  };
  return (
    <ThemeProvider theme={themeOptions}>
      <AppBar
        position="static"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
      })}>
        <Toolbar>
          <Menu classes={classes} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} open={open}/>
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
