import * as Dialog from '@radix-ui/react-dialog'
import { Overlay, Content, TransactionType, TransactionTypeButton, CloseButton } from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { TransactionsContext } from '../../contexts/TransactionsContexts'
import { useContextSelector } from 'use-context-selector'

const newTransactionsFormSchema = z.object({
   description: z.string(),
   price: z.number(),
   category: z.string(),
   type: z.enum(['income', 'outcome']), 
})

type NewTransactionsInputs = z.infer<typeof newTransactionsFormSchema>;

export function NewTransactionModal() {
   const createTransactions = useContextSelector(TransactionsContext, (context) => {
      return context.createTransactions;
   })

   const { control, register, handleSubmit, formState: { isSubmitting }, reset } = useForm<NewTransactionsInputs>({
      resolver: zodResolver(newTransactionsFormSchema),
   });

   async function handleCreateNewTransaction(data: NewTransactionsInputs) {
      const { description, price, category, type } = data;

      await createTransactions({
         description,
         price,
         category,
         type
      })

      reset();
   }

   return (
         <Dialog.Portal>
         <Overlay/>

         <Content>
            <Dialog.Title>Nova transaçãao</Dialog.Title>
            <CloseButton>
               <X size={24}/>
            </CloseButton>

            <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
               <input 
                  type="text" 
                  placeholder='Descrição'
                  required
                  {...register('description')}
               />
               <input 
                  type="number " 
                  placeholder='Preço' 
                  required
                  {...register('price', { valueAsNumber: true })}
               />
               <input 
                  type="text" 
                  placeholder='Categoria' 
                  required 
                  {...register('category')}
               />

               <Controller
                  control={control}
                  name='type'
                  render={({ field }) => {
                     return (
                        <TransactionType onValueChange={field.onChange} value={field.value}>
                           <TransactionTypeButton variant='income' value='income'>
                              <ArrowCircleUp size={24}/>
                              Entrada
                           </TransactionTypeButton>
      
                           <TransactionTypeButton variant='outcome' value='outcome'>
                              <ArrowCircleDown size={24}/>
                              Saída
                           </TransactionTypeButton>
                        </TransactionType>
                     )
                  }}
               />
                  <button type='submit' disabled={isSubmitting}>
                     Cadastrar
                  </button>
            </form>

         </Content>
      </Dialog.Portal>
   )
}