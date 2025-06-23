import React from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Tooltip,
  Paper,
} from '@mui/material';
import { GitHub } from '@mui/icons-material';

export default function Footer() {
  return (
    <Paper
      component="footer"
      elevation={8}
      sx={{
        backgroundColor: 'rgba(16, 185, 129, 1)',
        color: 'white',
        display: 'flex',
        alignItems: 'flex-end',
        py: '12px',
        overflow: 'hidden',
        zIndex: 100,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
            px: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 0.5, sm: 0 },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src="/logo.svg" alt="Chefcito App" className="w-10 h-10" />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                display: { sm: 'none', md: 'block' },
              }}
            >
              Chefcito App
            </Typography>
          </Box>

          <Box
            sx={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                fontSize: { xs: '0.65rem', sm: '0.75rem' },
              }}
            >
              © 2025 - Diplomatura FullStack Ícaro
            </Typography>

            <Typography
              variant="caption"
              sx={{
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                fontSize: { xs: '0.65rem', sm: '0.75rem' },
                display: { xs: 'none', sm: 'block' },
              }}
            >
              -
            </Typography>

            <Tooltip title="Ver perfil de desarrollador" placement="top">
              <IconButton
                href="https://github.com/Tomiimartin"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                  fontSize: { xs: '0.65rem', sm: '0.75rem' },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    fontSize: { xs: '0.65rem', sm: '0.75rem' },
                  }}
                >
                  @TomasMartinDev
                </Typography>
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Ver en GitHub" placement="top">
              <IconButton
                href="https://github.com/Tomas-Martin-dev/ICARO-Modulo-3"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <GitHub />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Container>
    </Paper>
  );
}
