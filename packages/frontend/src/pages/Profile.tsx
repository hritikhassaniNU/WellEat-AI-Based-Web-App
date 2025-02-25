import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  IconButton,
  styled,
  useTheme,
} from '@mui/material';
import {
  LocalGroceryStore,
  Person,
  RestaurantMenu,
  Delete,
  PhotoCamera,
  Share,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { UserAPIService } from '../api';
import { StorageKeys } from '../constants';
import imageCompression from 'browser-image-compression';
import { useAuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { LanguageDropdown } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setLanguageDispatchFn,
  setUserDetailsDispatchFn,
} from '../store/slices/userSlice';
import i18n from '../i18n';
import { useFilePicker, useWindowShare } from '../hooks';
import { useNavigate } from 'react-router-dom';

const ProfileCard = styled(Paper)({
  borderRadius: '24px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  overflow: 'hidden',
  background: '#fff',
  position: 'relative',
  zIndex: 1,
});

const SidebarCard = styled(Paper)({
  borderRadius: '24px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
  position: 'relative',
  zIndex: 1,
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: `4px solid ${theme.palette.primary.main}`,
  boxShadow: '0 8px 16px rgba(122, 193, 67, 0.2)',
}));

const StyledChip = styled(Chip)(({ theme, selected }) => ({
  borderRadius: '12px',
  padding: '8px 4px',

  backgroundColor: selected ? theme.palette.primary.main : 'transparent',
  color: selected ? 'white' : '#64748B',
  border: selected ? 'none' : `1px solid ${theme.palette.primary.main}`,
  '&:hover': {
    backgroundColor: selected
      ? theme.palette.primary.dark
      : 'rgba(122, 193, 67, 0.1)',
  },
  transition: 'all 0.3s ease',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 700,
  marginBottom: '24px',

  color: '#2d3436',
  position: 'relative',
  paddingLeft: '20px',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '32px',
    background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    borderRadius: '4px',
  },
}));

const SubSectionTitle = styled(Typography)({
  fontSize: '1.2rem',
  fontWeight: 600,
  marginBottom: '16px',

  color: '#2d3436',
});

const StyledButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  borderRadius: '12px',
  padding: '12px 32px',
  color: 'white',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,

  boxShadow: '0 4px 14px rgba(122, 193, 67, 0.3)',
  '&:hover': {
    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
    boxShadow: '0 6px 20px rgba(122, 193, 67, 0.4)',
  },
}));

const StyledListItem = styled(ListItem)({
  borderRadius: '12px',
  marginBottom: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(122, 193, 67, 0.1)',
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(122, 193, 67, 0.15)',
    '&:hover': {
      backgroundColor: 'rgba(122, 193, 67, 0.2)',
    },
  },
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {},
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',

    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {},
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '& .MuiSvgIcon-root': {
    fontSize: '20px',
  },
}));

interface UpdateProfilePictureResponse {
  url: string;
}

const ProfilePage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const currentLanguage = useAppSelector((state) => state.user.language);
  const dispatch = useAppDispatch();
  const { pickFile } = useFilePicker();
  const { handleShare } = useWindowShare();
  const navigate = useNavigate();

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  const handleLanguageChange = (value: string) => {
    dispatch(setLanguageDispatchFn(value));
  };

  const [existingUserData] = useState(() => {
    const userDetails = localStorage.getItem(StorageKeys.USER_DETAILS) || '{}';
    return JSON.parse(userDetails);
  });

  const { deleteNewUser } = useAuthContext();

  // State to manage form data and profile details
  type ProfileData = {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    dateOfBirth: string;
    height: string;
    country: string;
    state: string;
    currentCity: string;
    dietaryPreferences: string[];
    allergies: string[];
    fitnessGoals: string;
    picture: string;
  };

  const [profileData, setProfileData] = useState<ProfileData>({
    email: existingUserData?.email || '',
    firstName: existingUserData?.firstName || '',
    lastName: existingUserData?.lastName || '',
    phone: '',
    dateOfBirth: '',
    height: '165',
    country: '',
    state: '',
    currentCity: '',
    dietaryPreferences: [],
    allergies: [],
    fitnessGoals: '',
    picture: '/api/placeholder/80/80',
  });

  // State to manage form errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle input changes for most fields
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Basic form validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    // Check required fields
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'dateOfBirth',
      'height',
      'country',
      'state',
      'currentCity',
      'dietaryPreferences',
    ];
    requiredFields.forEach((field) => {
      if (!profileData[field]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() +
          field.slice(1).replace(/([A-Z])/g, ' $1')
        } is required`;
      }
    });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (profileData.email && !emailRegex.test(profileData.email)) {
      newErrors.email = t('profileScreen.invalidEmail');
    }

    // Date of Birth validation (simple format check)
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (profileData.dateOfBirth && !dobRegex.test(profileData.dateOfBirth)) {
      newErrors.dateOfBirth = t('profileScreen.format');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (validateForm()) {
      UserAPIService.updateUserData(existingUserData?._id, {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phone: profileData.phone,
        dateOfBirth: profileData.dateOfBirth,
        medicalProfile: {
          allergies: profileData.allergies,
          previousAilments: [],
        },
        country: profileData.country,
        currentCity: profileData.currentCity,
        state: profileData.state,
        fitnessGoal: {
          goalType: profileData.fitnessGoals,
          targetDate: new Date(new Date().setDate(new Date().getDate() + 30)), //Default 30 days from now
        },
        dietaryPreferences: profileData.dietaryPreferences,
      });

      localStorage.setItem(
        StorageKeys.USER_DETAILS,
        JSON.stringify({
          ...existingUserData,
          email: profileData?.email,
          firstName: profileData?.firstName || '',
          lastName: profileData?.lastName || '',
        })
      );

      // Add your submit logic here
    }
  };

  //Integrated with FilePicker hook #FUGU CAPABILITY
  const handleProfilePictureChange2 = async () => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    const file = await pickFile();

    try {
      const compressedFile = await imageCompression(file, options);

      const formData = new FormData();
      formData.append('profilePicture', compressedFile);

      const res: UpdateProfilePictureResponse =
        await UserAPIService.updateProfilePicture(
          existingUserData?._id,
          formData
        );

      setProfileData({ ...profileData, picture: res.url });
    } catch (error) {
      console.error('Error compressing image:', error);
    }
  };

  const menuItems = [
    {
      text: t('profileScreen.myProfile'),
      icon: <Person />,
      selected: true,
      onClickHandler: () => {},
    },
    {
      text: t('profileScreen.myList'),
      icon: <LocalGroceryStore />,
      onClickHandler: () => {
        navigate('/mylist');
      },
    },
    {
      text: t('profileScreen.myRecipes'),
      icon: <RestaurantMenu />,
      onClickHandler: () => {
        navigate('/home');
      },
    },
    {
      text: t('profileScreen.delete'),
      icon: <Delete />,
      color: 'error',
      onClickHandler: () => {
        deleteNewUser(existingUserData?._id);
      },
    },
  ];

  const dietaryOptions = [
    t('profileScreen.vegan'),
    t('profileScreen.veggie'),
    t('profileScreen.egg'),
    t('profileScreen.pescaterian'),
    t('profileScreen.flexi'),
    t('profileScreen.macrob'),
  ];

  const allergyOptions = [
    t('profileScreen.peanuts'),
    t('profileScreen.treeNuts'),
    t('profileScreen.egg'),
    t('profileScreen.dairy'),
    t('profileScreen.shellfish'),
    t('profileScreen.glut'),
    t('profileScreen.soy'),
  ];

  const fitnessGoalOptions = [
    t('profileScreen.weightLoss'),
    t('profileScreen.muscleGain'),
    t('profileScreen.endurance'),
    t('profileScreen.flexib'),
    t('profileScreen.bal'),
    t('profileScreen.overWell'),
  ];

  const toggleAllergy = (allergy: string) => {
    setProfileData((prev) => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter((a) => a !== allergy)
        : [...prev.allergies, allergy],
    }));
  };

  useEffect(() => {
    UserAPIService.getUserData(existingUserData?._id).then((data) => {
      setProfileData({
        email: data?.email,
        firstName: data?.firstName || '',
        lastName: data?.lastName || '',
        phone: data?.phone || '',
        dateOfBirth: data?.dateOfBirth || '',
        height: data?.height || '165',
        country: data?.country || '',
        state: data?.state || '',
        currentCity: data?.currentCity || '',
        dietaryPreferences: data?.dietaryPreferences || [],
        allergies: data.medicalProfile?.allergies || [],
        fitnessGoals: data.fitnessGoal?.goalType || '',
        picture: data?.picture || '/api/placeholder/80/80',
      });

      dispatch(
        setUserDetailsDispatchFn({
          email: data?.email,
          firstName: data?.firstName || '',
          lastName: data?.lastName || '',
          phone: data?.phone || '',
          dateOfBirth: data?.dateOfBirth || '',
          height: data?.height || '165',
          country: data?.country || '',
          state: data?.state || '',
          currentCity: data?.currentCity || '',
          dietaryPreferences: data?.dietaryPreferences || [],
          allergies: data.medicalProfile?.allergies || [],
          fitnessGoals: data.fitnessGoal?.goalType || '',
          picture: data?.picture || '/api/placeholder/80/80',
        })
      );

      localStorage.setItem(
        StorageKeys.USER_DETAILS,
        JSON.stringify({
          ...existingUserData,
          email: data?.email,
          firstName: data?.firstName || '',
          lastName: data?.lastName || '',
          phone: data?.phone || '',
          dateOfBirth: data?.dateOfBirth || '',
          height: data?.height || '165',
          country: data?.country || '',
          state: data?.state || '',
          currentCity: data?.currentCity || '',
          dietaryPreferences: data?.dietaryPreferences || [],
          allergies: data.medicalProfile?.allergies || [],
          fitnessGoals: data.fitnessGoal?.goalType || '',
          picture: data?.picture || '/api/placeholder/80/80',
        })
      );
    });
  }, []);

  return (
    <Grid container spacing={4}>
      {/* Left Sidebar */}
      <Grid item xs={12} md={3}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SidebarCard elevation={0} sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 4,
              }}
            >
              <Box sx={{ position: 'relative', mb: 3 }}>
                <StyledAvatar src={profileData?.picture} />
                <StyledIconButton
                  component='label'
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    zIndex: 1,
                  }}
                  onClick={handleProfilePictureChange2}
                >
                  <PhotoCamera />
                </StyledIconButton>
              </Box>
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 600,

                  color: '#2d3436',
                  mb: 1,
                }}
              >
                {profileData.firstName} {profileData.lastName}
              </Typography>
              <Typography
                sx={{
                  color: '#64748B',
                }}
              >
                {profileData.city} {profileData.state} {profileData.country}
              </Typography>
            </Box>

            <List>
              {menuItems.map((item) => (
                <StyledListItem
                  key={item.text}
                  button
                  selected={item.selected}
                  onClick={item.onClickHandler}
                  sx={{
                    color: item.color === 'error' ? 'error.main' : 'inherit',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color:
                        item.color === 'error'
                          ? 'error.main'
                          : theme.palette.primary.main,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: 500,
                    }}
                  />
                </StyledListItem>
              ))}
            </List>
          </SidebarCard>
        </motion.div>
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} md={9}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ProfileCard elevation={0} sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <SectionTitle>{t('profileScreen.myProfile')}</SectionTitle>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Share
                  sx={{ mr: 2, color: theme.palette.primary.main }}
                  onClick={handleShare}
                />
                <LanguageDropdown onClick={handleLanguageChange} />
              </Box>
            </Box>

            <form onSubmit={onSubmit}>
              <SubSectionTitle>
                {t('profileScreen.personalInformation')}
              </SubSectionTitle>
              <Grid container spacing={3}>
                {/* Form fields using StyledTextField */}
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    name='firstName'
                    fullWidth
                    label={t('profileScreen.firstName')}
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    name='lastName'
                    fullWidth
                    label={t('profileScreen.lastName')}
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    disabled={true}
                    name='email'
                    fullWidth
                    label={t('profileScreen.email')}
                    value={profileData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    name='phone'
                    fullWidth
                    label={t('profileScreen.phone')}
                    value={profileData.phone}
                    onChange={handleInputChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    name='dateOfBirth'
                    fullWidth
                    label={t('profileScreen.dob')}
                    value={profileData.dateOfBirth}
                    onChange={handleInputChange}
                    error={!!errors.dateOfBirth}
                    helperText={errors.dateOfBirth || 'Format: YYYY-MM-DD'}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledFormControl fullWidth error={!!errors.height}>
                    <InputLabel id='height-label'>
                      {t('profileScreen.height')}
                    </InputLabel>
                    <Select
                      name='height'
                      labelId='height-label'
                      label={t('profileScreen.height')}
                      value={profileData.height}
                      onChange={handleInputChange}
                    >
                      {[150, 155, 160, 165, 170, 175, 180, 185, 190].map(
                        (height) => (
                          <MenuItem key={height} value={height}>
                            {height} cm
                          </MenuItem>
                        )
                      )}
                    </Select>
                    {errors.height && (
                      <FormHelperText>{errors.height}</FormHelperText>
                    )}
                  </StyledFormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledTextField
                    name='country'
                    fullWidth
                    label={t('profileScreen.country')}
                    value={profileData.country}
                    onChange={handleInputChange}
                    error={!!errors.country}
                    helperText={errors.country}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledTextField
                    name='state'
                    fullWidth
                    label={t('profileScreen.state')}
                    value={profileData.state}
                    onChange={handleInputChange}
                    error={!!errors.state}
                    helperText={errors.state}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledTextField
                    name='currentCity'
                    fullWidth
                    label={t('profileScreen.city')}
                    value={profileData.currentCity}
                    onChange={handleInputChange}
                    error={!!errors.city}
                    helperText={errors.city}
                  />
                </Grid>
              </Grid>

              {/* Dietary Preferences Section */}
              <Box sx={{ mt: 4, mb: 4 }}>
                <SubSectionTitle>
                  {t('profileScreen.dietaryPref')}
                </SubSectionTitle>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {dietaryOptions.map((option) => (
                    <StyledChip
                      key={option}
                      label={option}
                      selected={profileData.dietaryPreferences.includes(option)}
                      onClick={() =>
                        setProfileData((prev) => ({
                          ...prev,
                          dietaryPreferences: prev.dietaryPreferences.includes(
                            option
                          )
                            ? prev.dietaryPreferences.filter(
                                (p) => p !== option
                              )
                            : [...prev.dietaryPreferences, option],
                        }))
                      }
                    />
                  ))}
                </Box>
              </Box>

              {/* Allergies Section */}
              <Box sx={{ mt: 4, mb: 4 }}>
                <SubSectionTitle>
                  {t('profileScreen.allergies')}
                </SubSectionTitle>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {allergyOptions.map((option) => (
                    <StyledChip
                      key={option}
                      label={option}
                      selected={profileData.allergies.includes(option)}
                      onClick={() => toggleAllergy(option)}
                    />
                  ))}
                </Box>
              </Box>

              {/* Fitness Goals Section */}
              <Box sx={{ mt: 4, mb: 4 }}>
                <SubSectionTitle>{t('profileScreen.fitGoal')}</SubSectionTitle>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {fitnessGoalOptions.map((option) => (
                    <StyledChip
                      key={option}
                      label={option}
                      selected={profileData.fitnessGoals === option}
                      onClick={() =>
                        setProfileData((prev) => ({
                          ...prev,
                          fitnessGoals: option,
                        }))
                      }
                    />
                  ))}
                </Box>
              </Box>

              {/* Submit Button */}
              <Box sx={{ mt: 5, display: 'flex', justifyContent: 'flex-end' }}>
                <StyledButton type='submit'>
                  {t('profileScreen.updProf')}
                </StyledButton>
              </Box>
            </form>
          </ProfileCard>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
