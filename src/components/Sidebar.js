import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Box,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FolderIcon from '@mui/icons-material/Folder';
import GavelIcon from '@mui/icons-material/Gavel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';

const DrawerContainer = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    boxSizing: 'border-box',
    backgroundColor: '#f5f5f5',
    border: 'none',
    marginTop: '64px', // Height of AppBar
  },
}));

const menuItems = [
  { id: 'dashboard', text: 'Dashboard', icon: <DashboardIcon /> },
  { id: 'portfolio', text: 'Portfolio', icon: <FolderIcon /> },
  { id: 'notifications', text: 'Notifications', icon: <NotificationsIcon /> },
  { id: 'auction', text: 'Auction', icon: <GavelIcon /> },
  { id: 'data-upload', text: 'Data Upload', icon: <CloudUploadIcon /> },
  { id: 'control-panel', text: 'Control Panel', icon: <SettingsIcon /> },
  { id: 'user-management', text: 'User Management', icon: <PeopleIcon /> },
  { id: 'permissions', text: 'Permissions', icon: <SecurityIcon /> },
];

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState('portfolio');

  return (
    <DrawerContainer variant="permanent">
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.id}
            onClick={() => setSelectedItem(item.id)}
            sx={{
              mb: 0.5,
              borderRadius: '4px',
              mx: 1,
              '&.Mui-selected': {
                backgroundColor: '#e3f2fd',
                '&:hover': {
                  backgroundColor: '#e3f2fd',
                },
              },
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
            selected={selectedItem === item.id}
          >
            <ListItemIcon sx={{ color: selectedItem === item.id ? 'primary.main' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              sx={{
                '& .MuiListItemText-primary': {
                  color: selectedItem === item.id ? 'primary.main' : 'inherit',
                  fontWeight: selectedItem === item.id ? 500 : 400,
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </DrawerContainer>
  );
};

export default Sidebar;
