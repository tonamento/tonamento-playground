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
import SwapCallsIcon from '@mui/icons-material/SwapCalls';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Person from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/Wallet';
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
          <Typography variant="h5" noWrap sx={{ fontFamily: 'avenir',fontWeight: 700}}>
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
         <img src={logo} alt="Logo" className={classes.logo} />
          <IconButton onClick={changeDrawerClose}>
            {"direction" === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider/>
        <div className={classes.drawerPaperChild}>
         <img src="https://global-uploads.webflow.com/61a98989a418f6f2acefef70/621831cfafe492644bec9a4d_274636494_1299989500498515_5476423985320629070_n.gif" alt="Logo" className={classes.profilePicture} />
         <div style={{textAlign:"center"}}>
           <button style={{marginTop:"15px"}}>0 TOTO</button>
           <button style={{marginTop:"7px"}}>0 Score</button>
         </div>
        </div>
       <List>
          <ListItem className={classes.listItem} button>
            <ListItemIcon>
              <Person fontSize="large"/>
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem className={classes.listItem} button>
            <ListItemIcon>
              <AccountBalanceWalletIcon fontSize="large"/>
            </ListItemIcon>
            <ListItemText primary="Wallet" />
          </ListItem>
          <ListItem className={classes.listItem} button>
            <ListItemIcon>
              <SwapCallsIcon fontSize="large"/>
            </ListItemIcon>
            <ListItemText primary="Swap" />
          </ListItem>
          <ListItem className={classes.listItem} button>
            <ListItemIcon>
              <ScreenShareIcon fontSize="large"/>
            </ListItemIcon>
            <ListItemText primary="Stream" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Header;