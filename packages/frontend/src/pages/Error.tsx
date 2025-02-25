import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

/**
 * `NoMatch` Component
 * A simple 404 error page displayed when a user navigates to a non-existent route.
 *
 * Features:
 * - Displays a "404 Page Not Found" message.
 * - Provides a button to navigate back to the home page.
 *
 * @returns {JSX.Element} The 404 error page component.
 */
const NoMatch: React.FC = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      height='100vh'
      gap={3}
      textAlign='center'
    >
      <Typography variant='h1' color='error'>
        404
      </Typography>
      <Typography variant='h2' color='textPrimary'>
        Page Not Found
      </Typography>
      <Typography variant='body1' color='textSecondary'>
        Oops, the page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button component={Link} to='/about' variant='contained' color='primary'>
        Go to Home
      </Button>
    </Box>
  );
};
export default NoMatch;
