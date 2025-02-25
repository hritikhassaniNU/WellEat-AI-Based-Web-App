import { MouseEvent, useState } from 'react';
import { Box, Typography, IconButton, Tooltip, styled } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteFilledIcon from '@mui/icons-material/Favorite';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import StarIcon from '@mui/icons-material/Star';
import 'swiper/css';
import { Recommendation } from '../../api/types';

const Title = styled(Typography)({
  fontsize: { xs: '2.5rem', md: '3.5rem' },
  fontWeight: 700,
  marginBottom: '40px',
  position: 'relative',
  paddingLeft: '24px',
  '& .featured': {
    background: 'linear-gradient(45deg, #2C5282, #7ac143)',
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
    background: 'linear-gradient(to bottom, #7ac143, #96d85f)',
    borderRadius: '4px',
  },
});

const RecipeCard = styled(Box)({
  position: 'relative',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  backgroundColor: '#fff',
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
});

const ImageContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '300px',
  overflow: 'hidden',
});

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease',
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

const NavigationButton = styled(IconButton)({
  backgroundColor: '#fff',
  width: '44px',
  height: '44px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#7ac143',
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
});

const CardDetails = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // Matching the dark overlay
  color: '#fff',
  padding: '16px',
  transform: 'translateY(100%)',
  opacity: 0,
  transition: 'all 0.3s ease',
  '&.show': {
    transform: 'translateY(0)',
    opacity: 1,
  },
});

const Slider = ({
  title,
  data,
  isLoading = false,
  handleOpenModal,
}: {
  title: string;
  data: Recommendation[];
  isLoading?: boolean;
}) => {
  const [favorites, setFavorites] = useState(new Set());
  const [hoveredRecipeId, setHoveredRecipeId] = useState<string | null>(null);

  const handleFavoriteClick = (
    e: MouseEvent<HTMLButtonElement>,
    recipeId: string
  ) => {
    e.stopPropagation(); // Prevent card click event
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

  const handleCardHover = (recipeId: string) => {
    setHoveredRecipeId(recipeId);
  };

  const handleCardLeave = () => {
    setHoveredRecipeId(null);
  };

  return (
    <Box
      sx={{
        margin: '0 auto',
        mt: 4,
        position: 'relative',
        padding: '24px 0',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Title variant='h4'>
          <span className='featured'>{title.split(' ')[0]}</span>{' '}
          {title.split(' ').slice(1).join(' ')}
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
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
          1536: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
      >
        {isLoading ? (
          <Typography variant='h6'>
            Please wait, while we are loading data....
          </Typography>
        ) : data?.length > 0 ? (
          data?.map((item: Recommendation) => (
            <SwiperSlide
              key={item._id}
              onClick={() => handleOpenModal(item.recipe)}
            >
              <RecipeCard
                onMouseEnter={() => handleCardHover(item._id)}
                onMouseLeave={handleCardLeave}
              >
                <FavoriteButton
                  onClick={(e) => handleFavoriteClick(e, item._id)}
                  sx={{
                    color: favorites.has(item._id) ? '#ff0000' : 'inherit',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.95)',
                    },
                  }}
                >
                  {favorites.has(item._id) ? (
                    <FavoriteFilledIcon />
                  ) : (
                    <FavoriteIcon />
                  )}
                </FavoriteButton>
                {true && (
                  <NewBadge>
                    <StarIcon sx={{ fontSize: 16 }} />
                    <span>NEW</span>
                  </NewBadge>
                )}
                <ImageContainer>
                  <StyledImage
                    src={item.recipe.coverImg}
                    alt={item.recipe.name}
                    loading='lazy'
                  />
                  <CardDetails
                    className={hoveredRecipeId === item._id ? 'show' : ''}
                  >
                    <Typography
                      variant='h5'
                      gutterBottom
                      sx={{
                        color: '#fff',
                        fontSize: '1.25rem',
                        fontWeight: 600,
                      }}
                    >
                      {item.recipe.name}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        variant='body1'
                        sx={{
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        🔥 Calories:{/*  {item.recipe.calories} */}
                      </Typography>
                      <Typography
                        variant='body1'
                        sx={{
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        👥 Servings:{/*  {item.recipe.servings} */}
                      </Typography>
                      <Typography
                        variant='body1'
                        sx={{
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        ⏱️ Prep Time: {item.recipe.prepTime}
                      </Typography>
                      <Tooltip title={item.recipe.ingredients.join(', ')}>
                        <Typography
                          variant='body2'
                          noWrap
                          sx={{
                            color: '#fff',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mt: 1,
                            '&:hover': {
                              color: '#7ac143',
                            },
                          }}
                        >
                          🥗 View Ingredients
                        </Typography>
                      </Tooltip>
                    </Box>
                  </CardDetails>
                </ImageContainer>
                <Box
                  sx={{
                    p: 3,
                    bgcolor: 'white',
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant='h6'
                    sx={{
                      textAlign: 'center',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#2d3436',
                    }}
                  >
                    {item.recipe.name}
                  </Typography>
                </Box>
              </RecipeCard>
            </SwiperSlide>
          ))
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '300px',
              border: '1px solid #e0e0e0',
            }}
          >
            <Typography variant='h6'>No data available</Typography>
            <Typography variant='body1' sx={{ mt: 2 }}>
              It seems there are no data to display at the moment.
            </Typography>
          </Box>
        )}
      </Swiper>
    </Box>
  );
};

export default Slider;
