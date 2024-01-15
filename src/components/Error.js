import React from 'react';
import { Container, Paper, Typography, styled } from '@mui/material';

const Root = styled('div')(({ theme }) => ({
    '.error-container': {
      width: '100vw',
      position:'static',
      right: '25px',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0b008a30',
    },
    '.error-paper': {
      borderRadius: 10,
      position: 'relative',
      top: '.5vh',
      margin: '20px',
      border: '1px solid #ccc',
      padding: '20px',
    },
}));

const App = (props) => { // eslint-disable-line react/prefer-stateless-function
    const {text} = props;
  
    return (
        <Root sx={{backgroundColor: 'lightsteelblue', padding: 0}}>
           <Container className="error-container" maxWidth="sm">
               <Paper className="error-paper">
                  <Typography sx={{ fontFamily: 'avenir', fontWeight: 200, textAlign: 'center', fontSize: 20}}> {text} </Typography>
               </Paper>
           </Container>
        </Root>
    );
}

export default App;