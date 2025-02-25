import {
  Card,
  Typography,
  Grid,
  Box,
  Container,
  styled,
  useTheme,
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const customStyles = `
  .swiper-pagination {
    position: relative;
    margin-top: 40px;
  }

  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    background: rgba(122, 193, 67, 0.2);
    opacity: 1;
    transition: all 0.3s ease;
    margin: 0 8px !important;
  }

  .swiper-pagination-bullet-active {
    width: 32px;
    border-radius: 6px;
    background: #7ac143;
    box-shadow: 0 2px 8px rgba(122, 193, 67, 0.4);
  }
`;

const PageSection = styled(Box)({
  background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
  minHeight: '100vh',
  padding: '120px 0 80px 0',
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
});

const StyledCard = styled(Card)({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '30px',
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
  minHeight: '600px',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(255, 255, 255, 0.2)',
});

const ImageContainer = styled(Box)({
  position: 'relative',
  height: '500px',
  overflow: 'hidden',
  borderRadius: '20px',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)',
  },
});

const ProductImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.5s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const NutritionInfoCard = styled(Box)({
  background: 'white',
  borderRadius: '20px',
  padding: '20px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
  marginBottom: '24px',
});

const HealthBadge = styled(Box)({
  position: 'absolute',
  top: 20,
  right: 20,
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(4px)',
  padding: '10px 20px',
  borderRadius: '15px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  zIndex: 2,
});

const Product = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const productData = [
    {
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
      titleKey: 'product.meals.superBowl.title',
      descriptionKey: 'product.meals.superBowl.description',
      healthScore: 95,
      nutritionInfo: [
        { labelKey: 'product.nutritionLabels.calories', value: '450 kcal' },
        { labelKey: 'product.nutritionLabels.protein', value: '22g' },
        { labelKey: 'product.nutritionLabels.carbs', value: '55g' },
        { labelKey: 'product.nutritionLabels.fats', value: '18g' },
        { labelKey: 'product.nutritionLabels.fiber', value: '12g' },
      ],
    },
    {
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
      titleKey: 'product.meals.mediterranean.title',
      descriptionKey: 'product.meals.mediterranean.description',
      healthScore: 92,
      nutritionInfo: [
        { labelKey: 'product.nutritionLabels.calories', value: '380 kcal' },
        { labelKey: 'product.nutritionLabels.protein', value: '18g' },
        { labelKey: 'product.nutritionLabels.carbs', value: '48g' },
        { labelKey: 'product.nutritionLabels.fats', value: '22g' },
        { labelKey: 'product.nutritionLabels.fiber', value: '24g' },
      ],
    },
    {
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
      titleKey: 'product.meals.proteinBowl.title',
      descriptionKey: 'product.meals.proteinBowl.description',
      healthScore: 90,
      nutritionInfo: [
        { labelKey: 'product.nutritionLabels.calories', value: '520 kcal' },
        { labelKey: 'product.nutritionLabels.protein', value: '35g' },
        { labelKey: 'product.nutritionLabels.carbs', value: '62g' },
        { labelKey: 'product.nutritionLabels.fats', value: '16g' },
        { labelKey: 'product.nutritionLabels.fiber', value: '10g' },
      ],
    },
  ];

  return (
    <PageSection>
      <style>{customStyles}</style>
      <Container maxWidth='xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant='h2'
            align='center'
            sx={{
              fontWeight: 800,
              mb: 6,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              background: `linear-gradient(45deg, #2C5282, ${theme.palette.primary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t('product.title')}
          </Typography>

          <Box
            sx={{
              position: 'relative',
              '.swiper-pagination': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            }}
          >
            <Swiper
              modules={[Pagination, Autoplay, EffectFade]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              effect='fade'
              loop={true}
              speed={1000}
            >
              {productData.map((item, index) => (
                <SwiperSlide key={index}>
                  <StyledCard>
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={6}>
                        <Box p={4}>
                          <ImageContainer>
                            <ProductImage
                              src={item.image}
                              alt={t(item.titleKey)}
                            />
                            <HealthBadge>
                              <LocalDiningIcon
                                sx={{ color: theme.palette.primary.main }}
                              />
                              <Typography fontWeight={600}>
                                {t('product.healthScore', {
                                  score: item.healthScore,
                                })}
                              </Typography>
                            </HealthBadge>
                          </ImageContainer>
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Box p={4}>
                          <Typography
                            variant='h3'
                            fontWeight={700}
                            mb={3}
                            sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
                          >
                            {t(item.titleKey)}
                          </Typography>

                          <Typography
                            variant='body1'
                            color='text.secondary'
                            mb={4}
                            sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}
                          >
                            {t(item.descriptionKey)}
                          </Typography>

                          <NutritionInfoCard>
                            <Typography variant='h6' fontWeight={600} mb={2}>
                              {t('product.nutritionInfo')}
                            </Typography>
                            <Grid container spacing={2}>
                              {item.nutritionInfo.map((info) => (
                                <Grid item xs={6} key={info.labelKey}>
                                  <Box>
                                    <Typography
                                      color='text.secondary'
                                      variant='body2'
                                    >
                                      {t(info.labelKey)}
                                    </Typography>
                                    <Typography fontWeight={600} variant='h6'>
                                      {info.value}
                                    </Typography>
                                  </Box>
                                </Grid>
                              ))}
                            </Grid>
                          </NutritionInfoCard>
                        </Box>
                      </Grid>
                    </Grid>
                  </StyledCard>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </motion.div>
      </Container>
    </PageSection>
  );
};

export default Product;
