import React from 'react';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import GamesIcon from '@mui/icons-material/Games';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Person from '@mui/icons-material/Person';
import ThreePIcon from '@mui/icons-material/ThreeP';
import logo from './logo.svg';

const PREFIX = 'App';

const classes = {
  root: `${PREFIX}-root`,
  appBar: `${PREFIX}-appBar`,
  appBarShift: `${PREFIX}-appBarShift`,
  menuButton: `${PREFIX}-menuButton`,
  hide: `${PREFIX}-hide`,
  drawer: `${PREFIX}-drawer`,
  drawerPaper: `${PREFIX}-drawerPaper`,
  drawerHeader: `${PREFIX}-drawerHeader`,
  content: `${PREFIX}-content`,
  contentShift: `${PREFIX}-contentShift`,
  logo: `${PREFIX}-logo`,
  games: `${PREFIX}-games`,
  game: `${PREFIX}-game`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
  },

  [`& .${classes.appBar}`]: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  [`& .${classes.appBarShift}`]: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  [`& .${classes.menuButton}`]: {
    marginRight: theme.spacing(2),
  },

  [`& .${classes.hide}`]: {
    display: 'none',
  },

  [`& .${classes.drawer}`]: {
    width: drawerWidth,
    flexShrink: 0,
  },

  [`& .${classes.drawerPaper}`]: {
    width: drawerWidth,
  },

  [`& .${classes.drawerHeader}`]: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },

  [`& .${classes.content}`]: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },

  [`& .${classes.contentShift}`]: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  [`& .${classes.logo}`]: {
    width: '100%',
    height: 'auto',
    marginBottom: theme.spacing(2),
  },

  [`& .${classes.games}`]: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  [`& .${classes.game}`]: {
    width: 275,
    height: 275,
    margin: theme.spacing(1.75),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: "13px",
    boxShadow: theme.shadows[5],
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.075)',
    },
  }
}));

const drawerWidth = 240;

function App() {

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Root className={classes.root}>
      <AppBar position="fixed" className={open ? classes.appBarShift : classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={open ? classes.hide : classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
              Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {"direction" === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <img src={logo} alt="Logo" className={classes.logo} />
        <List>
          <ListItem button>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <GamesIcon />
            </ListItemIcon>
            <ListItemText primary="Games" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ThreePIcon />
            </ListItemIcon>
            <ListItemText primary="Support" />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={open ? classes.contentShift : classes.content}
      >
        <div className={classes.drawerHeader} />
        <div className={classes.games}>
           <div
            className={classes.game}
            style={{
              backgroundImage: `url('https://png.pngtree.com/png-clipart/20211219/original/pngtree-coming-soon-yellow-blue-triangle-shape-png-image_6964494.png')`,
              backgroundColor:'#c3deff'
            }}
          />
          <div
            className={classes.game}
            style={{
              backgroundImage: `url('https://png.pngtree.com/png-clipart/20211219/original/pngtree-coming-soon-yellow-blue-triangle-shape-png-image_6964494.png')`,
              backgroundColor:'#c3deff'
            }}
          />
          <div
            className={classes.game}
            style={{
              backgroundImage: `url('https://png.pngtree.com/png-clipart/20211219/original/pngtree-coming-soon-yellow-blue-triangle-shape-png-image_6964494.png')`,
              backgroundColor:'#c3deff'
            }}
          />
          <div
            className={classes.game}
            style={{
              backgroundImage: `url('https://png.pngtree.com/png-clipart/20211219/original/pngtree-coming-soon-yellow-blue-triangle-shape-png-image_6964494.png')`,
              backgroundColor:'#c3deff'
            }}
          />
            <div
            className={classes.game}
            style={{
              backgroundImage: `url('https://png.pngtree.com/png-clipart/20211219/original/pngtree-coming-soon-yellow-blue-triangle-shape-png-image_6964494.png')`,
              backgroundColor:'#c3deff'
            }}
          />
            <div
            className={classes.game}
            style={{
              backgroundImage: `url('https://png.pngtree.com/png-clipart/20211219/original/pngtree-coming-soon-yellow-blue-triangle-shape-png-image_6964494.png')`,
              backgroundColor:'#c3deff'
            }}
          />
        </div>
      </main>
    </Root>
  );
}

export default App;