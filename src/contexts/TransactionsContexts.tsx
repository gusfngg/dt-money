import { ReactNode, useEffect, useState, useCallback } from "react";
import { createContext } from 'use-context-selector'
import { api } from "../lib/axios";

interface Transaction {
   id: number;
   description: string;
   type: 'income' | 'outcome';
   price: number;
   category: string;
   createdAt: string;
}

interface TransactionContextType {
   transactions: Transaction[];
   fetchTransactions: (query?: string) => Promise<void>;
   createTransactions: (data: CreateTransactionsInput) => Promise<void>;
}

interface TransactionProviderProps {
   children: ReactNode
}

interface CreateTransactionsInput {
   description: string;
   price: number;
   category: string;
   type: 'income' | 'outcome';
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionProvider({ children }: TransactionProviderProps) {
   const [transactions, setTransactions] = useState<Transaction[]>([]);

   const fetchTransactions = useCallback(
      async (query?: string) => {
         const response = await api.get('transactions', {
            params: {
               _sort: 'createdAt',
               _order: 'desc',
               q: query,
            }
         })

         setTransactions(response.data);
      }, 
      []
   )

   const createTransactions = useCallback(
      async (data: CreateTransactionsInput) => {
         const { description, price, category, type } = data;

         const response = await api.post('transactions', {
            description,
            price,
            category,
            type,
            createdAt: new Date()
         })

         setTransactions(state => [response.data, ...state]);
      },
      [],
   )

   useEffect(() => {
      fetchTransactions();
   }, []);

   return (
      <TransactionsContext.Provider 
         value={{ 
            transactions,
            fetchTransactions,
            createTransactions
         }}>  

         {children}
      </TransactionsContext.Provider>
   )
}