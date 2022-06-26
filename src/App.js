import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './themeConfigMUI';

import { DataProvider } from './context/DataProvider';
import { SignIn, Operations, CashWithdrawal, BalanceInquiry, Deposit, Feedback } from './containers';

function App() {
  return (
    <DataProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/operations' element={<Operations />} />
            <Route path='/withdrawal' element={<CashWithdrawal />} />
            <Route path='/balance' element={<BalanceInquiry />} />
            <Route path='/deposit' element={<Deposit />} />
            <Route path='/feedback' element={<Feedback />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </DataProvider>
  );
}

export default App;
