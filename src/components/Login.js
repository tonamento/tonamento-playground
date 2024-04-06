import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, TextField, Button, styled } from '@mui/material';
import { useWeb3Modal } from '@web3modal/wagmi/react'

const Root = styled('div')(({ theme }) => ({
  '.login-container': {
    height: '100vh',
  },
  '.login-paper': {
    borderRadius: 10,
    position: 'relative',
    top: '25vh',
    margin: '20px',
    border: '1px solid #ccc',
    padding: '20px',
  },
}));

const Login = ({isConnected}) => {
  const [username, setUsername] = useState('');
  const [loginBackground, setLoginBackground] = useState('');
  const [currectStep, setCurrectStep] = useState(0);
  const { open } = useWeb3Modal()

  useEffect (() => {
    setLoginBackground(generateRandomGradient())
  }, [username, currectStep])
  
  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting login form...');
  };
  
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const generateRandomGradient = () => {
    const gradient = `repeating-linear-gradient(
      to bottom,
      ${generateRandomColor()} 0%, #FF758C 10%, transparent 10%, transparent 20%,
      ${generateRandomColor()} 20%, #FF8C75 30%, transparent 30%, transparent 40%,
      ${generateRandomColor()} 40%, #FFAA75 50%, transparent 50%, transparent 60%,
      ${generateRandomColor()} 60%, #FFD175 70%, transparent 70%, transparent 80%,
      ${generateRandomColor()} 80%, #FFE875 90%, transparent 90%, transparent 100%
    ),
    repeating-linear-gradient(
      to right,
      ${generateRandomColor()} 0%, ${generateRandomColor()} 6.666%, transparent 6.666%, transparent 13.333%,
      ${generateRandomColor()} 13.333%, ${generateRandomColor()} 20%, transparent 20%, transparent 26.666%,
      ${generateRandomColor()} 26.666%, ${generateRandomColor()} 33.333%, transparent 33.333%, transparent 40%,
      ${generateRandomColor()} 40%, ${generateRandomColor()} 46.666%, transparent 46.666%, transparent 53.333%,
      ${generateRandomColor()} 53.333%, ${generateRandomColor()} 60%, transparent 60%, transparent 66.666%,
      ${generateRandomColor()} 66.666%, ${generateRandomColor()} 73.333%, transparent 73.333%, transparent 80%,
      ${generateRandomColor()} 80%, ${generateRandomColor()} 86.666%, transparent 86.666%, transparent 93.333%,
      ${generateRandomColor()} 93.333%, ${generateRandomColor()} 100%
    )`
    return gradient;
  }

  const finishLogin = () => {
    localStorage.setItem('needGuide', true)
    localStorage.setItem('username', username)
    window.location.reload();
  }

  const renderStep = () => {
    switch (currectStep) {
      case 0:
        return (
          <div >
            <Typography sx={{ fontFamily: 'avenir', fontWeight: 400 }}>
              Welcome to Tonamento Playground, you need connect your wallet for the next step.
            </Typography>
            {isConnected? 
              <>
                 <Button onClick={() => open()} sx={{ fontFamily: 'avenir', fontWeight: 400, width: '100%', marginTop: 5.25}} variant='contained' color='primary'>
                   Connected
                 </Button>
                <Button onClick={() => setCurrectStep(1)} sx={{ fontFamily: 'avenir', fontWeight: 400, width: '100%', marginTop: 1}} variant='contained' color='success'>
                    Continue
                </Button>
            </>
                :        
                <Button onClick={() => open()} sx={{ fontFamily: 'avenir', fontWeight: 400, width: '100%', marginTop: 5.25}} variant='contained' color='primary'>
                    Connect Wallet
                </Button>      
              }
          </div>
        )
      case 1:
        return (
          <div>
            <Typography variant="h7" sx={{ fontFamily: 'avenir', fontWeight: 400 }}>
              Your username will be publicly displayed to other players.
            </Typography>
              <TextField
                id="username"
                label="Username"
                margin="normal"
                type="text"
                required
                fullWidth
                onChange={handleInputChange}
              />
              <Button onClick={() => setCurrectStep(2)} sx={{ fontFamily: 'avenir', fontWeight: 400, width: '100%', marginTop: 5.25}} variant='contained' color='primary'>
                   Submit
              </Button>     
          </div>
        )
     case 2:
        return (
          <div>
            <Typography variant="h5" sx={{ fontFamily: 'avenir', fontWeight: 400, textAlign: 'center' }}>
               Welcome to our playground! ✨
            </Typography>  
            <Button onClick={finishLogin} sx={{ fontFamily: 'avenir', fontWeight: 400, width: '100%', marginTop: 5.25}} variant='contained' color='primary'>
                   Gooo!
            </Button>     
          </div>
        )
    } 
  }
  
  const styles = {
    width: '100vw',
    height: '100vh',
    position: 'relative',
    right: 25,
    transition: 'background 0.5s ease',
    background: loginBackground,
  };

  return (
    <Root sx={styles}>
      <Container className="login-container" maxWidth="sm">
        <Paper className="login-paper">
            {renderStep()}
        </Paper>
      </Container>
    </Root>
  );
};

export default Login;
