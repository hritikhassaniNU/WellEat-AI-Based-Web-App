import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { createTheme, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import './i18n';
import { store, persistor } from './store/configureStore.ts';
import { PersistGate } from 'redux-persist/integration/react';

// Custom theme with Raleway typography
const theme = createTheme({
  typography: {
    fontFamily: [
      'Raleway',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'sans-serif',
    ].join(','),
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h1: {
      fontSize: '3.5rem',
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    body1: {
      letterSpacing: '0',
    },
  },
  palette: {
    primary: {
      main: '#7ac143',
      light: '#96d85f',
      dark: '#68a939',
    },
    secondary: {
      main: '#F5E6E6',
    },
    grey: {
      50: '#f9fafb', // Lightest grey
      100: '#f3f4f6', // Very light grey
      200: '#e5e7eb', // Light grey
      300: '#d1d5db', // Light-medium grey
      400: '#9ca3af', // Medium grey
      500: '#6b7280', // Medium-dark grey
      600: '#4b5563', // Dark grey
      700: '#374151', // Darker grey
      800: '#1f2937', // Very dark grey
      900: '#111827', // Darkest grey
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <AuthProvider>
            <FluentProvider theme={webLightTheme}>
              <ThemeProvider theme={theme}>
                <App />
              </ThemeProvider>
            </FluentProvider>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
