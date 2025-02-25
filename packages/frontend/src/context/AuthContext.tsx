/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { AuthAPIService, UserAPIService } from '../api';
import { useLocation, useNavigate } from 'react-router-dom';
import { StorageKeys } from '../constants';

const PUBLIC_PATHS = ['/login', '/signup', '/about'];

// Create the Auth Context
export const AuthContext = createContext({
  isAuthenticated: false,
  login: async (_email: string, _password: string) => {},
  logout: () => {},
  registerNewUser: async (_email: string, _password: string) => {},
  deleteNewUser: async (_userId: string) => {},
});

// Create a Provider Component
import { ReactNode } from 'react';
import { persistor } from '../store/configureStore';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuthState = localStorage.getItem(StorageKeys.AUTH_TOKEN);
    return storedAuthState ? true : false;
  });

  const login = async (email: string, password: string) => {
    try {
      const data = await AuthAPIService.login(email, password);

      // Save token and redirect
      localStorage.setItem(StorageKeys.AUTH_TOKEN, data.token);
      // Save user details
      localStorage.setItem(StorageKeys.USER_DETAILS, JSON.stringify(data.user));

      setIsAuthenticated(true);
      // Redirect to dashboard or home page
      navigate('/home');
    } catch (error: any) {
      setIsAuthenticated(false);
      // Handle login errors
      throw new Error(error?.message || error);
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem(StorageKeys.AUTH_TOKEN);
    localStorage.removeItem(StorageKeys.IS_NEW_USER);
    localStorage.removeItem(StorageKeys.USER_DETAILS);
  };

  // Function to handle logout
  const logout = () => {
    setIsAuthenticated(false);
    clearLocalStorage();

    //clearing persisted store
    persistor.purge();
  };

  const registerNewUser = async (email: string, password: string) => {
    try {
      const data = await AuthAPIService.register(email, password);
      // Save token and redirect
      localStorage.setItem(StorageKeys.AUTH_TOKEN, data.token);
      localStorage.setItem(StorageKeys.IS_NEW_USER, JSON.stringify(true));
      localStorage.setItem(StorageKeys.USER_DETAILS, JSON.stringify(data.user));
      setIsAuthenticated(true);

      // Redirect to onboarding
      navigate('/onboarding');
    } catch (error: any) {
      setIsAuthenticated(false);
      // Handle login errors
      throw new Error(error?.message || error);
    }
  };

  const deleteNewUser = async (userId: string) => {
    try {
      await UserAPIService.deleteUser(userId);
      clearLocalStorage();
      setIsAuthenticated(false);
      //Navigate the user to login page
      navigate('/login');
    } catch (error: any) {
      setIsAuthenticated(false);
      // Handle login errors
      console.error('Delete User error:', error?.message || error);
    }
  };

  // Auth context value
  const authContextValue = {
    isAuthenticated,
    login,
    logout,
    registerNewUser,
    deleteNewUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export const useAuth = () => {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !PUBLIC_PATHS.includes(location.pathname)) {
      navigate('/login');
    } else if (isAuthenticated && PUBLIC_PATHS.includes(location.pathname)) {
      navigate('/home');
    }
  }, [isAuthenticated, location.pathname, navigate]);
};
