// write here an loading component
import React from 'react';
import { Modal, Backdrop, CircularProgress, Typography, Button, Dialog, Box, LinearProgress, Skeleton } from '@mui/material';
import {  indigo, deepPurple } from '@mui/material/colors';
import HourglassTopIcon from '@mui/icons-material/HourglassBottom';
import { styled, keyframes } from '@mui/system';
import dogGif from '../img/gifs/Dog.gif';

const rotate = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
`;

const RotatingHourglassTopIcon = styled(HourglassTopIcon)`
  animation: ${rotate} 1.5s linear infinite;
`;

const Loading = ({classes, text, neededSkeletons, subText}) => {
    const dialogNumber = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
      <div style={{ height: '100vh'}}>
        { neededSkeletons ? (
            <div>
               <div className={classes.games} style={{ height: '100vh' }}>
                {dialogNumber.map((index) => (
                  <div key={index} className={classes.game}>
                    <Skeleton variant="rectangular" sx={{ width: '100%', height: '100%', bgcolor: indigo['A400'], borderRadius: 3 }} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <></>
        )}
        <Dialog open={true} className={classes.roomsModal} maxWidth="xl">
          <Box className={classes.roomsModal} p={3} sx={{ display: 'flex', flexDirection: 'column', width: '40vw'}}>
             <img src={dogGif} alt="Loading" style={{ width: '150px', height: '100px', display: 'block', margin: 'auto'}}/>
              <Typography variant="h5" component="div" mt={4} style={{fontFamily: 'gumdrop', textAlign: 'center'}}>
                  {text} <RotatingHourglassTopIcon sx={{verticalAlign: 'middle'}}/>
              </Typography>
              <p style={{fontFamily: 'gumdrop', textAlign: 'center'}}>
                 {subText}
              </p>
            <LinearProgress sx={{marginBottom:0.1, bgcolor: deepPurple[400]}}/>
            <LinearProgress sx={{marginBottom:0.1, bgcolor: deepPurple[400]}}/>
            <LinearProgress sx={{marginBottom:0.1, bgcolor: deepPurple[400]}}/>
            <LinearProgress sx={{marginBottom:0.1, bgcolor: deepPurple[400]}}/>
          </Box>
        </Dialog>
    </div>
    )
}

export default Loading