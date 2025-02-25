import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  styled,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const FAQSection = styled(Box)({
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

const StyledAccordion = styled(Accordion)({
  background: 'transparent',
  boxShadow: 'none',
  '&:before': {
    display: 'none',
  },
  marginBottom: '16px',
  border: '1px solid rgba(122, 193, 67, 0.2)',
  borderRadius: '12px !important',
  '&.Mui-expanded': {
    margin: '0 0 16px 0',
  },
});

const StyledAccordionSummary = styled(AccordionSummary)({
  padding: '8px 24px',
  '& .MuiAccordionSummary-content': {
    margin: '16px 0',
  },
  '&.Mui-expanded': {
    backgroundColor: 'rgba(122, 193, 67, 0.05)',
    borderRadius: '12px 12px 0 0',
  },
});

const faqData = [
  {
    question: 'How does the AI analyze food labels?',
    answer:
      "Our AI technology scans food labels using your phone's camera and analyzes ingredients, nutritional content, and additives in real-time. It compares this information against our comprehensive database to provide detailed insights about the product's health impact.",
  },
  {
    question: 'Can I use the app for dietary restrictions?',
    answer:
      "Yes! The app can identify ingredients that don't align with various dietary preferences and restrictions including vegetarian, vegan, gluten-free, and common allergies. You can set your dietary preferences in your profile for personalized recommendations.",
  },
  {
    question: 'How accurate are the nutritional insights?',
    answer:
      'Our AI system maintains a 98% accuracy rate for nutritional analysis. We regularly update our database with the latest nutritional information and cross-reference with multiple reliable sources to ensure accuracy.',
  },
  {
    question: 'Is my personal data secure?',
    answer:
      'We take data privacy seriously. All personal information is encrypted and stored securely. We never share your data with third parties without your explicit consent, and you have full control over your data through your account settings.',
  },
  {
    question: 'Can I scan products offline?',
    answer:
      'Yes, you can scan products offline, and the results will be saved locally on your device. However, for the most up-to-date information and full feature access, we recommend connecting to the internet when possible.',
  },
  {
    question: 'How often is the database updated?',
    answer:
      'Our product database is updated daily with new items and nutritional information. We continuously monitor and verify our data to ensure you have access to the most current and accurate information available.',
  },
];

/**
 * `FAQs` Screen
 * A simple FAQs page that displays frequently asked questions and their answers.
 *
 * Features:
 * - Displays questions.
 * - Provides a button to expand the accordion.
 *
 * @returns {JSX.Element} List of FAQs.
 */

const FAQs = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <FAQSection>
      <Container maxWidth='lg' sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography
            variant='subtitle1'
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
              mb: 2,
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
            }}
          >
            FAQ
          </Typography>

          <Typography
            variant='h2'
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 6,
              textAlign: 'center',
              background: `linear-gradient(45deg, #2C5282, ${theme.palette.primary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Frequently Asked Questions
          </Typography>

          <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
            {faqData.map((faq, index) => (
              <motion.div
                key={`panel${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <StyledAccordion
                  expanded={expanded === `panel${index}`}
                  onChange={handleChange(`panel${index}`)}
                >
                  <StyledAccordionSummary
                    expandIcon={
                      expanded === `panel${index}` ? (
                        <RemoveIcon
                          sx={{ color: theme.palette.primary.main }}
                        />
                      ) : (
                        <AddIcon sx={{ color: theme.palette.primary.main }} />
                      )
                    }
                  >
                    <Typography
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color:
                          expanded === `panel${index}`
                            ? theme.palette.primary.main
                            : '#2d3436',
                      }}
                    >
                      {faq.question}
                    </Typography>
                  </StyledAccordionSummary>
                  <AccordionDetails>
                    <Typography
                      sx={{
                        color: '#64748B',
                        lineHeight: 1.8,

                        fontSize: '1rem',
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </StyledAccordion>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>
    </FAQSection>
  );
};

export default FAQs;
