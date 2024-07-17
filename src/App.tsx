import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./styles/themes/default"
import { GlobalStyles } from "./styles/global"
import { Transaction } from "./pages/Tranascions"
import { TransactionProvider } from "./contexts/TransactionsContexts"

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles/>
        <TransactionProvider>
          <Transaction/>
        </TransactionProvider>
    </ThemeProvider>
  )
}