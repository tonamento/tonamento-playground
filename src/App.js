import React from 'react';
import { styled, makeStyles } from '@mui/material/styles';
import Header from "./components/Header";
import Playground from "./components/Playground"

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
  listItem: `${PREFIX}-listItem`,
  content: `${PREFIX}-content`,
  contentShift: `${PREFIX}-contentShift`,
  logo: `${PREFIX}-logo`,
  games: `${PREFIX}-games`,
  game: `${PREFIX}-game`,
  titleBar: `${PREFIX}-titleBar`,
  titleBarText: `${PREFIX}-titleBarText`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    backdropFilter: "blur(25px) hue-rotate(30deg)"
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
    background: '#1976d2',
    color:"light"
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
    [theme.breakpoints.up('sm')]: {
      marginBottom:43
    },
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
    border:'1px solid #000',
    borderRadius: '13px',
    boxShadow: theme.shadows[5],
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.075)',
      filter: 'hue-rotate(45deg)'
    },
  },

  [`& .${classes.titleBar}`]: {
      width: 'auto',
      height: '85px',
      textAlign: 'left',
      background: '#fff8f86e',
      backdropFilter: 'blur(7px) drop-shadow(2px 4px 6px black)',
      margin: '70% 0px',
      borderRadius: '0px 0px 10px 10px'
  },

  [`& .${classes.titleBarText}`]: {
    position:"relative",
    top:"20px",
    left:"20px",
    fontFamily: "gumdrop",
    fontSize: "25px",
    fontWeight:"100",
},

  [`& .${classes.listItem}`]: {
      color: "antiquewhite",
      background: "#3a93ff",
      borderRadius: "15px",
      width: "93%",
      marginLeft: "8px",
      marginBottom:"5px",
      transition:"1s",
      '&:hover': {
         backgroundColor: '#0055a4', // Set the color for the hover state
      }
  },

  [`& .${classes.listItem} .MuiTypography-root`] : {
     fontSize:"1.25rem",
     fontFamily:"gumdrop"
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
      <Header 
        open={open} 
        handleDrawerOpen={handleDrawerOpen} 
        handleDrawerClose={handleDrawerClose} 
        classes={classes} 
      />   
      <main className={open ? classes.contentShift : classes.content}>
         <Playground classes={classes}/>
      </main>
    </Root>
  );
}

export default App;