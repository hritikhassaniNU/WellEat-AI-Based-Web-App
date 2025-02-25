import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import {
  LocalDining,
  NoFood,
  SetMeal,
  Science,
  Scale,
  Analytics,
  Assessment,
  TipsAndUpdates,
} from '@mui/icons-material';

const ScrollContainer = styled(Box)({
  position: 'relative',
  padding: '40px 0',
  overflow: 'hidden',
  background: '#F5F9F5',
  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
});

const ScrollTrack = styled(Box)({
  display: 'flex',
  width: 'fit-content',
  animation: 'scroll 40s linear infinite',
  '@keyframes scroll': {
    '0%': {
      transform: 'translateX(0)',
    },
    '100%': {
      transform: 'translateX(-50%)',
    },
  },
  '&:hover': {
    animationPlayState: 'paused',
  },
});

const MenuItem = styled(motion.div)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '16px 24px',
  background: 'white',
  borderRadius: '16px',
  margin: '0 8px',
  minWidth: '280px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(0, 0, 0, 0.05)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 16px rgba(122, 193, 67, 0.15)',
    '& .icon': {
      background: '#333',
      color: 'white',
    },
  },
});

const IconWrapper = styled(Box)({
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(122, 193, 67, 0.1)',
  transition: 'all 0.3s ease',
  '& svg': {
    fontSize: '24px',
    color: '#7ac143',
    transition: 'all 0.3s ease',
  },
});

const features = [
  {
    id: 1,
    name: 'Label Scanner',
    description: 'Instant nutrition analysis',
    icon: <Science />,
  },
  {
    id: 2,
    name: 'Health Score',
    description: 'Food quality rating',
    icon: <Assessment />,
  },
  {
    id: 3,
    name: 'AI Analysis',
    description: 'Smart ingredient check',
    icon: <Analytics />,
  },
  {
    id: 4,
    name: 'Better Choices',
    description: 'Healthier alternatives',
    icon: <LocalDining />,
  },
  {
    id: 5,
    name: 'Track Calories',
    description: 'Monitor your intake',
    icon: <Scale />,
  },
  {
    id: 6,
    name: 'Smart Tips',
    description: 'Personalized advice',
    icon: <TipsAndUpdates />,
  },
  {
    id: 7,
    name: 'Allergen Check',
    description: 'Stay safe & informed',
    icon: <NoFood />,
  },
  {
    id: 8,
    name: 'Meal Planner',
    description: 'Balanced nutrition',
    icon: <SetMeal />,
  },
];

const ScrollBar = () => {
  return (
    <ScrollContainer>
      <Box sx={{ overflow: 'hidden' }}>
        <ScrollTrack>
          {[...features, ...features].map((feature, index) => (
            <MenuItem key={`${feature.id}-${index}`}>
              <IconWrapper className='icon'>{feature.icon}</IconWrapper>
              <Box>
                <Typography
                  variant='subtitle1'
                  sx={{
                    fontWeight: 600,
                    color: '#1E293B',
                    mb: 0.5,
                  }}
                >
                  {feature.name}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    color: '#64748B',
                    fontSize: '0.875rem',
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </ScrollTrack>
      </Box>
    </ScrollContainer>
  );
};

export default ScrollBar;
