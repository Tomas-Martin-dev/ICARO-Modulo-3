import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ChefHat, Star, Menu as MenuIcon, Info } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import DrawerContent from './DrawerContent';
import useRecipe from '../hooks/useRecipe';

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isFavoritesPage } = useRecipe();

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
    <AppBar position="static" className="!bg-emerald-500 shadow-lg">
      <Toolbar className="!px-2 md:!px-6 !py-1 md:!py-2">
        <Box className="flex items-center flex-grow">
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-8 md:h-10 mr-1 md:mr-3"
          />

          <Typography
            variant="h6"
            component="div"
            className="text-white font-bold text-sm md:text-base"
          >
            Chefcito App
          </Typography>
        </Box>

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              className="!p-1 md:!p-2 !mr-1"
            >
              <MenuIcon size={20} />
            </IconButton>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <DrawerContent toggleDrawer={toggleDrawer} />
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
                className={`${link.className} !text-xs md:!text-sm !px-2 md:!px-4`}
              >
                {link.text}
              </Button>
            ))}

            <Box sx={{ ml: 0.5 }} className="md:!ml-2">
              <LanguageSelector />
            </Box>
          </>
        )}

        <Tooltip
          title="Las traducciones pueden fallar o demorar ya que la api tiene un limite de traducciones"
          arrow
          placement={isMobile ? 'top' : 'bottom'}
          disableHoverListener={isMobile}
          disableFocusListener={isMobile}
          disableTouchListener={false}
          enterTouchDelay={0}
          leaveTouchDelay={3000}
          PopperProps={{
            disablePortal: isMobile,
          }}
        >
          <IconButton
            color="inherit"
            size="small"
            className="!ml-0.5 md:!ml-2 !p-1 md:!p-2"
            aria-label="Información sobre traducciones"
          >
            <Info size={16} className="md:!w-5 md:!h-5" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
