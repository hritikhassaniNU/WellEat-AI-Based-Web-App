import {
  Box,
  Container,
  Typography,
  Grid,
  styled,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';

const StorySection = styled(Box)({
  padding: '100px 0',
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

const ImageFrame = styled(motion.div)({
  position: 'relative',
  width: '100%',
  maxWidth: '500px',
  margin: '0 auto',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 20,
    left: 20,
    right: -20,
    bottom: -20,
    background:
      'linear-gradient(45deg, rgba(122, 193, 67, 0.1), rgba(44, 82, 130, 0.1))',
    borderRadius: '20px',
    zIndex: 0,
  },
});

const StyledImage = styled('img')({
  width: '100%',
  height: '400px',
  objectFit: 'cover',
  borderRadius: '20px',
  position: 'relative',
  zIndex: 1,
  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
});

const HeartIcon = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '60px',
  background: theme.palette.primary.main,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '40px',
  boxShadow: '0 10px 20px rgba(122, 193, 67, 0.2)',
  '& svg': {
    width: '30px',
    height: '30px',
    color: 'white',
  },
}));

const OurStory = () => {
  const theme = useTheme();

  return (
    <StorySection>
      <Container maxWidth='lg'>
        <Grid container spacing={8} alignItems='center'>
          {/* Image Section */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <ImageFrame>
                <StyledImage
                  src='https://welleatprofile.blob.core.windows.net/welleatprofile/our_story.jpeg'
                  alt='Team Story'
                />
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
                  viewport={{ once: true }}
                >
                  <HeartIcon>
                    <svg viewBox='0 0 24 24' fill='currentColor'>
                      <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
                    </svg>
                  </HeartIcon>
                </motion.div>
              </ImageFrame>
            </motion.div>
          </Grid>

          {/* Content Section with Updated Typography */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Title with updated styling */}
              <Typography
                variant='h2'
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  mb: 3,
                  position: 'relative',
                  paddingLeft: '24px',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '4px',
                    height: '40px',
                    background: `linear-gradient(to bottom, ${theme.palette.primary.main},${theme.palette.primary.light})`,
                    borderRadius: '4px',
                  },
                  background: `linear-gradient(45deg, #2C5282,${theme.palette.primary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Our Story
              </Typography>

              {/* Subtitle */}
              <Typography
                variant='subtitle1'
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  mb: 4,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                }}
              >
                The Journey Behind WellEat
              </Typography>

              {/* Story Paragraphs */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography
                  variant='body1'
                  sx={{
                    color: '#64748B',
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    fontWeight: 400,
                  }}
                >
                  We are a group of graduate students from Northeastern
                  University with diverse skills in development, design, and
                  data engineering.
                </Typography>

                <Typography
                  variant='body1'
                  sx={{
                    color: '#64748B',
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    fontWeight: 400,
                  }}
                >
                  When we first arrived in the U.S., we struggled to find the
                  right products to fit our needs. With hundreds of brands on
                  store shelves, it was hard to tell what was genuinely healthy
                  and what wasn't. As the saying goes, "Businesses are for
                  profits, not for people." This experience inspired us to
                  create something that could help others make better, healthier
                  choices.
                </Typography>

                <Typography
                  variant='body1'
                  sx={{
                    color: '#64748B',
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    fontWeight: 400,
                  }}
                >
                  We decided to build "Well Eat" as part of our Final Project
                  for the Web Design & User Experience Engineering course. Over
                  the course of just one month, we brought this idea to life
                  with passion and hard work. This is just the beginning. We
                  plan to grow "Well Eat" into a full-scale solution, including
                  a mobile app, to make healthy choices accessible to even more
                  people.
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </StorySection>
  );
};

export default OurStory;
