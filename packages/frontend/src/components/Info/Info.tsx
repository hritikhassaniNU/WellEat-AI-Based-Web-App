import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import {
  RestaurantOutlined,
  CompareArrowsOutlined,
  ScienceOutlined,
  HistoryOutlined,
} from '@mui/icons-material';
import PhoneImage from '../../assets/images/iphone-mockup.png';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const StyledSection = styled(Box)({
  backgroundColor: '#F5F9F5',
  paddingTop: '40px', // Reduced top spacing
  paddingBottom: '60px',
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

const FeatureIcon = styled(Box)<{ iconColor: string }>(({ iconColor }) => ({
  width: '56px',
  height: '56px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '16px',
  backgroundColor: `${iconColor}15`,
  border: `2px solid ${iconColor}`,
  marginRight: '24px',
  transition: 'all 0.3s ease',
  '& svg': {
    fontSize: '28px',
    color: iconColor,
  },
}));

const PhoneContainer = styled(motion.div)({
  position: 'relative',
  width: '340px',
  margin: '0 auto',
  '& img': {
    width: '100%',
    height: 'auto',
  },
});

const Feature = styled(motion.div)({
  display: 'flex',
  marginBottom: '32px',
  alignItems: 'flex-start',
});

const features = [
  {
    icon: <RestaurantOutlined />,
    titleKey: 'info.features.aiAnalysis.title',
    descriptionKey: 'info.features.aiAnalysis.description',
    color: '#7AC143',
  },
  {
    icon: <CompareArrowsOutlined />,
    titleKey: 'info.features.smartRecommendations.title',
    descriptionKey: 'info.features.smartRecommendations.description',
    color: '#4A90E2',
  },
  {
    icon: <ScienceOutlined />,
    titleKey: 'info.features.ingredientAnalysis.title',
    descriptionKey: 'info.features.ingredientAnalysis.description',
    color: '#F59E0B',
  },
  {
    icon: <HistoryOutlined />,
    titleKey: 'info.features.healthTracking.title',
    descriptionKey: 'info.features.healthTracking.description',
    color: '#7AC143',
  },
];

const Info: React.FC = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  return (
    <StyledSection>
      <Container maxWidth='lg'>
        <Grid container spacing={6} alignItems='center'>
          <Grid item xs={12} md={6}>
            <motion.div
              variants={containerVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
            >
              <Typography
                variant='h2'
                sx={{
                  fontSize: { xs: '2.5rem', md: '3rem' },
                  fontWeight: 700,
                  mb: 4,
                  color: '#1E293B',
                }}
              >
                {t('info.title.main')}
                <Box
                  component='span'
                  sx={{
                    color: '#7AC143',
                    display: 'block',
                  }}
                >
                  {t('info.title.sub')}
                </Box>
              </Typography>
              {features.map((feature, index) => (
                <Feature key={index} variants={itemVariants}>
                  <FeatureIcon iconColor={feature.color}>
                    {feature.icon}
                  </FeatureIcon>
                  <Box>
                    <Typography
                      variant='h6'
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        color: feature.color,
                      }}
                    >
                      {t(feature.titleKey)}
                    </Typography>
                    <Typography
                      variant='body1'
                      sx={{
                        color: '#64748B',
                        lineHeight: 1.8,
                        maxWidth: '460px',
                      }}
                    >
                      {t(feature.descriptionKey)}
                    </Typography>
                  </Box>
                </Feature>
              ))}
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <PhoneContainer
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.img
                src={PhoneImage}
                alt={t('info.altText')}
                initial={{ y: 20 }}
                animate={{ y: [-20, 20] }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 3,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80%',
                  height: '20px',
                  background:
                    'radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 70%)',
                  borderRadius: '50%',
                }}
              />
            </PhoneContainer>
          </Grid>
        </Grid>
      </Container>
    </StyledSection>
  );
};

export default Info;
