import {
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const NutritionalInfoComponent = ({
  data: {
    name,
    brand,
    category,
    nutritionalScore,
    ingredients,
    pros,
    cons,
    ingredientImg,
  },
  onClose,
}: {
  data: {
    name: string;
    brand: string;
    category: string;
    nutritionalScore: number;
    ingredients: string[];
    pros: string[];
    cons: string[];
    ingredientImg?: string;
  };
  onClose: () => void;
}) => {
  const getNutritionBackgroundColor = (score: number) => {
    if (score < 4) {
      return '#ff8989'; //red
    } else if (score < 7) {
      return '#ffce89'; //yellow
    } else {
      return '#a7f9bc'; //green
    }
  };

  const nutritionalScoreBgColor = getNutritionBackgroundColor(
    Number(nutritionalScore)
  );

  return (
    <>
      <DialogTitle sx={{ p: 0, mb: 1 }}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography sx={{ fontWeight: 600 }} variant='body1'>
            Ingredient Information
          </Typography>
          <IconButton onClick={onClose} size='small'>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          p: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant='h5'>{name}</Typography>
            <Box
              sx={{
                marginTop: '8px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Typography variant='body2' color='text.secondary'>
                {brand}
              </Typography>
              <Typography
                sx={{
                  backgroundColor: '#fec775',
                  padding: '4px',
                  borderRadius: '4px',
                  marginLeft: '8px',
                }}
                fontWeight={600}
                variant='body2'
                color='text.secondary'
              >
                {category}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: nutritionalScoreBgColor,
              padding: '12px',
              borderRadius: '8px',
              width: '80px',
              height: '80px',
            }}
          >
            <Typography variant='h3' color='text.secondary'>
              {nutritionalScore}
            </Typography>
          </Box>
        </Box>

        {/* Can you make this box occupy remaining height only */}
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            flex: 1, // This makes the box expand to fill remaining space
            height: '100%',
            overflow: 'hidden',
            '& > *': {
              // Apply to child boxes
              '&::-webkit-scrollbar': {
                width: '2px', // Thinner scrollbar
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1', // Light track color
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#888', // Darker thumb color
                borderRadius: '10px',
                '&:hover': {
                  background: '#555',
                },
              },
            },
          }}
        >
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            <Typography variant='h6'>Pros</Typography>
            {pros.map((pro, index) => (
              <Typography key={index} variant='body2' color='text.secondary'>
                {pro}
              </Typography>
            ))}

            <Typography sx={{ marginTop: '8px' }} variant='h6'>
              Cons
            </Typography>
            {cons.map((con, index) => (
              <Typography
                sx={{ marginTop: '4px' }}
                key={index}
                variant='body2'
                color='text.secondary'
              >
                {con}
              </Typography>
            ))}
          </Box>
          <Box
            sx={{
              ml: 8,
              flex: 1,
              overflow: 'auto',
              borderColor: 'divider',
            }}
          >
            <Typography variant='h6'>Ingredients</Typography>
            {ingredients.map((ingredient, index) => (
              <Typography
                sx={{ marginTop: '4px' }}
                key={index}
                variant='body2'
                color='text.secondary'
              >
                {ingredient}
              </Typography>
            ))}
          </Box>
        </Box>
      </DialogContent>
    </>
  );
};

export default NutritionalInfoComponent;
