import { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import Logo from '../../assets/images/logo.png';
import { useTranslation } from 'react-i18next';
import { LanguageDropdown } from '../Dropdown';
import { setLanguageDispatchFn } from '../../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import i18n from '../../i18n';

// Styled Components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'transparent',
  boxShadow: 'none',
  padding: '15px 0',
  transition: 'all 0.3s ease',
  '&.scrolled': {
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(10px)',
    padding: '8px 0',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  },
}));

const NavLink = styled(Button)(({ theme }) => ({
  color: '#2d3436',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  marginLeft: '30px',
  padding: '8px 16px',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    background: 'rgba(122, 193, 67, 0.08)',
    color: theme.palette.primary.main,
    transform: 'translateY(-2px)',
    '&::after': {
      transform: 'translateX(0)',
    },
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '2px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    transform: 'translateX(-100%)',
    transition: 'transform 0.3s ease',
  },
}));

const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
});

const LogoImage = styled('img')({
  width: '200px',
  height: 'auto',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  '@media (max-width: 600px)': {
    width: '150px',
  },
});

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 280,
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(10px)',
    padding: '20px',
  },
}));

const MobileNavItem = styled(ListItem)({
  borderRadius: '12px',
  marginBottom: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(122, 193, 67, 0.08)',
    transform: 'translateX(8px)',
  },
});

const LogoutButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  color: '#fff',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  padding: '8px 24px',
  borderRadius: '12px',
  marginLeft: '30px',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 15px rgba(122, 193, 67, 0.2)',
  '&:hover': {
    background: `linear-gradient(90deg,${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(122, 193, 67, 0.3)',
  },
}));

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuthContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t('navbar.home'), path: '/home', isAuthenticatedRoute: true },
    { label: t('navbar.myList'), path: '/mylist', isAuthenticatedRoute: true },
    {
      label: t('navbar.profile'),
      path: '/profile',
      isAuthenticatedRoute: true,
    },
    { label: t('navbar.about'), path: '/about', isAuthenticatedRoute: false },
    // {
    //   label: t('navbar.ourTeam'),
    //   path: '/ourteam',
    //   isAuthenticatedRoute: false,
    // },
    {
      label: t('navbar.ourStory'),
      path: '/ourstory',
      isAuthenticatedRoute: false,
    },
    { label: t('navbar.faq'), path: '/faqs', isAuthenticatedRoute: false },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const currentLanguage = useAppSelector((state) => state.user.language);
  const dispatch = useAppDispatch();

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  const handleLanguageChange = (value: string) => {
    dispatch(setLanguageDispatchFn(value));
  };

  return (
    <>
      <StyledAppBar position='fixed' className={scrolled ? 'scrolled' : ''}>
        <Container maxWidth='lg'>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LogoContainer onClick={() => navigate('/home')}>
                <LogoImage src={Logo} alt='Well-Eat' />
              </LogoContainer>
            </motion.div>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Stack direction='row' alignItems='center'>
                {!isAuthenticated && (
                  <LanguageDropdown onClick={handleLanguageChange} />
                )}
                {navItems.map((item, index) => {
                  if (item.isAuthenticatedRoute === isAuthenticated)
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <NavLink onClick={() => handleNavigation(item.path)}>
                          {item.label}
                        </NavLink>
                      </motion.div>
                    );
                })}
                {isAuthenticated ? (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: navItems.length * 0.1 }}
                  >
                    <LogoutButton onClick={logout}>Logout</LogoutButton>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: navItems.length * 0.1 }}
                    onClick={() => navigate('/login')}
                  >
                    <LogoutButton>Login</LogoutButton>
                  </motion.div>
                )}
              </Stack>
            )}

            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{
                  color: '#2d3436',
                  '&:hover': {
                    background: 'rgba(122, 193, 67, 0.08)',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Stack>
        </Container>
      </StyledAppBar>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        <MobileDrawer
          anchor='right'
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Stack spacing={4}>
            {/* Mobile Logo */}
            <LogoContainer
              onClick={() => {
                navigate('/home');
                setDrawerOpen(false);
              }}
            >
              <LogoImage
                src={Logo}
                alt='Well-Eat'
                sx={{
                  width: '200px',
                  margin: '20px auto',
                }}
              />
            </LogoContainer>

            {/* Mobile Navigation Items */}
            <List>
              {navItems.map((item) => {
                if (item.isAuthenticatedRoute === isAuthenticated)
                  return (
                    <MobileNavItem
                      key={item.label}
                      onClick={() => handleNavigation(item.path)}
                    >
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          sx: {
                            fontWeight: 600,
                            color: '#2d3436',
                          },
                        }}
                      />
                    </MobileNavItem>
                  );
              })}
              {isAuthenticated ? (
                <MobileNavItem
                  onClick={() => {
                    logout();
                    setDrawerOpen(false);
                  }}
                  sx={{
                    background: `linear-gradient(90deg,  ${theme.palette.primary.main},  ${theme.palette.primary.light})`,
                    marginTop: 2,
                    color: '#fff',
                    '&:hover': {
                      background: `linear-gradient(90deg, ${theme.palette.primary.main},  ${theme.palette.primary.light})`,
                      transform: 'translateX(8px)',
                    },
                  }}
                >
                  <ListItemText
                    primary='Logout'
                    primaryTypographyProps={{
                      sx: {
                        fontWeight: 600,
                        color: '#fff',
                      },
                    }}
                  />
                </MobileNavItem>
              ) : (
                <MobileNavItem
                  onClick={() => {
                    navigate('/login');
                  }}
                  sx={{
                    background: `linear-gradient(90deg, ${theme.palette.primary.main},  ${theme.palette.primary.light})`,
                    marginTop: 2,
                    color: '#fff',
                    '&:hover': {
                      background: `linear-gradient(90deg,${theme.palette.primary.main},  ${theme.palette.primary.light})`,
                      transform: 'translateX(8px)',
                    },
                  }}
                >
                  <ListItemText
                    primary='Login'
                    primaryTypographyProps={{
                      sx: {
                        fontWeight: 600,
                        color: '#fff',
                      },
                    }}
                  />
                </MobileNavItem>
              )}
            </List>
          </Stack>
        </MobileDrawer>
      </AnimatePresence>
    </>
  );
};

export default Navbar;
