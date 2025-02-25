import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Container,
  styled,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  ArrowBack as ArrowBackIcon,
  CalendarToday,
  LocalDining,
  HealthAndSafety,
  FitnessCenter,
  Person,
  Phone,
  Check,
  NavigateNext,
  Height,
  Public,
  HomeWork,
  LocationCity,
  MyLocation,
} from '@mui/icons-material';
import { StorageKeys } from '../constants';
import { useNavigate } from 'react-router-dom';
import { UserAPIService } from '../api';
import { useTranslation } from 'react-i18next';

// Form Data Interface - Defines the structure of user input data
interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  height: string;
  country: string;
  state: string;
  currentCity: string;
  zipCode: string;
  dietaryPreferences: string[];
  allergies: string[];
  fitnessGoals: string;
}

// Form Error Interface - Defines possible validation errors
interface FormErrors {
  firstName?: string;
  lastName?: string;
}

// Styled Components
const PageWrapper = styled(Box)({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f5f9f5 0%, #ffffff 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background:
      'radial-gradient(circle at 0% 0%, rgba(122, 193, 67, 0.1) 0%, transparent 50%)',
    zIndex: 0,
  },
});

const ContentCard = styled(Card)({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  overflow: 'hidden',
  position: 'relative',
  zIndex: 1,
  minHeight: '600px',
  display: 'flex',
  flexDirection: 'column',
});

const StyledChipBox = styled(Box)(({ theme }) => ({
  padding: '10px 20px',
  borderRadius: '50px',
  border: `1px solid ${theme.palette.primary.main}`,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  margin: '8px',
  transition: 'all 0.3s ease',

  fontSize: '0.9rem',
  backgroundColor: 'white', // Set default background
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(122, 193, 67, 0.2)',
  },
  '&.selected': {
    border: `2px solid ${theme.palette.primary.main}`,
    color: `${theme.palette.primary.main}`,
    backgroundColor: 'white',
    fontWeight: '500',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: '#f8fafc',

    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
    },
  },
  '& .MuiInputLabel-root': {},
  '& input': {
    padding: '16px 14px',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 700,
  marginBottom: '1.5rem',

  textAlign: 'center',
  color: '#2d3436',
  '& span': {
    background: `linear-gradient(45deg, #2C5282,${theme.palette.primary.main})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
}));

const StepIndicator = styled(Box)<{ active: boolean }>(({ theme, active }) => ({
  width: active ? '32px' : '8px',
  height: '8px',
  borderRadius: '4px',
  backgroundColor: active
    ? theme.palette.primary.main
    : 'rgba(122, 193, 67, 0.2)',
  transition: 'all 0.3s ease',
}));

const Image = styled('img')({
  width: '250px', // More controlled width
  height: 'auto', // Let height adjust automatically
  borderRadius: '15px',
  objectFit: 'contain',
  display: 'block', // Important for centering
  margin: '0 auto', // Center horizontally
});
const Onboarding: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  // Initialize user data from localStorage
  const [existingUserData] = useState(() => {
    const userDetails = localStorage.getItem(StorageKeys.USER_DETAILS) || '{}';
    return JSON.parse(userDetails);
  });

  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    height: '',
    country: '',
    state: '',
    currentCity: '',
    zipCode: '',
    dietaryPreferences: [],
    allergies: [],
    fitnessGoals: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Check if user is already registered
  useEffect(() => {
    if (
      !localStorage.getItem(StorageKeys.IS_NEW_USER) &&
      localStorage.getItem(StorageKeys.AUTH_TOKEN)
    ) {
      navigate('/home');
    }
  }, []);

  // Handle form completion and submission
  const handleGetStartedBtn = async () => {
    await UserAPIService.updateUserData(existingUserData?._id, {
      ...formData,
      medicalProfile: {
        allergies: formData.allergies,
        previousAilments: [],
      },
      fitnessGoal: {
        goalType: formData.fitnessGoals,
        targetDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      },
    });

    localStorage.setItem(
      StorageKeys.USER_DETAILS,
      JSON.stringify({ ...existingUserData, ...formData })
    );
    localStorage.removeItem(StorageKeys.IS_NEW_USER);
    navigate('/home');
  };

  // Options for selection fields
  const dietaryOptions = [
    t('onboardingScreen.dietary.options.vegan'),
    t('onboardingScreen.dietary.options.vegetarian'),
    t('onboardingScreen.dietary.options.eggetarian'),
    t('onboardingScreen.dietary.options.pescaterian'),
    t('onboardingScreen.dietary.options.flexitarian'),
    t('onboardingScreen.dietary.options.macrobiotic'),
  ];

  const allergyOptions = [
    t('onboardingScreen.allergies.options.peanuts'),
    t('onboardingScreen.allergies.options.treeNuts'),
    t('onboardingScreen.allergies.options.eggs'),
    t('onboardingScreen.allergies.options.dairy'),
    t('onboardingScreen.allergies.options.shellfish'),
    t('onboardingScreen.allergies.options.gluten'),
    t('onboardingScreen.allergies.options.soy'),
  ];

  const fitnessGoalOptions = [
    t('onboardingScreen.fitness.options.weightLoss'),
    t('onboardingScreen.fitness.options.muscleGain'),
    t('onboardingScreen.fitness.options.endurance'),
    t('onboardingScreen.fitness.options.flexibility'),
    t('onboardingScreen.fitness.options.balance'),
    t('onboardingScreen.fitness.options.wellness'),
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleMultiSelect = (
    category: keyof Pick<
      FormData,
      'dietaryPreferences' | 'allergies' | 'fitnessGoals'
    >,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [category]:
        category === 'fitnessGoals'
          ? value // Single selection for fitness goals
          : Array.isArray(prev[category]) // Multi-selection for others
          ? prev[category].includes(value)
            ? prev[category].filter((item) => item !== value)
            : [...prev[category], value]
          : [value],
    }));
  };

  const validateStep = (): boolean => {
    const newErrors: FormErrors = {};

    if (currentStep === 1) {
      if (!formData.firstName)
        newErrors.firstName = t(
          'onboardingScreen.validation.firstNameRequired'
        );
      if (!formData.lastName)
        newErrors.lastName = t('onboardingScreen.validation.lastNameRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Animation variants
  const welcomeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };
  const renderWelcome = () => (
    <motion.div variants={welcomeVariants} initial='hidden' animate='visible'>
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Image
            src='\src\assets\images\onboarding.png'
            alt='onboarding-image'
          />
        </Box>

        <SectionTitle>{t('onboardingScreen.welcome.title')}</SectionTitle>

        <Typography
          variant='h6'
          sx={{
            color: '#64748B',
            mb: 4,

            fontWeight: 500,
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          {t('onboardingScreen.welcome.subtitle')}
          {t('onboardingScreen.welcome.joinCommunity')}
        </Typography>

        <Grid
          container
          spacing={3}
          sx={{ mt: 4, maxWidth: '800px', margin: '0 auto' }}
        >
          {[
            {
              icon: (
                <HealthAndSafety
                  sx={{ fontSize: 40, color: theme.palette.primary.main }}
                />
              ),
              title: t('onboardingScreen.features.smartAnalysis.title'),
              description: t(
                'onboardingScreen.features.smartAnalysis.description'
              ),
            },
            {
              icon: (
                <LocalDining
                  sx={{ fontSize: 40, color: theme.palette.primary.main }}
                />
              ),
              title: t('onboardingScreen.features.personalizedDiet.title'),
              description: t(
                'onboardingScreen.features.personalizedDiet.description'
              ),
            },
            {
              icon: (
                <FitnessCenter
                  sx={{ fontSize: 40, color: theme.palette.primary.main }}
                />
              ),
              title: t('onboardingScreen.features.healthTracking.title'),
              description: t(
                'onboardingScreen.features.healthTracking.description'
              ),
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                  padding: 3,
                  borderRadius: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  height: '100%',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography
                  variant='h6'
                  sx={{
                    mb: 1,

                    fontWeight: 600,
                    color: '#2d3436',
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  sx={{
                    color: '#64748B',
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </motion.div>
  );

  const renderPersonalInfo = () => (
    <Box sx={{ py: 4 }}>
      <SectionTitle>
        {t('onboardingScreen.personalInfo.title.main')}{' '}
        <span>{t('onboardingScreen.personalInfo.title.highlight')}</span>
      </SectionTitle>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6}>
          <StyledTextField
            fullWidth
            label={t('onboardingScreen.personalInfo.firstName')}
            name='firstName'
            value={formData.firstName}
            onChange={handleInputChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
            InputProps={{
              startAdornment: (
                <Person sx={{ color: theme.palette.primary.main, mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledTextField
            fullWidth
            label={t('onboardingScreen.personalInfo.lastName')}
            name='lastName'
            value={formData.lastName}
            onChange={handleInputChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
            InputProps={{
              startAdornment: (
                <Person sx={{ color: theme.palette.primary.main, mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            label={t('onboardingScreen.personalInfo.phone')}
            name='phone'
            value={formData.phone}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <Phone sx={{ color: theme.palette.primary.main, mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledTextField
            fullWidth
            type='date'
            label={t('onboardingScreen.personalInfo.dateOfBirth')}
            name='dateOfBirth'
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <CalendarToday
                  sx={{ color: theme.palette.primary.main, mr: 1 }}
                />
              ),
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledTextField
            fullWidth
            label={t('onboardingScreen.personalInfo.height')}
            name='height'
            value={formData.height}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <Height sx={{ color: theme.palette.primary.main, mr: 1 }} />
              ),
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderLocationInfo = () => (
    <Box sx={{ py: 4 }}>
      <SectionTitle>
        {t('onboardingScreen.location.title.main')}{' '}
        <span>{t('onboardingScreen.location.title.highlight')}</span>
      </SectionTitle>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            label={t('onboardingScreen.location.country')}
            name='country'
            value={formData.country}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <Public sx={{ color: theme.palette.primary.main, mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            label={t('onboardingScreen.location.state')}
            name='state'
            value={formData.state}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <HomeWork sx={{ color: theme.palette.primary.main, mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <StyledTextField
            fullWidth
            label={t('onboardingScreen.location.city')}
            name='currentCity'
            value={formData.currentCity}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <LocationCity
                  sx={{ color: theme.palette.primary.main, mr: 1 }}
                />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StyledTextField
            fullWidth
            label={t('onboardingScreen.location.zipCode')}
            name='zipCode'
            value={formData.zipCode}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <MyLocation sx={{ color: theme.palette.primary.main, mr: 1 }} />
              ),
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
  const renderDietaryPreferences = () => (
    <Box sx={{ py: 2, textAlign: 'center' }}>
      <Typography variant='h4' gutterBottom sx={{ fontWeight: 'bold' }}>
        {t('onboardingScreen.dietary.title')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 1,
          marginTop: 4,
        }}
      >
        {dietaryOptions.map((option) => (
          <StyledChipBox
            key={option}
            onClick={() => handleMultiSelect('dietaryPreferences', option)}
            className={
              formData.dietaryPreferences.includes(option) ? 'selected' : ''
            }
          >
            {option}
          </StyledChipBox>
        ))}
      </Box>
    </Box>
  );

  const renderAllergies = () => (
    <Box sx={{ py: 2, textAlign: 'center' }}>
      <Typography variant='h4' gutterBottom sx={{ fontWeight: 'bold' }}>
        {t('onboardingScreen.allergies.title')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 1,
          marginTop: 4,
        }}
      >
        {allergyOptions.map((option) => (
          <StyledChipBox
            key={option}
            onClick={() => handleMultiSelect('allergies', option)}
            className={formData.allergies.includes(option) ? 'selected' : ''}
          >
            {option}
          </StyledChipBox>
        ))}
      </Box>
    </Box>
  );

  const renderFitnessGoals = () => (
    <Box sx={{ py: 2, textAlign: 'center' }}>
      <Typography variant='h4' gutterBottom sx={{ fontWeight: 'bold' }}>
        {t('onboardingScreen.fitness.title')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 1,
          marginTop: 4,
        }}
      >
        {fitnessGoalOptions.map((option) => (
          <StyledChipBox
            key={option}
            onClick={() => handleMultiSelect('fitnessGoals', option)}
            className={formData.fitnessGoals === option ? 'selected' : ''}
          >
            {option}
          </StyledChipBox>
        ))}
      </Box>
    </Box>
  );

  const steps = [
    { content: renderWelcome, title: t('onboardingScreen.steps.welcome') },
    {
      content: renderPersonalInfo,
      title: t('onboardingScreen.steps.personalInfo'),
    },
    {
      content: renderLocationInfo,
      title: t('onboardingScreen.steps.location'),
    },
    {
      content: renderDietaryPreferences,
      title: t('onboardingScreen.steps.diet'),
    },
    { content: renderAllergies, title: t('onboardingScreen.steps.allergies') },
    { content: renderFitnessGoals, title: t('onboardingScreen.steps.fitness') },
  ];

  return (
    <PageWrapper>
      <Container maxWidth='lg' sx={{ py: 4 }}>
        <ContentCard>
          <CardContent
            sx={{ p: 4, flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            <Box sx={{ flex: 1, minHeight: '400px' }}>
              {steps[currentStep].content()}
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
                my: 4,
              }}
            >
              {steps.map((_, index) => (
                <StepIndicator key={index} active={index === currentStep} />
              ))}
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                mt: 'auto',
              }}
            >
              {currentStep > 0 && (
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={handleBack}
                  variant='outlined'
                  sx={{
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    borderRadius: '12px',
                    padding: '12px 24px',
                    textTransform: 'none',

                    '&:hover': {
                      borderColor: theme.palette.primary.dark,
                      backgroundColor: 'rgba(122, 193, 67, 0.1)',
                    },
                  }}
                >
                  {t('onboardingScreen.navigation.back')}
                </Button>
              )}

              <Button
                onClick={
                  currentStep === steps.length - 1
                    ? handleGetStartedBtn
                    : handleNext
                }
                endIcon={
                  currentStep === steps.length - 1 ? (
                    <Check />
                  ) : (
                    <NavigateNext />
                  )
                }
                variant='contained'
                fullWidth={currentStep === 0}
                sx={{
                  background: `linear-gradient(45deg,${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  borderRadius: '12px',
                  padding: '12px 32px',
                  color: 'white',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,

                  minWidth: '160px',
                  boxShadow: '0 4px 14px rgba(122, 193, 67, 0.3)',
                  '&:hover': {
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                    boxShadow: '0 6px 20px rgba(122, 193, 67, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {currentStep === 0
                  ? t('onboardingScreen.welcome.getStarted')
                  : currentStep === steps.length - 1
                  ? t('onboardingScreen.navigation.complete')
                  : t('onboardingScreen.navigation.next')}
              </Button>
            </Box>
          </CardContent>
        </ContentCard>
      </Container>
    </PageWrapper>
  );
};

export default Onboarding;
