// import React from 'react';
// import { useAccount, useBalance, useContractRead } from 'wagmi';
// import { CONTRACT_ADDRESS, TICKET_FACTORY_ABI, TOKEN_FACTORY_ABI, TOKENS_DATA } from '../constants';

// const { address } = useAccount();
// export const fetchTicketData = async (address, fromCurrency) => {
//   // Use the useBalance hook
//   const { data: usdBalance } = useBalance({
//     address: address,
//     token: TOKENS_DATA[fromCurrency]?.address,
//     watch: true,
//   });

//   const { data: totoBalance } = useContractRead({
//     address: CONTRACT_ADDRESS,
//     abi: TICKET_FACTORY_ABI,
//     functionName: '_tickets',
//     args: [address],
//     watch: true,
//   });

//   return {
//     usdBalance,
//     totoBalance,
//   };
// };