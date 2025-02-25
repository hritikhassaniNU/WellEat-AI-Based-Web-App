import {
  Modal,
  Box,
  Typography,
  Chip,
  CardMedia,
  CardContent,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShowChartIcon from '@mui/icons-material/ShowChart';

const RecipeDetailsModal = ({ open, onClose, recipe }) => {
  console.log('Logs123', recipe);
  if (!recipe) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='recipe-details-modal'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        p: 2,
      }}
    >
      <Box
        sx={{
          width: '90%',
          maxWidth: { md: '80%', xs: '100%' },
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          overflow: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'stretch',
        }}
      >
        {/* Recipe Image */}
        <CardMedia
          component='img'
          height='auto'
          image={recipe.coverImg}
          alt={recipe.name}
          sx={{
            maxWidth: '50%',
            width: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Recipe Details */}
        <CardContent sx={{ flex: '1 1 auto', p: 4 }}>
          <Typography
            variant='h4'
            component='h1'
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'grey.700' }}
          >
            {recipe.name}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant='h6' gutterBottom color='grey.700'>
              Instructions:
            </Typography>
            {recipe.instructions.map((step, index) => (
              <Typography
                key={index}
                variant='body1'
                sx={{
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    mr: 1,
                    color: 'grey.700',
                  }}
                >
                  Step {index + 1}: {step}
                </Typography>
              </Typography>
            ))}
          </Box>

          {/* Quick Info Chips */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip
              label={`Difficulty: ${recipe.difficultyLevel}`}
              color='warning'
              variant='outlined'
              icon={<AccessTimeIcon />}
            />
            <Chip
              label={`Prep Time: ${recipe.prepTime}`}
              color='error'
              variant='outlined'
              icon={<ShowChartIcon />}
            />
            <Chip
              label={`Calories: ${recipe.calories}`}
              color='info'
              variant='outlined'
            />
          </Box>
        </CardContent>
      </Box>
    </Modal>
  );
};

export default RecipeDetailsModal;
