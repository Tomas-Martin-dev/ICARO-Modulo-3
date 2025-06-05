import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ChefHat, Star, Menu as MenuIcon, X } from 'lucide-react';

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const navLinks = [
    { text: 'Recetas', icon: <ChefHat size={20} />, path: '/' },
    { text: 'Favoritos', icon: <Star size={20} />, path: '/favorites' },
  ];

  const drawerContent = (
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

  return (
    <AppBar position="static" className="!bg-emerald-500 shadow-lg">
      <Toolbar>
        <Box className="flex items-center flex-grow">
          <img src="/logo.svg" alt="Logo" className="h-10 mr-3" />

          <Typography
            variant="h6"
            component="div"
            className="text-white font-bold"
          >
            Recetas App
          </Typography>
        </Box>

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawerContent}
            </Drawer>
          </>
        ) : (
          <>
            {navLinks.map(link => (
              <Button
                key={link.text}
                color="inherit"
                component={Link}
                to={link.path}
                startIcon={link.icon}
                className="text-white hover:!bg-emerald-600 !px-4"
              >
                {link.text}
              </Button>
            ))}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
