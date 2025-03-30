import React from 'react';
import { Box, CssBaseline, AppBar, Toolbar, styled, Avatar } from '@mui/material';
import Sidebar from './components/Sidebar';
import PortfolioTable from './components/PortfolioTable';
import logo from './assets/resollect-logo-original.svg';

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  height: '100vh',
  overflow: 'auto',
  backgroundColor: '#f8f9fa',
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderBottom: '1px solid #e0e0e0',
  minHeight: '64px',
  padding: '0 24px',
});

const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const LogoImg = styled('img')({
  height: '32px',
  width: 'auto',
});

const UserSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#fff',
          boxShadow: 'none',
        }}
      >
        <StyledToolbar>
          <LogoContainer>
            <LogoImg src={logo} alt="Resollect" />
          </LogoContainer>
          <UserSection>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>T</Avatar>
          </UserSection>
        </StyledToolbar>
      </AppBar>
      <Sidebar />
      <MainContent>
        <Toolbar /> {/* This is for spacing below the AppBar */}
        <ContentContainer>
          <PortfolioTable />
        </ContentContainer>
      </MainContent>
    </Box>
  );
}

export default App;
