import { styled, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Chip,
  Tooltip,
  Paper,
} from '@mui/material';
import {
  CalendarToday,
  DeleteOutline,
  Favorite,
  OpenInFull,
  Restaurant,
} from '@mui/icons-material';
import { GroceryItem } from '../../../api/types';
import dayjs from 'dayjs';

// Styled Components

const MotionPaper = styled(motion.div)`
  width: 100%;
`;

const IconContainer = styled(Box)<{ color?: string }>(({ color }) => ({
  width: 48,
  height: 48,
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  /*   backgroundColor: `${color}15`, */
  color: color,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const TaskCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3.5),
  borderRadius: theme.spacing(2.5),
  backgroundColor: '#FFFFFF',
  border: '1px solid rgba(122, 193, 67, 0.1)', // Subtle green border
  backdropFilter: 'blur(8px)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, {${theme.palette.primary.light})`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },

  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow:
      '0 12px 28px rgba(122, 193, 67, 0.08), 0 4px 12px rgba(122, 193, 67, 0.12)',
    backgroundColor: '#FAFDF7', // Very subtle green tint on hover
    borderColor: 'rgba(122, 193, 67, 0.25)',

    '&::before': {
      opacity: 1,
    },
  },

  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
    '&:hover': {
      transform: 'none',
    },
  },
}));

interface ListCardProps {
  isFavorite: boolean;
  handleToggleFavorite: (listId: string, currentState: boolean) => void;
  handleDeleteTask: (id: string) => void;
  handleListOpen: (id: string) => void;
  listData: {
    _id: string;
    name: String;
    groceryItems: GroceryItem[];
    createdDate: Date;
    isFavorite: boolean;
  };
}

const ListCard: React.FC<ListCardProps> = ({
  isFavorite,
  handleToggleFavorite,
  handleDeleteTask,
  handleListOpen,
  listData,
}) => {
  const theme = useTheme();

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <MotionPaper
      key={listData._id}
      variants={itemVariants}
      initial='hidden'
      animate='show'
      exit='exit'
      layout
    >
      <TaskCard>
        <Stack spacing={2.5}>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
          >
            <Stack direction='row' alignItems='center' spacing={2.5}>
              <IconContainer>
                <Restaurant />
              </IconContainer>

              <Box>
                <Typography
                  variant='h6'
                  fontWeight={600}
                  sx={{
                    color: '#1A202C',
                    mb: 0.5,
                    letterSpacing: '-0.3px',
                  }}
                >
                  {listData.name}
                </Typography>
              </Box>
            </Stack>

            <Stack direction='row' spacing={2} alignItems='center'>
              <Tooltip title='Mark Favorite'>
                <IconButton
                  onClick={() =>
                    handleToggleFavorite(listData._id, listData.isFavorite)
                  }
                  size='small'
                  sx={{
                    color: isFavorite ? theme.palette.primary.main : '#A0AEC0',
                    '&:hover': {
                      color: theme.palette.primary.main,
                      bgcolor: '#f1f7ed',
                    },
                  }}
                >
                  <Favorite />
                </IconButton>
              </Tooltip>
              <Tooltip title='Remove List'>
                <IconButton
                  onClick={() => handleDeleteTask(listData._id)}
                  size='small'
                  sx={{
                    color: '#A0AEC0',
                    '&:hover': {
                      color: theme.palette.primary.main,
                      bgcolor: '#f1f7ed',
                    },
                  }}
                >
                  <DeleteOutline />
                </IconButton>
              </Tooltip>

              <Tooltip title='View List'>
                <IconButton
                  onClick={() => handleListOpen(listData._id)}
                  size='small'
                  sx={{
                    color: '#A0AEC0',
                    '&:hover': {
                      color: theme.palette.primary.main,
                      bgcolor: '#f1f7ed',
                    },
                  }}
                >
                  <OpenInFull />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          <Stack direction='row' spacing={2} alignItems='center'>
            <Chip
              icon={<CalendarToday />}
              label={dayjs(listData.createdDate).format('MMMM D, YYYY')}
              variant='outlined'
              size='small'
              sx={{
                borderRadius: '8px',
                bgcolor: '#f8faf8',
                borderColor: '#e2e8f0',
                color: '#718096',
                '& .MuiChip-icon': {
                  color: theme.palette.primary.main,
                },
              }}
            />

            <Tooltip title='Total grocery Items in the list'>
              <Chip
                label={'Grocery Items: ' + listData.groceryItems.length}
                variant='outlined'
                size='small'
                sx={{
                  borderRadius: '8px',
                  bgcolor: '#f8faf8',
                  borderColor: '#e2e8f0',
                  color: '#718096',
                  '& .MuiChip-icon': {
                    color: theme.palette.primary.main,
                  },
                }}
              />
            </Tooltip>
          </Stack>
        </Stack>
      </TaskCard>
    </MotionPaper>
  );
};

export default ListCard;
