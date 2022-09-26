import { useLocalStorage } from 'usehooks-ts';

import { Routes, Route } from 'react-router-dom';

import { Reset } from 'styled-reset';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './styles/GlobalStyle';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import TransferPage from './pages/TransferPage';
import TransactionsPage from './pages/TransactionsPage';

import defaultTheme from './styles/defaultTheme';
import darkTheme from './styles/darkTheme';

export default function App() {
  const [themeName, setThemeName] = useLocalStorage('theme', 'default');

  const toggleTheme = () => {
    setThemeName(themeName === 'default' ? 'dark' : 'default');
  };

  const theme = themeName === 'dark' ? darkTheme : defaultTheme;

  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <GlobalStyle />
      <Header toggleThemeButtonClick={toggleTheme} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
      </Routes>
    </ThemeProvider>
  );
}
