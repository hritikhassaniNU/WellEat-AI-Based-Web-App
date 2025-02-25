import { FC } from 'react';
import { styled } from '@mui/material';
import { Button as MUIButton } from '@mui/material';

const StyledButton = styled(MUIButton)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  color: theme.palette.grey[50],
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  padding: '8px 24px',
  borderRadius: '12px',
  marginLeft: '30px',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 15px rgba(122, 193, 67, 0.2)',
  '&:hover': {
    background: `linear-gradient(90deg, ${theme.palette.primary.main},${theme.palette.primary.light})`,
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(122, 193, 67, 0.3)',
  },
}));

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ text, onClick }) => {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
};

export default Button;
