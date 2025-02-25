import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

import { Navbar } from '../components';
import { Box, Container } from '@mui/material';

const ProtectedRoute = ({ element: Element }: { element: ReactElement }) => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return (
    <>
      <Navbar />
      <Box sx={{ pt: '100px', backgroundColor: '#F8FAFC' }}>
        <Container maxWidth='lg'>{Element}</Container>
      </Box>
    </>
  );
};

export default ProtectedRoute;
