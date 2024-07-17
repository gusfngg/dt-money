import { TransactionsContext } from '../../contexts/TransactionsContexts';
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";

import { PriceHighLight, TransactionContainer, TransactionTable } from './styles';
import { dateFormater, priceFormater } from "../../utils/formater";
import { useContextSelector } from "use-context-selector";



export function Transaction() {
   const transactions = useContextSelector(TransactionsContext, (context) => {
      return context.transactions
   });

   return (
      <div>
         <Header/>
         <Summary/>

         <TransactionContainer>
            <SearchForm/>

            <TransactionTable>
               <tbody>
                  {
                     transactions.map(transaction => {
                        return (
                           <tr key={transaction.id}>
                              <td width='50%'>{transaction.description}</td>
                              <td>
                                 <PriceHighLight variant={transaction.type}>
                                    {transaction.type === 'outcome' && '- '}
                                    {priceFormater.format(transaction.price)}
                                 </PriceHighLight>
                              </td>
                              <td>{transaction.category}</td>
                              <td>{dateFormater.format(new Date(transaction.createdAt))}</td>
                           </tr> 
                        )
                     })
                  }
               </tbody>
            </TransactionTable>
         </TransactionContainer>

      </div>
   )
}