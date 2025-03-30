import React from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, styled } from '@mui/material';
import Sidebar from './components/Sidebar';
import PortfolioTable from './components/PortfolioTable';

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: 240,
}));

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Resollect Portfolio Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar />
      <MainContent>
        <Toolbar /> {/* This is for spacing below the AppBar */}
        <PortfolioTable />
      </MainContent>
    </Box>
  );
}

export default App;
