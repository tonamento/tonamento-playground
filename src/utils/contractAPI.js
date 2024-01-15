import { useContractWrite } from 'wagmi';
import { CONTRACT_ADDRESS, TICKET_FACTORY_ABI } from '../constants';

export function useContract() {
    const { write, data, isLoading, isSuccess, error } = useContractWrite({
        address: CONTRACT_ADDRESS,
        abi: TICKET_FACTORY_ABI,
        functionName: 'useTicket',
        args: []
      })
  
    return { write, data, isLoading, isSuccess, error };
  }