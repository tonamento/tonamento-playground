import React, { useCallback, useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, TextField, Button, Select, MenuItem, InputLabel, FormControl, styled } from '@mui/material';
import { useAccount, useBalance, useContractRead, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { formatEther, parseEther } from 'ethers/lib/utils';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { TOKENS_DATA, CONTRACT_ADDRESS, TICKET_FACTORY_ABI, TOKEN_FACTORY_ABI } from '../constants';
import { useTokenContract, useTicketContract } from '../utils/ContractAPI';

const Root = styled('div')(({ theme }) => ({
  '.swap-component-btn': {
    backgroundColor: '#1976d2',
    color: '#ffffff',
    fontFamily: 'avenir',
    fontSize: 18,
    fontWeight: 700,
    marginTop: 5,
    width: '500px',
    padding: '7px 0px',
    textTransform: 'none',
    transition: 'all 0.15s ease-in-out',
    borderRadius: 12,
    '&:hover': {
      backgroundColor: '#1836d2',
      fontSize: 20,
    },
  },
  '.swap-component-h1': {
    fontFamily: 'gumdrop',
    fontWeight: 200,
  },
  '.swap-component-balance': {
    fontFamily: 'avenir',
    fontWeight: 200,
    opacity: 0.45,
    fontSize: 12,
    marginLeft: 1,
  },
  '.swap-component-window': {
    background: '#fff',
    borderRadius: 12,
    padding: '10px 25px 25px 20px',
  },
  '.coin-input-box': {
    fontFamily: 'avenir',
    fontWeight: 700,
  },
  '.css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
    borderRadius: 12,
  },
}));


export default function SwapForm({setMessageInfo}) {
  const {address} = useAccount();
  const [fromCurrency, setFromCurrency] = useState('USDC');
  const [toCurrency, setToCurrency] = useState('TOTO');
  const [toAmount, setToAmount] = useState('');
  const [fromAmount, setFromAmount] = useState('');
  const [hasAllowance, setHasAllowance] = useState(false);
  const [balance, setBalance] = useState('');
  const [approvalConfirmed, setApprovalConfirmed] = useState(false);

  const {data: usdBalance} = useBalance({
    address:address,
    token: TOKENS_DATA[fromCurrency]?.address, 
    watch: true
  })

  const {data: totoBalance } = useContractRead({
      address: CONTRACT_ADDRESS,
      abi: TICKET_FACTORY_ABI,
      functionName: '_tickets',
      args: [address],
      watch: true
  });
  
  const {data: allowance} = useContractRead({
    address: TOKENS_DATA[fromCurrency]?.address,
    abi: TOKEN_FACTORY_ABI,
    functionName: 'allowance',
    args: [address, CONTRACT_ADDRESS],
    watch: true
  })
  
  console.log(allowance)
  
  const { write: tradeTicket, isLoading: isSwapping, isSuccess: isSwapSuccess, error: isSwapError} = useTicketContract(fromCurrency !== 'TOTO' ? 'buyTicket' : 'sellTicket', [fromAmount? parseEther(fromAmount.toString()) : null]);
  const { write: approveToken, isLoading: isApproving, isSuccess: isApproveSuccess, error: isApproveError} = useTokenContract(TOKENS_DATA[fromCurrency]?.address, [CONTRACT_ADDRESS, usdBalance? parseEther(usdBalance?.formatted.toString()) : 10000000000000000000]);

  const calculateTradeRate = useCallback(() => {
    const localStorageAllowance = localStorage.getItem('allowance');
    const formattedAllowance = allowance? formatEther(allowance?.toString()) : parseFloat(localStorageAllowance) || 0;
    const numericFromAmount = Number(fromAmount);


    if (fromCurrency !== 'TOTO') {
      setBalance(parseFloat(usdBalance?.formatted).toFixed(2))
    } else {
      setBalance(totoBalance? formatEther(totoBalance?.toString()) : '0');
    }


    const tradeRate = fromAmount ? (fromCurrency !== 'TOTO' ? parseFloat(fromAmount) * 17.454 : parseFloat(fromAmount) / 17.23) : 0;
    setToAmount(tradeRate.toFixed(3));


    if (allowance) {
      setHasAllowance(numericFromAmount <= parseFloat(formattedAllowance));
      localStorage.setItem('allowance', formattedAllowance);
    }
  }, [fromCurrency, toCurrency, fromAmount, usdBalance, totoBalance, allowance]);
  
  useEffect(() => {
    if (isSwapSuccess || isApproveSuccess) {
      setMessageInfo({
        open: true,
        severity: 'success',
        message: 'Transaction was successfully executed!',
      });
    }

    if (isSwapping || isApproving) {
      // show loading
      setMessageInfo({
        open: true,
        severity: 'loading',
        message: `${isSwapping ? 'Swapping' : 'Approving'} transaction is being processed...`,
      });
    }

    if (isSwapError || isApproveError) {
      setMessageInfo({
        open: true,
        severity: 'error',
        message: 'Transaction failed! error:' + isSwapError?.message.slice(100) || isApproveError?.message.slice(100),
      });
    }
    
    // if approval is successful and hasn't already been confirmed, swap transaction will be triggered
    if (isApproveSuccess && !approvalConfirmed) {
      setApprovalConfirmed(true);
      setMessageInfo({
        open: true,
        severity: 'loading',
        message: `Waiting for ${fromCurrency} swap transaction to be confirmed...`,
      });
      setTimeout(() => {
         tradeTicket();
      }, 8000)
    }

  }, [isSwapping, isApproving, isSwapSuccess, isApproveSuccess, isSwapError, isApproveError]);

  useEffect(() => {
    calculateTradeRate();
  }, [calculateTradeRate]);

  const handleSwap = async () => {
     await tradeTicket();
  };

  const handleApprove = useCallback(() => {
    if (fromCurrency !== 'TOTO') {
      approveToken();
    }
  }, [CONTRACT_ADDRESS, fromAmount]);

  const handleFromAmountChange = useCallback((event) => {
    setFromAmount(event.target.value);
  }, []);
  
  return (
    <Root>
      <Container maxWidth="sm" sx={{ height: "100vh" }}>
        <Box className="swap-component-window" mt={18}>
          <h1 className="swap-component-h1">
            <CurrencyExchangeIcon sx={{ verticalAlign: "middle", marginRight: 1 }} fontSize="large" />
            Swapping here!
          </h1>
          <Box display="grid" justifyContent="space-between" alignItems="center" name='balance-checker' mt={0.75}>
            <Typography className='swap-component-balance'>balance : {balance} </Typography>
          </Box>
          <Grid id="from-box" container spacing={2} mt={0.25}>
            <Grid item xs={4}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="from-currency-label">From Currency</InputLabel>
                <Select
                  labelId="from-currency-label"
                  className='coin-input-box'
                  id="from-currency"
                  sx={{borderRadius: 8}}
                  value={fromCurrency}
                  label="From Currency"
                  onChange={(event) => setFromCurrency(event.target.value)}
                >
                  <MenuItem value="USDC">USDC</MenuItem>
                  <MenuItem value="TOTO">TOTO</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <TextField
                label={`Amount of ${fromCurrency}`}
                variant="outlined"
                type="number"
                value={fromAmount}
                onChange={handleFromAmountChange}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid id="to-box" container spacing={2} mt={0.5}>
            <Grid item xs={4}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="to-currency-label">To Currency</InputLabel>
                <Select
                  labelId="to-currency-label"
                  className='coin-input-box'
                  id="to-currency"
                  sx={{borderRadius: 8}}
                  value={toCurrency}
                  label="To Currency"
                  onChange={(event) => setToCurrency(event.target.value)}
                >
                  <MenuItem value="USDC">USDC</MenuItem>
                  <MenuItem value="TOTO">TOTO</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <TextField
                label={`Amount of ${toCurrency}`}
                variant="outlined"
                disabled
                value={toAmount}
                fullWidth
              />
            </Grid>
          </Grid>
          <Box mt={5} display="grid" justifyContent="space-between" alignItems="center">
             <Button disabled={!fromAmount ||  !hasAllowance || isSwapping} className='swap-component-btn' variant="contained" onClick={handleSwap}>Swap!</Button>
             <Button disabled={hasAllowance || isApproving || fromCurrency === 'TOTO'} className='swap-component-btn' variant="contained" onClick={handleApprove}>Approve USDC</Button>
          </Box>
        </Box>
    </Container>  
  </Root>
  );
}