import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, styled } from '@mui/material';
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
  },
}));

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'Portfolio', icon: <FolderIcon /> },
  { text: 'Notifications', icon: <NotificationsIcon /> },
  { text: 'Auction', icon: <GavelIcon /> },
  { text: 'Data Upload', icon: <CloudUploadIcon /> },
  { text: 'Control Panel', icon: <SettingsIcon /> },
  { text: 'User Management', icon: <PeopleIcon /> },
  { text: 'Permissions', icon: <SecurityIcon /> },
];

const Sidebar = () => {
  return (
    <DrawerContainer variant="permanent">
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </DrawerContainer>
  );
};

export default Sidebar;
