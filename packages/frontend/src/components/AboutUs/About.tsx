import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  useTheme,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Navbar from '../Navbar/Navbar';
import { Assessment, HealthAndSafety, Psychology } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

// Styled Components
const StyledSection = styled(Box)(({ theme }) => ({
  paddingTop: '120px',
  paddingBottom: '80px',
  background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
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
      'radial-gradient(circle at 0% 0%, rgba(122, 193, 67, 0.1) 0%, rgba(122, 193, 67, 0.1) 50%)',
    zIndex: 0,
  },
}));

const ContentWrapper = styled(Box)({
  position: 'relative',
  zIndex: 1,
});

const ImageContainer = styled(motion.div)({
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80%',
    height: '20px',
    background:
      'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 70%)',
    borderRadius: '50%',
  },
});

const StyledImage = styled('img')({
  width: '100%',
  maxWidth: '600px',
  height: 'auto',
  borderRadius: '30px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
});

const FeatureCard = styled(motion.div)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '16px',
  borderRadius: '12px',
  backgroundColor: 'white',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  transition: 'all 0.3s ease',
  width: '280px',
  border: '1px solid rgba(0, 0, 0, 0.05)',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 4px 12px rgba(122, 193, 67, 0.15)',
    '& .icon': {
      backgroundColor: theme.palette.primary.main,
      '& svg': {
        color: 'white',
      },
    },
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '10px',
  backgroundColor: 'rgba(122, 193, 67, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  '& svg': {
    fontSize: '20px',
    color: theme.palette.primary.main,
    transition: 'all 0.3s ease',
  },
}));

const features = [
  {
    icon: <Assessment />,
    title: 'Smart Analysis',
    description: 'AI-powered scanning',
  },
  {
    icon: <HealthAndSafety />,
    title: 'Product Score',
    description: 'Nutrition insights',
  },
  {
    icon: <Psychology />,
    title: 'Personalized',
    description: 'Custom recommendations',
  },
];

const About = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  return (
    <>
      <Navbar />
      <StyledSection id='about'>
        <Container maxWidth='lg'>
          <ContentWrapper>
            <motion.div
              variants={containerVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
            >
              <Grid container spacing={6} alignItems='center'>
                <Grid item xs={12} md={6}>
                  <motion.div variants={itemVariants}>
                    <Typography
                      variant='h6'
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                        mb: 2,
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                      }}
                    >
                      {t('about.subtitle')}
                    </Typography>

                    <Typography
                      variant='h2'
                      sx={{
                        fontSize: { xs: '2.5rem', md: '3.5rem' },
                        fontWeight: 700,
                        mb: 3,
                        background: `linear-gradient(45deg, #2C5282, ${theme.palette.primary.main})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        lineHeight: 1.2,
                      }}
                    >
                      {t('about.title')}
                    </Typography>

                    <Typography
                      variant='body1'
                      sx={{
                        mb: 4,
                        color: '#64748B',
                        fontSize: '1.1rem',
                        lineHeight: 1.8,
                        maxWidth: '500px',
                      }}
                    >
                      {t('about.description')}
                    </Typography>

                    <Box sx={{ mb: 6 }}>
                      <Stack direction='row' spacing={2}>
                        {features.map((feature, index) => (
                          <FeatureCard key={index}>
                            <IconWrapper className='icon'>
                              {feature.icon}
                            </IconWrapper>
                            <Box>
                              <Typography
                                variant='subtitle1'
                                sx={{
                                  fontWeight: 600,
                                  fontSize: '0.95rem',
                                  color: '#1E293B',
                                }}
                              >
                                {t(feature.title)}
                              </Typography>
                            </Box>
                          </FeatureCard>
                        ))}
                      </Stack>
                    </Box>

                    <Button
                      variant='contained'
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        color: 'white',
                        py: 1.5,
                        px: 4,
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        boxShadow: '0 4px 14px rgba(122, 193, 67, 0.3)',
                        '&:hover': {
                          bgcolor: theme.palette.primary.dark,
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 20px rgba(122, 193, 67, 0.4)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {t('about.learnMore')}
                    </Button>
                  </motion.div>
                </Grid>

                {/* Image section remains unchanged */}
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <ImageContainer variants={imageVariants}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <StyledImage
                        src='public/assets/images/about.png'
                        alt={t('about.subtitle')}
                        loading='lazy'
                      />
                    </motion.div>
                  </ImageContainer>
                </Grid>
              </Grid>
            </motion.div>
          </ContentWrapper>
        </Container>
      </StyledSection>
    </>
  );
};

export default About;
