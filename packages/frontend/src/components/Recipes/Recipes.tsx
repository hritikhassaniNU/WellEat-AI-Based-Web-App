import { MouseEvent, useState } from 'react';
import { Box, Typography, IconButton, styled, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteFilledIcon from '@mui/icons-material/Favorite';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import StarIcon from '@mui/icons-material/Star';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import 'swiper/css';

const Title = styled(Typography)(({ theme }) => ({
  fontsize: { xs: '2.5rem', md: '3.5rem' },
  fontWeight: 700,
  marginBottom: '40px',
  position: 'relative',
  paddingLeft: '24px',
  '& .featured': {
    background: `linear-gradient(45deg, #2C5282, ${theme.palette.primary.main})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '40px',
    background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    borderRadius: '4px',
  },
}));

const RecipeCard = styled(motion.div)({
  position: 'relative',
  borderRadius: '20px',
  overflow: 'hidden',
  backgroundColor: '#fff',
  height: '420px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 40px rgba(122, 193, 67, 0.15)',
  },
});

const ImageContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '280px',
  overflow: 'hidden',
});

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.5s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const NewBadge = styled(Box)({
  position: 'absolute',
  top: '20px',
  right: '20px',
  backgroundColor: 'rgba(122, 193, 67, 0.95)',
  color: '#fff',
  padding: '8px 16px',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: '600',
  letterSpacing: '1px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  backdropFilter: 'blur(4px)',
  boxShadow: '0 4px 12px rgba(122, 193, 67, 0.3)',
  zIndex: 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(122, 193, 67, 0.4)',
  },
});

const FavoriteButton = styled(IconButton)({
  position: 'absolute',
  top: '20px',
  left: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  padding: '8px',
  backdropFilter: 'blur(4px)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  zIndex: 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    transform: 'scale(1.1)',
  },
});

const NavigationButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#fff',
  width: '44px',
  height: '44px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    transform: 'translateY(-2px)',
  },
  '&.swiper-button-disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    '&:hover': {
      transform: 'none',
    },
  },
}));

const CardDetails = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background:
    'linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.9))',
  backdropFilter: 'blur(8px)',
  padding: '20px',
  transform: 'translateY(100%)',
  opacity: 0,
  transition: 'all 0.3s ease',
  '&.show': {
    transform: 'translateY(0)',
    opacity: 1,
  },
});

const IngredientsList = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  marginTop: '12px',
});

const IngredientChip = styled(Box)(({ theme }) => ({
  background: 'rgba(122, 193, 67, 0.1)',
  color: theme.palette.primary.main,
  padding: '4px 12px',
  borderRadius: '8px',
  fontSize: '0.85rem',
  fontWeight: 500,
}));

const recipes = [
  {
    id: 1,
    title: 'Classic Margherita Pizza',
    description:
      'Traditional Italian pizza with fresh basil, mozzarella, and tomatoes on a perfectly crispy crust.',
    image:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&h=600',
    isNew: true,
    calories: 450,
    servings: 2,
    prepTime: '30 min',
    ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella Cheese', 'Basil'],
  },
  {
    id: 2,
    title: 'Slow-Cooked Beef Brisket',
    description:
      'Tender, juicy beef brisket slow-cooked to perfection with aromatic herbs and rich BBQ sauce.',
    image:
      'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&h=600',
    isNew: true,
    calories: 650,
    servings: 4,
    prepTime: '4 hr',
    ingredients: ['Beef Brisket', 'Onions', 'Garlic', 'BBQ Sauce'],
  },
  {
    id: 3,
    title: 'Decadent Chocolate Lava Cake',
    description:
      'Rich, warm chocolate cake with a gooey molten center, perfect for chocolate lovers.',
    image:
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&h=600',
    isNew: true,
    calories: 320,
    servings: 2,
    prepTime: '45 min',
    ingredients: ['Chocolate', 'Eggs', 'Butter', 'Flour'],
  },
  {
    id: 4,
    title: 'Fresh Garden Salad',
    description:
      'Crisp, refreshing salad with garden-fresh vegetables and tangy balsamic dressing.',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&h=600',
    isNew: true,
    calories: 180,
    servings: 1,
    prepTime: '15 min',
    ingredients: [
      'Lettuce',
      'Tomatoes',
      'Cucumbers',
      'Carrots',
      'Balsamic Vinaigrette',
    ],
  },
  {
    id: 5,
    title: 'Grilled Salmon Fillet',
    description:
      'Perfectly grilled salmon with lemon and herbs, light and full of flavor.',
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&h=600',
    isNew: true,
    calories: 350,
    servings: 2,
    prepTime: '25 min',
    ingredients: ['Salmon Fillet', 'Lemon', 'Dill', 'Olive Oil'],
  },
  {
    id: 6,
    title: 'Homemade Pasta Carbonara',
    description:
      'Creamy Italian pasta dish with crispy bacon and perfect parmesan cheese.',
    image:
      'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&h=600',
    isNew: true,
    calories: 550,
    servings: 3,
    prepTime: '40 min',
    ingredients: ['Pasta', 'Eggs', 'Bacon', 'Parmesan Cheese'],
  },
];

const Recipes = () => {
  const theme = useTheme();
  const [favorites, setFavorites] = useState(new Set());
  const [hoveredRecipeId, setHoveredRecipeId] = useState(null);

  const handleFavoriteClick = (
    e: MouseEvent<HTMLButtonElement>,
    recipeId: number
  ) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(recipeId)) {
        newFavorites.delete(recipeId);
      } else {
        newFavorites.add(recipeId);
      }
      return newFavorites;
    });
  };

  const handleCardHover = (recipeId: any) => {
    setHoveredRecipeId(recipeId);
  };

  const handleCardLeave = () => {
    setHoveredRecipeId(null);
  };

  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 2, md: 6 },
        background: 'linear-gradient(135deg, #f5f9f5 0%, #ffffff 100%)',
        position: 'relative',
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
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 6,
          }}
        >
          <Title variant='h2'>
            <span className='featured'>Delicious</span> Recipes
          </Title>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <NavigationButton className='swiper-prev'>
              <ArrowBackIosNewIcon />
            </NavigationButton>
            <NavigationButton className='swiper-next'>
              <ArrowForwardIosIcon />
            </NavigationButton>
          </Box>
        </Box>

        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={3}
          navigation={{
            prevEl: '.swiper-prev',
            nextEl: '.swiper-next',
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {recipes.map((recipe) => (
            <SwiperSlide key={recipe.id}>
              <RecipeCard
                onMouseEnter={() => handleCardHover(recipe.id)}
                onMouseLeave={handleCardLeave}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <FavoriteButton
                  onClick={(e) => handleFavoriteClick(e, recipe.id)}
                  sx={{
                    color: favorites.has(recipe.id) ? '#ff4444' : 'inherit',
                  }}
                >
                  {favorites.has(recipe.id) ? (
                    <FavoriteFilledIcon />
                  ) : (
                    <FavoriteIcon />
                  )}
                </FavoriteButton>

                {recipe.isNew && (
                  <NewBadge>
                    <StarIcon sx={{ fontSize: 16 }} />
                    <span>NEW</span>
                  </NewBadge>
                )}

                <ImageContainer>
                  <StyledImage
                    src={recipe.image}
                    alt={recipe.title}
                    loading='lazy'
                  />
                  <CardDetails
                    className={hoveredRecipeId === recipe.id ? 'show' : ''}
                  >
                    <Typography
                      variant='h6'
                      sx={{
                        fontWeight: 600,
                        color: '#2d3436',
                        mb: 2,
                      }}
                    >
                      {recipe.title}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          color: '#64748B',
                        }}
                      >
                        <LocalFireDepartmentIcon
                          sx={{ color: theme.palette.primary.main }}
                        />
                        <Typography sx={{ fontSize: '0.9rem' }}>
                          {recipe.calories} cal
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          color: '#64748B',
                        }}
                      >
                        <PersonOutlineIcon
                          sx={{ color: theme.palette.primary.main }}
                        />
                        <Typography sx={{ fontSize: '0.9rem' }}>
                          {recipe.servings} servings
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          color: '#64748B',
                        }}
                      >
                        <AccessTimeIcon
                          sx={{ color: theme.palette.primary.main }}
                        />
                        <Typography sx={{ fontSize: '0.9rem' }}>
                          {recipe.prepTime}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      variant='subtitle2'
                      sx={{
                        color: '#64748B',
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      Ingredients:
                    </Typography>

                    <IngredientsList>
                      {recipe.ingredients.map((ingredient, idx) => (
                        <IngredientChip key={idx}>{ingredient}</IngredientChip>
                      ))}
                    </IngredientsList>
                  </CardDetails>
                </ImageContainer>

                <Box
                  sx={{
                    p: 3,
                    bgcolor: '#fff',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant='h6'
                    sx={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#2d3436',
                      textAlign: 'center',
                      mb: 1,
                    }}
                  >
                    {recipe.title}
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{
                      color: '#64748B',
                      textAlign: 'center',
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      height: '2.7em',
                    }}
                  >
                    {recipe.description}
                  </Typography>
                </Box>
              </RecipeCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default Recipes;
