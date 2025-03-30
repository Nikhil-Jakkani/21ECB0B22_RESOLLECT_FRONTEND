import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import GavelIcon from '@mui/icons-material/Gavel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsIcon from '@mui/icons-material/Settings';
import UploadDialog from './UploadDialog';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    borderRight: '1px solid #e0e0e0',
  },
});

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'Notifications', icon: <NotificationsIcon /> },
  { text: 'Notes', icon: <NoteAltIcon /> },
  { text: 'Auction', icon: <GavelIcon /> },
  { text: 'Data Upload', icon: <CloudUploadIcon /> },
  { text: 'Control Panel', icon: <AdminPanelSettingsIcon /> },
  { text: 'User Management', icon: <SettingsIcon /> },
];

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openUpload, setOpenUpload] = useState(false);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    if (menuItems[index].text === 'Data Upload') {
      setOpenUpload(true);
    }
  };

  return (
    <>
      <StyledDrawer variant="permanent">
        <Box sx={{ overflow: 'auto', mt: 8 }}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected={selectedIndex === index}
                  onClick={(event) => handleListItemClick(event, index)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#1976d2',
                      color: '#fff',
                      '& .MuiListItemIcon-root': {
                        color: '#fff',
                      },
                      '&:hover': {
                        backgroundColor: '#1565c0',
                      },
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                    },
                    borderRadius: '0 24px 24px 0',
                    mx: 1,
                    mb: 0.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: selectedIndex === index ? '#fff' : '#637381',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </StyledDrawer>

      <UploadDialog 
        open={openUpload} 
        onClose={() => setOpenUpload(false)} 
      />
    </>
  );
};

export default Sidebar;
