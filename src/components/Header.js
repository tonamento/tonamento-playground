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
import { Button, ListItem, ListItemIcon, ListItemText, Avatar, Box, Tooltip } from '@mui/material';
import GamesIcon from '@mui/icons-material/Games';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Person from '@mui/icons-material/Person';
import ThreePIcon from '@mui/icons-material/ThreeP';
import MenuItem from '@mui/material/MenuItem';
import logo from '../logo.png';

function Header(props) {
  const {open, classes} = props
  
  const changeDrawerOpen = () => {
    props.handleDrawerOpen(true);
  };

  const changeDrawerClose = () => {
    props.handleDrawerClose(false);
  };

  return (
    <>
      <AppBar position="fixed" className={open ? classes.appBarShift : classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={changeDrawerOpen}
            edge="start"
            className={open ? classes.hide : classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap sx={{ fontFamily: 'monospace',fontWeight: 700}}>
              Dashboard
          </Typography>
            <Box sx={{ flexGrow: 0, marginLeft: 'auto', display:'flex'}}>
              <w3m-button />
              <Tooltip title="Open settings" sx={{padding:"0px", paddingLeft:"7px"}}>
                <IconButton>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            </Box>
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
          <IconButton onClick={changeDrawerClose}>
            {"direction" === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider sx={{background:"#1976d2"}}/>
        <img src={logo} alt="Logo" className={classes.logo} />
        <List>
          <ListItem className={classes.listItem} button>
            <ListItemIcon>
              <Person fontSize="large"/>
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem className={classes.listItem} button>
            <ListItemIcon>
              <GamesIcon fontSize="large"/>
            </ListItemIcon>
            <ListItemText primary="Games" />
          </ListItem>
          <ListItem className={classes.listItem} button>
            <ListItemIcon>
              <ThreePIcon fontSize="large"/>
            </ListItemIcon>
            <ListItemText primary="Support" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Header;