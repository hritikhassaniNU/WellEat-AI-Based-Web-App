import {
  Box,
  Container,
  Typography,
  Chip,
  Paper,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Science, Cookie, LocalFireDepartment } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const Section = styled(Box)({
  padding: '100px 0',
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
      'radial-gradient(circle at 0% 0%, rgba(122, 193, 67, 0.1) 0%, transparent 50%)',
    zIndex: 0,
  },
});

const FlexContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '64px',
  alignItems: 'center',
  justifyContent: 'space-between',
  '@media (max-width: 900px)': {
    flexDirection: 'column',
    gap: '32px',
  },
});

const ProductContainer = styled(Box)({
  flex: '0 1 45%',
  position: 'relative',
  padding: '20px',
  '@media (max-width: 900px)': {
    width: '100%',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60%',
    height: '20px',
    background:
      'radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 70%)',
    borderRadius: '50%',
  },
});

const ContentSection = styled(Box)({
  flex: '0 1 45%',
  '@media (max-width: 900px)': {
    width: '100%',
    textAlign: 'center',
  },
});

const Info = styled(Chip)({
  backgroundColor: '#fff',
  borderRadius: '20px',
  height: '36px',
  margin: '4px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  '& .MuiChip-label': {
    padding: '0 12px',
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
  },
  transition: 'all 0.3s ease',
});

const ScoreIndicator = styled(Paper)({
  position: 'absolute',
  top: 20,
  right: -10,
  padding: '12px 20px',
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  background: 'white',
  zIndex: 2,
});

const ScanLabel = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:900px)');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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

  const healthScore = 40;
  const warningItems = [
    { icon: <Science />, labelKey: 'scan.warnings.additives', count: 6 },
    { icon: <Cookie />, labelKey: 'scan.warnings.salt' },
    { icon: <LocalFireDepartment />, labelKey: 'scan.warnings.calories' },
  ];

  return (
    <Section>
      <Container maxWidth='lg'>
        <FlexContainer>
          <ProductContainer>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Box sx={{ position: 'relative' }}>
                <motion.img
                  src='https://m.media-amazon.com/images/I/81vJyb43URL._SL1500_.jpg'
                  alt={t('scan.altText')}
                  style={{
                    width: '100%',
                    maxWidth: '400px',
                    height: 'auto',
                    display: 'block',
                    margin: '0 auto',
                    transform: 'rotate(-5deg)',
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  }}
                  whileHover={{ rotate: 45, transition: { duration: 0.3 } }}
                />

                <ScoreIndicator elevation={0}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#ff4444',
                    }}
                  />
                  <Typography variant='body2' sx={{ fontWeight: 600 }}>
                    {t('scan.healthScore', { score: healthScore })}
                  </Typography>
                </ScoreIndicator>

                <Box
                  sx={{
                    position: 'absolute',
                    right: { xs: -10, md: -40 },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                    zIndex: 1,
                  }}
                >
                  {warningItems.map((item, index) => (
                    <motion.div
                      key={item.labelKey}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: { delay: index * 0.2 },
                        },
                      }}
                      initial='hidden'
                      whileInView='visible'
                      viewport={{ once: true }}
                    >
                      <Info
                        icon={item.icon}
                        label={t(item.labelKey, { count: item.count })}
                      />
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </ProductContainer>

          <ContentSection>
            <motion.div
              variants={containerVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants}>
                <Typography
                  variant='h2'
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 700,
                    mb: 3,
                    lineHeight: 1.2,
                  }}
                >
                  {t('scan.title.main')}{' '}
                  <Typography
                    component='span'
                    variant='inherit'
                    sx={{
                      color: theme.palette.primary.main,
                    }}
                  >
                    {t('scan.title.highlight')}
                  </Typography>
                </Typography>

                <motion.div variants={itemVariants}>
                  <Typography
                    variant='body1'
                    sx={{
                      color: '#666',
                      fontSize: '1.1rem',
                      lineHeight: 1.6,
                      maxWidth: '560px',
                      margin: isMobile ? '0 auto' : 'inherit',
                    }}
                  >
                    {t('scan.description')}
                  </Typography>
                </motion.div>
              </motion.div>
            </motion.div>
          </ContentSection>
        </FlexContainer>
      </Container>
    </Section>
  );
};

export default ScanLabel;
