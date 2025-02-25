import './App.css';

import { useState, useEffect } from 'react';
import { UploadImageModal } from './components/Modal';

import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import {
  SignupPage,
  ProfilePage,
  HomePage,
  LoginPage,
  LandingPage,
  OnboardingPage,
  MyListPage,
  NoMatch,
  OurTeam,
  FAQs,
  OurStory,
} from './pages';
import ProtectedRoute from './pages/ProtectedRoute';
import { useAuthContext } from './context/AuthContext';
import ListDetailsPage from './pages/ListDetails';
import { Box } from '@mui/material';
import { AIButton, Preloader } from './components';

function CameraButton() {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ position: 'fixed', bottom: 0, right: 0, zIndex: 100 }}>
      <AIButton onClick={() => setOpen(true)} />
      <UploadImageModal open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}

function App() {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Optional: Reset loading state on route change
  useEffect(() => {
    if (!isLoading) return;
    // You might want to add actual loading logic here
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const isProfileScreen = location.pathname === '/profile';
  const isOnboardingScreen = location.pathname === '/onboarding';

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <Preloader onLoadComplete={handleLoadComplete} />
      {!isLoading && (
        <>
          <Routes>
          <Route path='/' element={<Navigate to='/about' replace />} />

            {/* Authenticated Routes */}
            <Route
              path={'/home'}
              element={<ProtectedRoute element={<HomePage />} />}
            />
            <Route
              path='/profile'
              element={<ProtectedRoute element={<ProfilePage />} />}
            />
            <Route path='/onboarding' element={<OnboardingPage />} />
            <Route
              path='/mylist'
              element={<ProtectedRoute element={<MyListPage />} />}
            />
            <Route
              path='/mylist/:id'
              element={<ProtectedRoute element={<ListDetailsPage />} />}
            />
            {/* Public Routes */}
            <Route path='/about' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/ourteam' element={<OurTeam />} />
            <Route path='/ourstory' element={<OurStory />} />
            <Route path='/faqs' element={<FAQs />} />
            <Route path='*' element={<NoMatch />} />
          </Routes>
          {isAuthenticated && !isProfileScreen && !isOnboardingScreen && (
            <CameraButton />
          )}
        </>
      )}
    </>
  );
}

export default App;
