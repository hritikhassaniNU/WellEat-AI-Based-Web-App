import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import Slider from '../components/Slider/Slider';
import { motion } from 'framer-motion';
import { StorageKeys } from '../constants';
import { useTranslation } from 'react-i18next';
import { RecommendationAPIService } from '../api';
import RecipeDetailsModal from './RecipeDetailsModal';

const HomePage = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const [existingUserData] = useState(() => {
    const userDetails = localStorage.getItem(StorageKeys.USER_DETAILS) || '{}';
    return JSON.parse(userDetails);
  });

  const [recommendations, setRecommendations] = useState([]);

  const welcomeText = `Welcome ${
    existingUserData?.firstName ? existingUserData?.firstName : ''
  }! 👋 `.split(' ');

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setIsLoading(true);
        const response = await RecommendationAPIService.getUsersRecommendations(
          existingUserData?._id
        );
        setRecommendations(response);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecommendations();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleOpenModal = (recipeObj) => {
    setSelectedRecipe(recipeObj);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Box sx={{}}>
        <Box className='flex flex-row'>
          {welcomeText.map((el, i) => (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                delay: i / 10,
              }}
              key={i}
            >
              <Typography variant='h3' sx={{ fontWeight: 600, pt: 4, mr: 2 }}>
                {el}{' '}
              </Typography>
            </motion.span>
          ))}
        </Box>

        <Slider
          handleOpenModal={handleOpenModal}
          title={t('homeScreen.hotRecommendations')}
          data={recommendations?.slice(-5)}
          isLoading={isLoading}
        />
        {/*   <Slider title={t('homeScreen.myRecipes')} />
      <Slider title={t('homeScreen.myGrocery')} /> */}
      </Box>

      {selectedRecipe && (
        <RecipeDetailsModal
          recipe={selectedRecipe}
          open={modalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default HomePage;
