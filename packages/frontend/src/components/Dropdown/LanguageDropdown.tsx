import { useState } from 'react';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const LANGUAGES = [
  { id: 1, name: 'English', value: 'en' },
  { id: 2, name: '语言', value: 'chn' },
  { id: 3, name: 'Hindi', value: 'hnd' },
  { id: 4, name: 'Tamil', value: 'tml' },
];

const LanguageDropdown = ({
  onClick,
}: {
  onClick: (value: string) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (language: {
    id: number;
    name: string;
    value: string;
  }) => {
    onClick(language.value);
    setSelectedLanguage(language);
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        aria-controls='language-menu'
        aria-haspopup='true'
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
      >
        {selectedLanguage.name}
      </Button>
      <Menu
        id='language-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => handleClose(selectedLanguage)}
      >
        {LANGUAGES.map((language) => (
          <MenuItem
            key={language.id}
            selected={language.id === selectedLanguage.id}
            onClick={() => handleClose(language)}
          >
            <Typography>{language.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageDropdown;
