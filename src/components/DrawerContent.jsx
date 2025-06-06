import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { Home, Info, Contact, X } from 'lucide-react';
import { IconButton } from '@mui/material';

export default function DrawerContent({ toggleDrawer }) {
  const { t } = useTranslation();

  const navLinks = [
    { text: t('ui.home'), icon: <Home />, path: '/' },
    { text: t('ui.about'), icon: <Info />, path: '/about' },
    { text: t('ui.contact'), icon: <Contact />, path: '/contact' },
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
      </List>
    </Box>
  );
}
