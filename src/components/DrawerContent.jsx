import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { ChefHat, Star, X } from 'lucide-react';
import { IconButton } from '@mui/material';
import useRecipe from '../hooks/useRecipe';
import LanguageSelector from './LanguageSelector';

export default function DrawerContent({ toggleDrawer }) {
  const { t } = useTranslation();
  const { isFavoritesPage } = useRecipe();
  const navLinks = [
    {
      text: 'Recetas',
      icon: <ChefHat size={20} />,
      path: '/',
      className: `text-white hover:!bg-emerald-600 !px-4 transition-colors duration-300 ${!isFavoritesPage && '!text-amber-200 '}`,
    },
    {
      text: 'Favoritos',
      icon: <Star size={20} />,
      path: '/favorites',
      className: `text-white hover:!bg-emerald-600 !px-4 transition-colors duration-300 ${isFavoritesPage && '!text-amber-200'}`,
    },
  ];

  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={toggleDrawer(false)}>
          <X />
        </IconButton>
      </Box>

      <List>
        {navLinks.map(link => (
          <ListItem button component={Link} to={link.path} key={link.text}>
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.text} />
          </ListItem>
        ))}

        <Box sx={{ ml: 2 }} className="!ml-0 md:!ml-2">
          <LanguageSelector variant="drawer" />
        </Box>
      </List>
    </Box>
  );
}
