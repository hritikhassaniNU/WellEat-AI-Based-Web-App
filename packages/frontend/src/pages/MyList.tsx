import React, { useState, useEffect } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { StorageKeys } from '../constants';
import { UserAPIService } from '../api';
import { UserList } from '../api/types';
import { useNavigate } from 'react-router-dom';
import { ListCard } from '../components';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const MyListPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData] = useState(() => {
    const userDetails = localStorage.getItem(StorageKeys.USER_DETAILS) || '{}';
    return JSON.parse(userDetails);
  });

  const [userListData, setUserListData] = useState<UserList[]>([]);
  const [showFavoriteList, setShowFavoriteList] = useState<boolean>(false);

  useEffect(() => {
    getUserListData();
  }, []);

  const getUserListData = async () => {
    try {
      setIsLoading(true);
      const data = await UserAPIService.getUserListData(userData?._id);
      setUserListData(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleListOpen = (id: string) => {
    navigate('/mylist/' + id);
  };

  // Handlers
  const handleDeleteTask = async (listId: string) => {
    await UserAPIService.deleteUserList(userData?._id, listId);
  };

  const handleShowFavoriteList = () => {
    setShowFavoriteList(!showFavoriteList);
  };

  const handleToggleFavorite = async (
    listId: string,
    currentState: boolean
  ) => {
    await UserAPIService.markUserListAsFavorite(
      userData?._id,
      listId,
      !currentState
    );

    let updateListData = userListData.map((list) => {
      if (list._id === listId) {
        return { ...list, isFavorite: !currentState };
      }
      return list;
    });

    setUserListData(updateListData);
  };

  // LoaderComponent
  const LoaderComponent = () => {
    return (
      <Typography variant='h6' sx={{ textAlign: 'center' }}>
        Please wait, while we are loading data....
      </Typography>
    );
  };

  // EmptyStateComponent
  const EmptyStateComponent = () => {
    return (
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
          {showFavoriteList
            ? 'Start adding some lists to your favorites!'
            : 'Scan some groceries to create a list'}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        margin: '0 auto',
        pt: 8,
        pb: 8,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Stack spacing={5}>
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
                Checkout your scanned groceries here!
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  color: '#718096',
                  maxWidth: '600px',
                }}
              >
                Click on the Camera Button to scan more groceries.
              </Typography>
            </Box>

            <Stack direction='row' spacing={2}>
              <Button
                variant='contained'
                startIcon={
                  showFavoriteList ? (
                    <FavoriteBorder
                      sx={{ color: theme.palette.primary.light }}
                    />
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
                  color: !showFavoriteList
                    ? theme.palette.primary.main
                    : 'white',
                }}
              >
                Show Only Favorite Lists
              </Button>
            </Stack>
          </Stack>

          {/* Tasks List */}
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='show'
          >
            <AnimatePresence mode='sync'>
              <Stack spacing={3}>
                {isLoading ? (
                  <LoaderComponent />
                ) : userListData.length === 0 ? (
                  <EmptyStateComponent />
                ) : showFavoriteList &&
                  userListData.filter((e) => e.isFavorite).length === 0 ? (
                  <EmptyStateComponent />
                ) : (
                  userListData
                    .filter((e) => (showFavoriteList ? e.isFavorite : true))
                    .map((list) => (
                      <ListCard
                        isFavorite={list.isFavorite}
                        handleToggleFavorite={handleToggleFavorite}
                        handleDeleteTask={handleDeleteTask}
                        handleListOpen={handleListOpen}
                        listData={list}
                      />
                    ))
                )}
              </Stack>
            </AnimatePresence>
          </motion.div>
        </Stack>
      </motion.div>
    </Box>
  );
};

export default MyListPage;
