import {
  Box,
  Typography,
  Button,
  styled,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import Product from '../components/Product/Product';
import AboutUs from '../components/AboutUs/About';
import Recipes from '../components/Recipes/Recipes';
import TipandArticle from '../components/TipsandArticles/TipsandArticles';
import Info from '../components/Info/Info';
import ScanLabel from '../components/ScanLabel/ScanLabel';
import Footer from '../components/Footer/Footer';
import ScrollBar from '../components/ScrollBar/ScrollBar';
import { useNavigate } from 'react-router-dom';
import DishImage from '../../assets/images/dietplate.png';
import { useTranslation } from 'react-i18next';

const HeroContainer = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #f5f9f5 0%, #ffffff 100%)',
  position: 'relative',
  overflow: 'hidden',
  paddingTop: '80px',
  '@media (max-width: 900px)': {
    paddingTop: '60px',
  },
});

const ContentWrapper = styled(Box)({
  maxWidth: '1200px',
  margin: '0 auto',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '40px 20px',
  position: 'relative',
  zIndex: 1,
  gap: '40px',
  '@media (max-width: 900px)': {
    flexDirection: 'column',
    textAlign: 'center',
    padding: '20px',
  },
});

const TextContent = styled(Box)({
  flex: 1,
  maxWidth: '500px',
  '@media (max-width: 900px)': {
    maxWidth: '100%',
    marginBottom: '40px',
  },
});

const ImageContainer = styled(Box)({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '@media (max-width: 900px)': {
    width: '100%',
  },
});

const ButtonContainer = styled(Box)({
  display: 'flex',
  gap: '16px',
  '@media (max-width: 600px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const ActionButton = styled(Button)({
  borderRadius: '30px',
  padding: '12px 30px',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
  },
});

const GetStartedButton = styled(ActionButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const LandingPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:900px)');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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
    <>
      <HeroContainer>
        <ContentWrapper>
          <TextContent>
            <motion.div
              variants={containerVariants}
              initial='hidden'
              animate='visible'
            >
              <motion.div variants={itemVariants}>
                <Typography
                  sx={{
                    color: theme.palette.primary.main,
                    letterSpacing: '2px',
                    marginBottom: '20px',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  {t('hero.subtitle')}
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant='h1'
                  sx={{
                    fontSize: {
                      xs: '2.5rem',
                      sm: '3rem',
                      md: '3.5rem',
                    },
                    fontWeight: 800,
                    marginBottom: '20px',
                    lineHeight: 1.2,
                    backgroundImage: `linear-gradient(45deg, #2C5282,${theme.palette.primary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {t('hero.title')}
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  sx={{
                    color: '#666',
                    marginBottom: '30px',
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                  }}
                >
                  {t('hero.description')}
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <ButtonContainer>
                  <GetStartedButton onClick={() => navigate('/login')}>
                    {t('hero.getStarted')}
                  </GetStartedButton>
                </ButtonContainer>
              </motion.div>
            </motion.div>
          </TextContent>

          <ImageContainer>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Box
                component='img'
                src={DishImage}
                // src='public/assets/images/dietplate.png'
                alt='Healthy Food Plate'
                sx={{
                  width: isMobile ? '300px' : isTablet ? '400px' : '450px',
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.1))',
                  animation: 'float 6s ease-in-out infinite',
                  '@keyframes float': {
                    '0%, 100%': {
                      transform: 'translateY(0)',
                    },
                    '50%': {
                      transform: 'translateY(-20px)',
                    },
                  },
                }}
              />
            </motion.div>
          </ImageContainer>
        </ContentWrapper>
      </HeroContainer>
      <ScanLabel />
      <Product />
      <Info />
      <ScrollBar />
      <Recipes />
      <AboutUs />
      <TipandArticle />
      <Footer />
    </>
  );
};

export default LandingPage;
