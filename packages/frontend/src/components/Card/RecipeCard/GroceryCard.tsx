import { useState } from 'react';

import { Box, styled, IconButton, Typography, Tooltip } from '@mui/material';
import FavoriteFilledIcon from '@mui/icons-material/Favorite';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';

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
  marginRight: '12px',
});

const ImageContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '300px',
  overflow: 'hidden',
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

const GroceryCard = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardHover = () => {
    setIsHovered(true);
  };

  const handleCardLeave = () => {
    setIsHovered(false);
  };

  return (
    <RecipeCard
      onMouseEnter={() => handleCardHover()}
      onMouseLeave={handleCardLeave}
      onClick={data?.onClick}
    >
      <FavoriteButton
        /*   onClick={(e) => handleFavoriteClick(e, item._id)} */
        sx={{
          color: true ? '#ff0000' : 'inherit',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.95)',
          },
        }}
      >
        {true ? <FavoriteFilledIcon /> : <FavoriteIcon />}
      </FavoriteButton>

      <ImageContainer>
        <StyledImage src={data.coverImg} alt={data.name} loading='lazy' />
        <CardDetails className={isHovered ? 'show' : ''}>
          <Typography
            variant='h5'
            gutterBottom
            sx={{
              color: '#fff',
              fontSize: '1.25rem',
              fontWeight: 600,
            }}
          >
            {data.name}
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
              Category: {data?.category}
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
              Nutritional Score: {data?.nutritionalScore}
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
              Brand: {data?.brand}
            </Typography>
            <Tooltip title={data?.ingredients.slice(0, 5).join(', ')}>
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
          {data.name}
        </Typography>
      </Box>
    </RecipeCard>
  );
};

export default GroceryCard;
