import React from 'react';
import {
  Box,
  Typography,
  CardContent,
  CardMedia,
  Button,
  Container,
  Grid,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const StyledCard = styled(motion.div)({
  height: '460px',
  background: 'white',
  borderRadius: '20px',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
  },
});

const StyledCardMedia = styled(CardMedia)({
  height: '240px',
  width: '100%',
  objectFit: 'cover',
  transition: 'transform 0.5s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const CategoryChip = styled(Chip)({
  position: 'absolute',
  top: '16px',
  left: '16px',
  background: 'linear-gradient(45deg, #FF7B7B, #FF9B9B)',
  color: 'white',
  fontWeight: 600,
  padding: '0 12px',
  height: '28px',
  boxShadow: '0 4px 12px rgba(255, 123, 123, 0.3)',
});

const StyledCardContent = styled(CardContent)({
  flex: 1,
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const ViewAllButton = styled(Button)({
  background: 'linear-gradient(45deg, #7FB77E, #96C93D)',
  color: 'white',
  borderRadius: '30px',
  padding: '10px 32px',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  boxShadow: '0 4px 15px rgba(127, 183, 126, 0.3)',
  '&:hover': {
    background: 'linear-gradient(45deg, #96C93D, #7FB77E)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(127, 183, 126, 0.4)',
  },
});

interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  description: string;
  image: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: 'Understanding Nutrition Labels: A Complete Guide',
    category: 'Nutrition',
    date: 'December 1, 2024',
    description:
      'Learn how to decode nutrition labels effectively. From serving sizes to daily values, discover how to make informed decisions about your food choices...',
    image:
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format', // Nutrition label image
  },
  {
    id: 2,
    title: 'AI-Powered Food Choices: The Future of Healthy Eating',
    category: 'Technology',
    date: 'December 2, 2024',
    description:
      'Explore how artificial intelligence is revolutionizing the way we analyze food content and make healthier dietary choices. Learn about smart food tracking...',
    image:
      'https://images.unsplash.com/photo-1550831107-1553da8c8464?w=500&auto=format', // Tech and food image
  },
  {
    id: 3,
    title: 'Hidden Ingredients: What Your Food Labels Are not Telling You',
    category: 'Food Safety',
    date: 'December 3, 2024',
    description:
      'Discover the common ingredients hidden behind complex names and how they might affect your health. Learn to identify potentially harmful additives...',
    image:
      'https://images.unsplash.com/photo-1609167830220-7164aa360951?w=500&auto=format', // Ingredients image
  },
];

const TipsAndArticles: React.FC = () => {
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
    <Box
      sx={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
        py: 10,
      }}
    >
      <Container maxWidth='lg'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {/* Header Section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 8,
              flexWrap: 'wrap',
              gap: 3,
            }}
          >
            <Box>
              <Typography
                variant='subtitle1'
                sx={{
                  color: '#7FB77E',
                  textTransform: 'uppercase',
                  mb: 1,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  letterSpacing: '1.5px',
                }}
              >
                NUTRITION INSIGHTS
              </Typography>
              <Typography
                variant='h3'
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #2C5282, #7FB77E)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Smart Food Choices
              </Typography>
            </Box>
            <ViewAllButton>View All Articles</ViewAllButton>
          </Box>

          {/* Articles Grid */}
          <Grid container spacing={4}>
            {articles.map((article) => (
              <Grid item xs={12} md={4} key={article.id}>
                <motion.div variants={itemVariants}>
                  <StyledCard>
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <StyledCardMedia
                        component='img'
                        image={article.image}
                        alt={article.title}
                      />
                      <CategoryChip label={article.category} />
                    </Box>
                    <StyledCardContent>
                      <Typography
                        variant='h6'
                        sx={{
                          fontWeight: 600,
                          fontSize: '1.2rem',
                          lineHeight: 1.4,
                          height: '3.2em',
                          overflow: 'hidden',
                          color: '#2D3748',
                        }}
                      >
                        {article.title}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          color: '#718096',
                        }}
                      >
                        <AccessTimeIcon
                          sx={{
                            fontSize: '1rem',
                            mr: 1,
                          }}
                        />
                        <Typography
                          variant='body2'
                          sx={{
                            fontWeight: 500,
                          }}
                        >
                          {article.date}
                        </Typography>
                      </Box>
                      <Typography
                        variant='body2'
                        sx={{
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          lineHeight: 1.6,
                          color: '#718096',
                        }}
                      >
                        {article.description}
                      </Typography>
                    </StyledCardContent>
                  </StyledCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default TipsAndArticles;
