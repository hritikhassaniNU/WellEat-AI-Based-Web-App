import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Stack,
  styled,
  useTheme,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  KeyboardArrowRight,
  Phone,
  Email,
  LocationOn,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const FooterWrapper = styled(Box)({
  backgroundColor: '#F5F9F5',
  paddingTop: '64px',
  paddingBottom: '32px',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -40,
    left: 0,
    right: 0,
    height: '40px',
    backgroundColor: '#F5F9F5',
    borderTopLeftRadius: '50% 100%',
    borderTopRightRadius: '50% 100%',
  },
});

const SocialButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  margin: '0 8px',
  padding: '12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    transform: 'translateY(-3px)',
    '& svg': {
      color: '#333',
    },
  },
  '& svg': {
    fontSize: '20px',
    color: '#fff',
    transition: 'all 0.3s ease',
  },
}));

const QuickLink = styled(Link)(({ theme }) => ({
  color: '#333',
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  marginBottom: '12px',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.primary.main,
    transform: 'translateX(5px)',
  },
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px',
  '& svg': {
    color: theme.palette.primary.main,
    marginRight: '12px',
  },
}));

const Footer = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <FooterWrapper>
      <Container maxWidth='lg'>
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={footerVariants}
        >
          <Grid container spacing={4}>
            {/* Brand Column */}
            <Grid item xs={12} md={3}>
              <Typography variant='h4' sx={{ fontWeight: 600, mb: 2 }}>
                WellEat
                <span style={{ color: theme.palette.primary.main }}>.</span>
              </Typography>
              <Typography variant='body2' sx={{ color: '#666', mb: 3 }}>
                Empowering healthier choices through AI-powered nutrition
                analysis and personalized recommendations.
              </Typography>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} md={3}>
              <Typography variant='h6' sx={{ fontWeight: 600, mb: 3 }}>
                {t('footer.quickLinks')}
              </Typography>
              {[
                { text: t('footer.ourTeam'), path: '/' },
                { text: t('footer.ourStory'), path: '/ourstory' },
                { text: t('footer.faq'), path: '/faqs' },
              ].map(({ text, path }) => (
                <QuickLink key={text} to={path}>
                  <KeyboardArrowRight
                    sx={{ color: theme.palette.primary.main, mr: 1 }}
                  />
                  {text}
                </QuickLink>
              ))}
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} md={3}>
              <Typography variant='h6' sx={{ fontWeight: 600, mb: 3 }}>
                {t('footer.contactInfo')}
              </Typography>
              <Stack spacing={2}>
                <ContactItem>
                  <LocationOn />
                  <Typography variant='body2'>Boston, MA, USA</Typography>
                </ContactItem>
                <ContactItem>
                  <Phone />
                  <Typography variant='body2'>+1 (555) 123-4567</Typography>
                </ContactItem>
                <ContactItem>
                  <Email />
                  <Typography variant='body2'>contact@WellEat.com</Typography>
                </ContactItem>
              </Stack>
            </Grid>

            {/* Newsletter */}
            {/* <Grid item xs={12} md={3}>
              <Typography variant='h6' sx={{ fontWeight: 600, mb: 3 }}>
                Subscribe to Newsletter
              </Typography>
              <Typography variant='body2' sx={{ color: '#666', mb: 3 }}>
                Stay updated with our latest features and health tips.
              </Typography>
              <Box sx={{ mb: 3 }}>
                <CustomInput
                  fullWidth
                  placeholder='Your Email'
                  size='medium'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <SubscribeButton>Subscribe</SubscribeButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Grid> */}
          </Grid>

          {/* Footer Social Icons and Copyright */}
          <Box
            sx={{
              borderTop: '1px solid #E0E0E0',
              mt: 4,
              pt: 4,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Typography variant='body2' color='text.secondary'>
              © {new Date().getFullYear()} WellEat. All rights reserved By Team
              Honoredones.
            </Typography>
            <Stack direction='row' spacing={1}>
              {[Facebook, Twitter, LinkedIn, Instagram].map((Icon, index) => (
                <SocialButton key={index} size='small'>
                  <Icon />
                </SocialButton>
              ))}
            </Stack>
          </Box>
        </motion.div>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
