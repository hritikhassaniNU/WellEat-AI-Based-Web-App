import { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  styled,
  Button,
  DialogActions,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { useDropzone } from 'react-dropzone';
import CloseIcon from '@mui/icons-material/Close';
import { SlCloudUpload } from 'react-icons/sl';
import { UserAPIService } from '../../api';
import { StorageKeys } from '../../constants';
import imageCompression from 'browser-image-compression';
import NutritionalInfoComponent from './NutritionalInfoComponent';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Webcam from 'react-webcam';

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 800,
  useWebWorker: true,
};

const FullScreenDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    margin: theme.spacing(2),
    padding: theme.spacing(3),
    borderRadius: 12,
    width: '700px',
    height: 'auto',
    maxWidth: '700px',
    maxHeight: '90vh',
    backgroundColor: 'white',

    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 32px)',
      height: 'calc(100% - 32px)',
      maxWidth: 'none',
      maxHeight: 'none',
      borderRadius: 0,
      margin: 0,
    },
  },
}));

interface UploadImageModalProps {
  open: boolean;
  onClose: () => void;
}

const UploadImageModal = ({ open, onClose }: UploadImageModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [userData] = useState(() => {
    const userDetails = localStorage.getItem(StorageKeys.USER_DETAILS) || '{}';
    return JSON.parse(userDetails);
  });

  const [ingredientInfo, setIngredientInfo] = useState<any>({});

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isCaptureMode, setIsCaptureMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedImage(acceptedFiles[0]);
      setIsCaptureMode(false);
    },
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/gif': ['.gif'],
      'image/svg+xml': ['.svg'],
    },
    maxSize: 5000000, // 5 MB
  });

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setIsCaptureMode(false);
    }
  };

  const handleTakePicture = () => {
    setIsCaptureMode(true);
  };

  const handleCaptureImage = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          setSelectedImage(
            new File([blob], 'captured.jpg', { type: 'image/jpeg' })
          );
          setIsCaptureMode(false);
        });
    }
  };

  const handleAnalyzeButton = async () => {
    if (!selectedImage) {
      alert('Please select an image first');
      return;
    }
    const compressedFile = await imageCompression(selectedImage, options);

    const formData = new FormData();
    formData.append('image', compressedFile);

    try {
      setIsLoading(true);
      const data = await UserAPIService.analyzeImage(userData?._id, formData);

      setIngredientInfo(data.analyzedData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Image analysis error:', error);
      alert('Failed to analyze image');
    }
  };

  const handleModalClose = () => {
    setSelectedImage(null);
    setIngredientInfo({});
    setIsCaptureMode(false);
    onClose();
  };

  return (
    <FullScreenDialog
      open={open}
      onClose={handleModalClose}
      fullScreen={isMobile} // Only full screen for mobile
    >
      {ingredientInfo && ingredientInfo.name ? (
        <NutritionalInfoComponent
          data={ingredientInfo}
          onClose={handleModalClose}
        />
      ) : (
        <Box
          sx={{
            margin: '0 auto',
            maxWidth: '100%',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: theme.spacing(2),
          }}
        >
          <DialogTitle sx={{ p: 0, mb: 2, width: '100%' }}>
            <Box
              display='flex'
              flexDirection='row'
              justifyContent='space-between'
              alignItems='flex-start'
            >
              <Box>
                <Typography sx={{ fontWeight: 600 }} variant='body1'>
                  Upload or Capture a picture
                </Typography>
                <Typography variant='subtitle2'>
                  Choose an ingredient image which you want to analyse.
                </Typography>
              </Box>
              <IconButton onClick={handleModalClose} size='large'>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>

          {!isLoading ? (
            <>
              {isCaptureMode ? (
                <DialogContent
                  sx={{
                    p: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  <Webcam
                    ref={webcamRef}
                    screenshotFormat='image/jpeg'
                    videoConstraints={{
                      width: 640,
                      height: 480,
                      facingMode: 'user',
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 20,
                      display: 'flex',
                      justifyContent: 'center',
                      width: '100%',
                    }}
                  >
                    <Button
                      onClick={handleCaptureImage}
                      variant='contained'
                      color='primary'
                    >
                      Capture
                    </Button>
                  </Box>
                </DialogContent>
              ) : (
                <DialogContent
                  {...getRootProps()}
                  sx={{
                    p: 0,
                    border: selectedImage
                      ? '1px solid #80BB90'
                      : '1px solid rgba(0, 0, 0, 0.23)',
                    height: isMobile ? '300px' : '400px', // Different heights for mobile and desktop
                    width: '100%',
                    borderStyle: 'dashed',
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: theme.spacing(2),
                  }}
                >
                  <input
                    {...getInputProps()}
                    ref={fileInputRef}
                    type='file'
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: isMobile ? 1 : 0,
                    }}
                  >
                    {selectedImage ? (
                      <Typography
                        variant='subtitle2'
                        color='primary'
                        sx={{
                          textAlign: 'center',
                          px: 1,
                        }}
                      >
                        {selectedImage.name}
                      </Typography>
                    ) : (
                      <>
                        <SlCloudUpload size={isMobile ? 50 : 60} />
                        <Typography
                          sx={{
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            textAlign: 'center',
                          }}
                          variant='subtitle2'
                        >
                          <Button
                            onClick={handleFileInputClick}
                            sx={{
                              marginRight: '2px',
                              padding: isMobile ? '4px 8px' : '6px 12px',
                              color: '#80BB90',
                              textTransform: 'none',
                            }}
                          >
                            Click here
                          </Button>
                          to upload an image or
                          <Button
                            onClick={handleTakePicture}
                            sx={{
                              marginRight: '2px',
                              padding: isMobile ? '4px 8px' : '6px 12px',
                              color: '#80BB90',
                              textTransform: 'none',
                            }}
                          >
                            Capture
                          </Button>
                          a picture
                        </Typography>
                        <Typography
                          color='grey.100'
                          variant='subtitle2'
                          sx={{
                            textAlign: 'center',
                            color: 'rgba(0, 0, 0, 0.54)',
                          }}
                        >
                          PNG, JPG (MAX 5 MB)
                        </Typography>
                      </>
                    )}
                  </Box>
                </DialogContent>
              )}
              <DialogActions
                sx={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: isMobile ? 1 : 0,
                  p: theme.spacing(2),
                  justifyContent: 'center',
                }}
              >
                <Button
                  onClick={handleModalClose}
                  color='primary'
                  sx={{
                    color: 'black',
                    width: isMobile ? '100%' : 'auto',
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAnalyzeButton}
                  color='primary'
                  disabled={!selectedImage}
                  sx={{
                    backgroundColor: selectedImage ? '#80BB90' : 'grey.100',
                    color: 'white',
                    width: isMobile ? '100%' : 'auto',
                  }}
                >
                  Analyse
                </Button>
              </DialogActions>
            </>
          ) : (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ScaleLoader color='#80BB90' />
              <Typography
                variant='subtitle2'
                sx={{
                  mt: 2,
                }}
              >
                Analyzing image...
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </FullScreenDialog>
  );
};

export default UploadImageModal;
