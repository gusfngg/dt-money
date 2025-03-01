import { HeaderContainer, HeaderContent, NewTransactionButton } from './style';
import * as Dialog from '@radix-ui/react-dialog'
import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal';

export function Header() {
   return (
     <HeaderContainer>
      <HeaderContent>
         <img src={logoImg} />

         <Dialog.Root>
            <Dialog.Trigger asChild> 
               <NewTransactionButton>Nova transação</NewTransactionButton>
            </Dialog.Trigger>

            <NewTransactionModal/>
            
         </Dialog.Root>
      </HeaderContent>
     </HeaderContainer>
   )
}