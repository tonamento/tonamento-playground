import React, { useState } from 'react';
import { Button, Container, FormControl, Select, MenuItem, InputLabel, TextField, Box } from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

export default function SwapForm() {
  const [fromCurrency, setFromCurrency] = useState('USDC');
  const [toCurrency, setToCurrency] = useState('TOTO');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

  const handleSwap = () => {
    // Write logic for swapping from fromCurrency to toCurrency
    // Use fromAmount and toAmount when necessary
  };

  const handleApprove = () => {
    // Write logic for approving the swap
  };

  const handleFromAmountChange = (event) => {
    setFromAmount(event.target.value);
    // Calculate and set the corresponding "toAmount" if needed
  };

  const handleToAmountChange = (event) => {
    setToAmount(event.target.value);
    // Calculate and set the corresponding "fromAmount" if needed
  };

  return (
    <Container maxWidth="sm" sx={{height:"100vh"}}>
      <Box mt={12} sx={{background:"#fff", borderRadius:12, padding:"10px 35px 35px 35px"}}>
        <h1 style={{fontFamily:"gumdrop", fontWeight:200}}>
          <CurrencyExchangeIcon sx={{verticalAlign:"middle", marginRight:1}} fontSize='large'/>
          Swapping here!
        </h1>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="from-currency-label">From Currency</InputLabel>
          <Select
            labelId="from-currency-label"
            id="from-currency"
            value={fromCurrency}
            label="From Currency"
            onChange={(event) => setFromCurrency(event.target.value)}
          >
            <MenuItem value="USDC">USDC</MenuItem>
            <MenuItem value="TOTO">TOTO</MenuItem>
          </Select>
        </FormControl>
        <Box mt={2}>
          <TextField
            label={`Amount of ${fromCurrency}`}
            variant="outlined"
            type="number"
            value={fromAmount}
            onChange={handleFromAmountChange}
            fullWidth
          />
        </Box>
        <Box mt={2}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="to-currency-label">To Currency</InputLabel>
            <Select
              labelId="to-currency-label"
              id="to-currency"
              value={toCurrency}
              label="To Currency"
              onChange={(event) => setToCurrency(event.target.value)}
            >
              <MenuItem value="USDC">USDC</MenuItem>
              <MenuItem value="TOTO">TOTO</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box mt={2}>
          <TextField
            label={`Amount of ${toCurrency}`}
            variant="outlined"
            type="number"
            value={toAmount}
            onChange={handleToAmountChange}
            fullWidth
          />
        </Box>
        <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
          <Button
            variant="contained"
            onClick={handleSwap}
            style={{ backgroundColor: '#1976d2', color: '#ffffff', fontFamily:"avenir"}}
          >
            Confirm Swap
          </Button>
          <Button
            variant="contained"
            onClick={handleApprove}
            style={{ backgroundColor: '#1976d2', color: '#ffffff', fontFamily:"avenir"}}
          >
            Approve Swap
          </Button>
        </Box>
      </Box>
    </Container>
  );
}