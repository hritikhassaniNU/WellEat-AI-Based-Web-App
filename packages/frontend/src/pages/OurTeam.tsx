import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  styled,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { LinkedIn, GitHub, Language } from '@mui/icons-material';

const TeamSection = styled(Box)({
  padding: '100px 0',
  background: 'linear-gradient(135deg, #f5f9f5 0%, #ffffff 100%)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background:
      'radial-gradient(circle at 0% 0%, rgba(122, 193, 67, 0.1) 0%, transparent 50%)',
    zIndex: 0,
  },
});

const TeamCard = styled(motion.div)({
  background: 'white',
  borderRadius: '24px',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  transition: 'all 0.3s ease',
  height: '500px', // Fixed height
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 40px rgba(122, 193, 67, 0.15)',
    '& .member-image img': {
      transform: 'scale(1.05)',
    },
  },
});

const MemberImage = styled(Box)({
  width: '100%',
  height: '280px', // Fixed height for images
  overflow: 'hidden',
  position: 'relative',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
});

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: 'rgba(122, 193, 67, 0.1)',
  padding: '8px',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease',
}));

const teamMembers = [
  {
    id: 1,
    name: 'Prayas Lashkari',
    role: 'M.S. in Software Engineering',
    image: '/src/assets/images/prayas.jpeg',
    description:
      'Designer, Developer with a passion for creating beautiful and functional user experiences.',
    linkedin: 'https://www.linkedin.com/in/prayaslashkari/',
    github: 'https://github.com/prayaslashkari',
    website: 'https://prayaslashkari.in/',
  },
  {
    id: 2,
    name: 'Hritik Hassani',
    role: 'M.S. in Information Systems',
    image: '/src/assets/images/hritik.png',
    description:
      'Developer and Entrepreneur with a focus on building products that solve real-world problems.',
    linkedin: 'www.linkedin.com/in/hritik-hassani',
    github: 'https://github.com/hritikhassaniNU',
    website: 'www.linkedin.com/in/hritik-hassani',
  },
  {
    id: 3,
    name: 'Amritesh Anand',
    role: 'M.S. in Software Engineering',
    image: '/src/assets/images/amritesh.jpeg',
    description:
      'Experienced Fullstack developer with a passion for building scalable and performant web applications.',
    linkedin: 'https://www.linkedin.com/in/amritessh/',
    github: 'https://github.com/amritessh',
    website: 'https://www.linkedin.com/in/amritessh/',
  },
  {
    id: 4,
    name: 'Shubham Bhadra',
    role: 'M.S. in Software Engineering',
    image: '/src/assets/images/shubham.jpeg',
    description:
      'Experience Backend Developer and Data Engineer with a focus on building scalable and reliable backend systems.',
    linkedin: 'https://www.linkedin.com/in/shubham-bhadra/',
    github: 'https://github.com/shubham-bhadra-10',
    website: 'https://www.linkedin.com/in/shubham-bhadra',
  },
];

const OurTeam = () => {
  const theme = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <TeamSection>
      <Container maxWidth='lg' sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {/* Header Section */}
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
            <Typography
              variant='subtitle1'
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                mb: 2,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
              }}
            >
              Our Team
            </Typography>
            <Typography
              variant='h2'
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 3,
                background: `linear-gradient(45deg, #2C5282, ${theme.palette.primary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Meet the folks behind this platform
            </Typography>
            <Typography
              variant='body1'
              sx={{
                fontSize: '1.1rem',
                color: '#64748B',
                maxWidth: '600px',
                margin: '0 auto',

                lineHeight: 1.8,
              }}
            >
              We are group of graduate students from Northeastern University.
            </Typography>
          </Box>

          {/* Team Grid */}
          <Grid container spacing={4}>
            {teamMembers.map((member) => (
              <Grid item xs={12} sm={6} md={3} key={member.id}>
                <motion.div variants={itemVariants}>
                  <TeamCard>
                    <MemberImage className='member-image'>
                      <img src={member.image} alt={member.name} />
                    </MemberImage>
                    <Box
                      sx={{
                        p: 3,
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant='h6'
                          sx={{
                            fontWeight: 600,
                            mb: 1,
                            color: '#2d3436',

                            fontSize: '1.25rem',
                          }}
                        >
                          {member.name}
                        </Typography>
                        <Typography
                          variant='subtitle1'
                          sx={{
                            color: theme.palette.primary.main,
                            fontWeight: 500,
                            mb: 2,

                            fontSize: '0.95rem',
                          }}
                        >
                          {member.role}
                        </Typography>
                        <Typography
                          variant='body2'
                          sx={{
                            color: '#64748B',
                            mb: 3,
                            lineHeight: 1.6,

                            fontSize: '0.9rem',
                          }}
                        >
                          {member.description}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
                        <a
                          href={member.linkedin}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <SocialButton size='small'>
                            <LinkedIn />
                          </SocialButton>
                        </a>
                        <a
                          href={member.github}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <SocialButton size='small'>
                            <GitHub />
                          </SocialButton>
                        </a>
                        <a
                          href={member.website}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <SocialButton size='small'>
                            <Language />
                          </SocialButton>
                        </a>
                      </Box>
                    </Box>
                  </TeamCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </TeamSection>
  );
};

export default OurTeam;
