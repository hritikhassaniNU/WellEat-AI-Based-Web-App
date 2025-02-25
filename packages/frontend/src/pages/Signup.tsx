import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Paper,
  Stack,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAuth, useAuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Logo from '../assets/images/logo.png';

const RegisterCard = styled(Paper)(({ theme }) => ({
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

const Signup = () => {
  useAuth();

  const { t } = useTranslation();
  const navigate = useNavigate();

  const { registerNewUser } = useAuthContext();
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError(t('signupScreen.allFieldsRequired'));
      return false;
    }

    if (formData.password.length < 6) {
      setError(t('signupScreen.charLengthValidation'));
      return false;
    }
    if (formData.password.length > 20) {
      setError(t('signupScreen.charLengthValidationMax'));
      return false;
    }
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
    if (!strongPasswordRegex.test(formData.password)) {
      setError(t('signupScreen.passErr'));
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError(t('signupScreen.passIncorrect'));
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError(t('signupScreen.emailValid'));
      return false;
    }
    const commonPasswords = [
      'password',
      '123456',
      '12345678',
      'qwerty',
      'abc123',
    ];
    if (commonPasswords.includes(formData.password.toLowerCase())) {
      setError(t('signupScreen.easyPass'));
      return false;
    }
    const blacklistedDomains = ['spam.com', 'fakeemail.com'];
    const emailDomain = formData.email.split('@')[1];
    if (blacklistedDomains.includes(emailDomain)) {
      setError(t('signupScreen.emailDomain'));
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    try {
      event.preventDefault();
      if (validateForm()) {
        await registerNewUser(formData.email, formData.password);
      }
    } catch (error: any) {
      // Handle registration errors
      setError(error?.message);
      console.error('Signup Page:', error.message || error);
    }
  };

  return (
    <RegisterCard>
      <IllustrationSection>
        <img
          src='\src\assets\images\t_prev_ui.png'
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
            {t('signupScreen.createAccount')}
          </Typography>
          <Button
            variant='text'
            sx={{ color: 'text.primary' }}
            component={Link}
            to='/login'
          >
            {t('signupScreen.login')}
          </Button>
        </Box>

        <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
          {/* Enter your details to get started */}
          {t('signupScreen.enterDetails')}
        </Typography>

        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label={t('signupScreen.enterEmail')}
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              // placeholder='Enter your email'
              placeholder={t('signupScreen.email')}
              InputProps={{
                startAdornment: (
                  <Box component='span' sx={{ color: 'text.secondary', mr: 1 }}>
                    ✉️
                  </Box>
                ),
              }}
            />

            <TextField
              fullWidth
              // label='Password'
              label={t('signupScreen.password')}
              name='password'
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              placeholder={t('signupScreen.password')}
              InputProps={{
                startAdornment: (
                  <Box component='span' sx={{ color: 'text.secondary', mr: 1 }}>
                    🔒
                  </Box>
                ),
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />

            <TextField
              fullWidth
              label={t('signupScreen.confirmPassword')}
              name='confirmPassword'
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={t('signupScreen.confirmPassword')}
              InputProps={{
                startAdornment: (
                  <Box component='span' sx={{ color: 'text.secondary', mr: 1 }}>
                    🔒
                  </Box>
                ),
                endAdornment: (
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge='end'
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />

            <Button
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              sx={{
                bgcolor: '#90c990',
                color: 'white',
                '&:hover': {
                  bgcolor: '#7ab77a',
                },
                textTransform: 'none',
                py: 1.5,
                borderRadius: 2,
                mt: 2,
              }}
            >
              {/* Create Account */}
              {t('signupScreen.createAccount')}
            </Button>
          </Stack>
        </form>

        <Typography
          variant='body2'
          color='text.secondary'
          align='center'
          sx={{ mt: 2 }}
        >
          {/* By registering, you agree to our{' '} */}
          {t('signupScreen.registering')}{' '}
          <Button
            variant='text'
            sx={{ p: 0, minWidth: 'auto', textTransform: 'none' }}
          >
            {/* Terms of Service */}
            {t('signupScreen.tos')}
          </Button>{' '}
          {/* and{' '} */}
          {t('signupScreen.and')}{' '}
          <Button
            variant='text'
            sx={{ p: 0, minWidth: 'auto', textTransform: 'none' }}
          >
            {/* Privacy Policy */}
            {t('signupScreen.privPol')}{' '}
          </Button>
        </Typography>
      </FormSection>
    </RegisterCard>
  );
};

export default Signup;
