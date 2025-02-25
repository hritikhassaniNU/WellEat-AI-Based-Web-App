import { useEffect, useState } from 'react';
import { UserAPIService } from '../api';
import { StorageKeys } from '../constants';
import { Dialog, Box, Typography, styled, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import NutritionalInfoComponent from '../components/Modal/NutritionalInfoComponent';
import { GroceryItem } from '../api/types';
import GroceryCard from '../components/Card/RecipeCard/GroceryCard';

import dayjs from 'dayjs';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 12,
    padding: theme.spacing(3),
    minWidth: 600,
  },
}));

const ListDetailsPage = () => {
  const [listDetails, setListDetails] = useState([]);
  const [groceryItems, setGroceryItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ingredientInfo, setIngredientInfo] = useState<any>({});

  const [userData] = useState(() => {
    const userDetails = localStorage.getItem(StorageKeys.USER_DETAILS) || '{}';
    return JSON.parse(userDetails);
  });

  const params = useParams();

  useEffect(() => {
    getUserListDetails();
  }, []);

  const getUserListDetails = async () => {
    try {
      const data = await UserAPIService.getUserListDetails(
        userData?._id,
        params?.id
      );

      setListDetails(data);
      setGroceryItems(data?.groceryItems);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardClick = (data: GroceryItem) => {
    setIngredientInfo(data);
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box sx={{ p: 3 }}>
        {/* Header Section */}
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Box>
            <Typography
              variant='h4'
              fontWeight={700}
              sx={{
                color: '#2D3748',
                letterSpacing: '-0.5px',
                mb: 1,
              }}
            >
              Checkout all your scanned groceries here!
            </Typography>

            <Typography
              variant='body1'
              sx={{
                color: '#718096',
                maxWidth: '600px',
              }}
            >
              List Name :{listDetails.name}
            </Typography>

            <Typography
              variant='body1'
              sx={{
                color: '#718096',
                maxWidth: '600px',
              }}
            >
              Created On :{' '}
              {dayjs(listDetails.createdDate).format('MMMM D, YYYY')}
            </Typography>
          </Box>

          <Stack direction='row' spacing={2}>
            {/*   <Button
              variant='contained'
              startIcon={
                showFavoriteList ? (
                  <FavoriteBorder sx={{ color: theme.palette.primary.light }} />
                ) : (
                  <Favorite sx={{ color: 'white' }} />
                )
              }
              onClick={handleShowFavoriteList}
              sx={{
                bgcolor: !showFavoriteList
                  ? 'transparent'
                  : theme.palette.primary.light,
                border: `${theme.palette.primary.main} 1px solid`,
                borderRadius: '12px',
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: !showFavoriteList ? theme.palette.primary.main : 'white',
              }}
            >
              Show Only Favorite Lists
            </Button> */}
          </Stack>
        </Stack>

        <Box
          sx={{
            marginTop: '16px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {groceryItems.map((data) => (
            <>
              <GroceryCard
                data={{
                  ...data,
                  onClick: () => handleCardClick(data),
                }}
              />
            </>
          ))}
        </Box>
      </Box>
      <StyledDialog open={isModalOpen} onClose={onClose} maxWidth='md'>
        <NutritionalInfoComponent data={ingredientInfo} onClose={onClose} />
      </StyledDialog>
    </>
  );
};

export default ListDetailsPage;
