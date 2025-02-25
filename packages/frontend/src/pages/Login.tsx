import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Paper,
  Stack,
  FormControlLabel,
  Switch,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAuth, useAuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Logo from '../assets/images/logo.png';

const LoginCard = styled(Paper)(({ theme }) => ({
  height: '100vh',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  borderRadius: 24,
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

const IllustrationSection = styled(Box)(({ theme }) => ({
  background: '#f0f7f0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  '& img': {
    maxWidth: '100%',
    height: 'auto',
  },
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const FormSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
});

const LogoImage = styled('img')({
  width: '200px',
  height: 'auto',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  '@media (max-width: 600px)': {
    width: '150px',
  },
});

const LoginPage = () => {
  useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = React.useState('');

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isRememberMeChecked, setIsRememberMeChecked] = React.useState(false);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      await login(email, password);
    } catch (error: any) {
      // Handle login errors
      setError(error?.message);
      console.error('Login Page:', error.message || error);
    }
  };

  return (
    <LoginCard>
      <IllustrationSection>
        <img
          src='assets\images\medication-removebg-preview.png'
          alt='Meditation illustration'
          style={{ maxWidth: 400 }}
        />
      </IllustrationSection>

      <FormSection>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LogoContainer onClick={() => navigate('/about')}>
            <LogoImage src={Logo} alt='Well-Eat' />
          </LogoContainer>
        </motion.div>
        <Box
          sx={{
            mb: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant='h4' component='h1' fontWeight='bold'>
            {/* Nice to see you again! */}
            {t('loginScreen.nicetoSee')}
          </Typography>
          <Button
            variant='text'
            sx={{ color: 'text.primary' }}
            component={Link}
            to='/signup'
          >
            {/* Sign up */}
            {t('loginScreen.signup')}
          </Button>
        </Box>

        <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
          {/* Enter your email and password */}
          {t('loginScreen.enterEP')}
        </Typography>

        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label={t('loginScreen.email')}
              placeholder={t('loginScreen.email')}
              // defaultValue="annyghosh3@gmail.com"
              InputProps={{
                startAdornment: (
                  <Box component='span' sx={{ color: 'text.secondary', mr: 1 }}>
                    ✉️
                  </Box>
                ),
              }}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              label={t('loginScreen.password')}
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder={t('loginScreen.password')}
              InputProps={{
                startAdornment: (
                  <Box component='span' sx={{ color: 'text.secondary', mr: 1 }}>
                    🔒
                  </Box>
                ),
                endAdornment: (
                  <IconButton
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    edge='end'
                  >
                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={isRememberMeChecked}
                    onChange={(e) => setIsRememberMeChecked(e.target.checked)}
                    color='primary'
                  />
                }
                label={t('loginScreen.remember')}
              />
              <Button color='error' variant='text'>
                {t('loginScreen.forgot')}
              </Button>
            </Box>

            <Button
              size='large'
              variant='contained'
              fullWidth
              onClick={handleLogin}
              type='submit'
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                textTransform: 'none',
                py: 1.5,
                borderRadius: 2,
              }}
            >
              {/* Login here */}
              {t('loginScreen.loginhere')}
            </Button>
          </Stack>
        </form>
      </FormSection>
    </LoginCard>
  );
};

export default LoginPage;
