import * as React from 'react';
import { useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  TextField,
  Container,
  Box,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [openUploadModal, setOpenUploadModal] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleDeposit = () => {
    // Handle deposit logic
  };

  const handleWithdraw = () => {
    // Handle withdraw logic
  };

  const handleProfileChange = () => {
    setOpenUploadModal(true);
  };

  const handleUploadModalClose = () => {
    setOpenUploadModal(false);
    // Add logic to handle uploading new profile
  };

  return (
    <Container sx={{ py: 12 }}>
      <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <IconButton
          aria-label="settings"
          sx={{ position: 'absolute', right: 8 }}
          onClick={handleProfileChange}
        >
          <SettingsIcon />
        </IconButton>
        <label htmlFor="icon-button-file">
          <input
            style={{ display: 'none' }}
            accept="image/*"
            id="icon-button-file"
            type="file"
          />
          <Avatar
            sx={{ width: 120, height: 120, backgroundColor: 'primary.main' }}
            alt="User Profile Picture"
            src="/path_to_your_image.jpg"
          >
            <PhotoCameraIcon />
          </Avatar>
        </label>
      </Box>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            User Information
          </Typography>
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={handleUsernameChange}
            sx={{ mb: 2 }}
          />
        </CardContent>
      </Card>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button variant="contained" onClick={handleDeposit} fullWidth>
                Deposit USDT
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" onClick={handleWithdraw} fullWidth>
                Withdraw
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Dialog open={openUploadModal} onClose={handleUploadModalClose}>
        <DialogTitle>Upload New Profile Picture</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Your text and upload input here */}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Container>
)}

export default UserProfile;