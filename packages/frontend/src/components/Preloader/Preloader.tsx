import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../context/AuthContext';

const PreloaderContainer = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #f8faf8 0%, #ffffff 100%)',
  zIndex: 9999,
});

const LogoText = styled(Typography)(({ theme }) => ({
  marginTop: '24px',
  fontSize: '28px',
  fontWeight: 700,
  background: `linear-gradient(45deg, #2C5282, ${theme.palette.primary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}));

const LoadingText = styled(Typography)({
  marginTop: '16px',
  color: '#718096',
  fontSize: '14px',
  fontWeight: 500,
});

/**
 * `Preloader` Component
 *
 * Displays a full-screen animated preloader during the initial loading process.
 * Automatically hides itself after a specified timeout (default: 2.5 seconds).
 *
 * Props:
 * - `onLoadComplete`: Optional callback to execute after the preloader finishes loading.
 *
 * Features:
 * - Animated logo and circular progress indicator.
 * - Displays different loading messages based on the user's authentication status.
 * - Fully styled and responsive using Material-UI and Framer Motion.
 */
const Preloader: React.FC<{ onLoadComplete?: () => void }> = ({
  onLoadComplete,
}) => {
  const { isAuthenticated } = useAuthContext();
  const { t } = useTranslation();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoadComplete?.();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  const leafVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: 'easeInOut',
      },
    },
  };

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <PreloaderContainer
          as={motion.div}
          initial={{ opacity: 1 }}
          exit='exit'
          variants={containerVariants}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 1,
              ease: 'easeOut',
            }}
          >
            <Box sx={{ width: 120, height: 120, position: 'relative' }}>
              <motion.svg
                viewBox='0 0 100 100'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                {/* Circular Progress */}
                <motion.circle
                  cx='50'
                  cy='50'
                  r='45'
                  stroke='#E2E8F0'
                  strokeWidth='2'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.circle
                  cx='50'
                  cy='50'
                  r='45'
                  stroke={theme.palette.primary.main}
                  strokeWidth='2'
                  strokeLinecap='round'
                  initial={{ pathLength: 0, rotate: -90 }}
                  animate={{ pathLength: 1, rotate: -90 }}
                  transition={{
                    duration: 2,
                    ease: 'easeInOut',
                    repeat: Infinity,
                  }}
                  style={{
                    transformOrigin: 'center',
                    strokeDasharray: '283 283',
                  }}
                />

                {/* Leaf Shape */}
                <motion.path
                  d='M65 35C65 35 50 25 35 35C20 45 35 65 50 50C65 35 80 55 65 65C50 75 35 65 35 65'
                  stroke={theme.palette.primary.main}
                  strokeWidth='2'
                  strokeLinecap='round'
                  fill='none'
                  variants={leafVariants}
                  initial='hidden'
                  animate='visible'
                />
              </motion.svg>
            </Box>
          </motion.div>

          <LogoText variant='h1'>WellEat</LogoText>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <LoadingText>
              {isAuthenticated
                ? t('preloader.authenticatedLoadingMessage')
                : t('preloader.loadingMessage')}
            </LoadingText>
          </motion.div>
        </PreloaderContainer>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
