import React from 'react';
import Dialog from '@mui/material/Dialog';
import {DialogContent, Box, DialogActions, DialogTitle, Button, CircularProgress} from '@mui/material';
import Skeleton from '../img/gifs/Skeleton.gif';

export const ConfirmModal = ({ open, onConfirm, confirmName, isConfirmDisabled, onCancel, method, details }) => {
  return (
    <Dialog open={open} maxWidth="xl">
     <Box p={3} sx={{ display: 'flex', flexDirection: 'column', width: '20vw', height: '60vh'}}>
          <img
            src={Skeleton}
            alt="Loading"
            style={{ width: '200px', height: '200px', display: 'block', margin: 'auto' }}
          />
        <DialogTitle sx={{ fontFamily: 'avenir', fontWeight: 800, backgroundColor: '#1976d2', color: '#ffffff', borderRadius: 3 }}>
          {method}
        </DialogTitle>
        <DialogContent sx={{ fontFamily: 'avenir', fontWeight: 200, backgroundColor: 'cornflowerblue', color: '#ffffff', borderRadius: 3, marginTop: 1, padding: '10px !important'}}>
            {details}
        </DialogContent>
        <DialogActions sx={{ display: 'inline-flex', fontFamily:'avenir', color: '#ffffff', borderRadius: 3 }}>
          <Button sx={{fontWeight:700, width:'100%', backgroundColor: 'crimson'}} onClick={onCancel} variant="contained" disabled={isConfirmDisabled} >
            Cancel
          </Button>
          <Button sx={{fontWeight:700, width:'100%'}} onClick={onConfirm} variant="contained"  disabled={isConfirmDisabled} autoFocus>
              {confirmName}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ConfirmModal;