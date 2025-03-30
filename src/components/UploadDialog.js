import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const UploadDialog = ({ open, onClose }) => {
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = () => {
    // Handle file upload logic here
    console.log({
      documentName,
      documentType,
      selectedFile
    });
    onClose();
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid #e0e0e0',
        pb: 2
      }}>
        Upload Document
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Document Name</Typography>
            <Select
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              displayEmpty
              sx={{ bgcolor: '#f5f5f5' }}
            >
              <MenuItem value="" disabled>Select</MenuItem>
              <MenuItem value="doc1">Document 1</MenuItem>
              <MenuItem value="doc2">Document 2</MenuItem>
              <MenuItem value="doc3">Document 3</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Document Type</Typography>
            <Select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              displayEmpty
              sx={{ bgcolor: '#f5f5f5' }}
            >
              <MenuItem value="" disabled>Select</MenuItem>
              <MenuItem value="type1">Type 1</MenuItem>
              <MenuItem value="type2">Type 2</MenuItem>
              <MenuItem value="type3">Type 3</MenuItem>
            </Select>
          </FormControl>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Document Remarks</Typography>
            <TextField
              multiline
              rows={4}
              fullWidth
              placeholder="Type..."
              sx={{ bgcolor: '#f5f5f5' }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Select File</Typography>
            <Box
              sx={{
                border: '1px dashed #1976d2',
                borderRadius: 1,
                p: 2,
                textAlign: 'center',
                bgcolor: '#f5f5f5',
                cursor: 'pointer'
              }}
              component="label"
            >
              <input
                type="file"
                hidden
                onChange={handleFileChange}
              />
              <Typography color="textSecondary">
                {selectedFile ? selectedFile.name : 'Choose file No file chosen'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          sx={{ 
            bgcolor: '#1976d2',
            '&:hover': {
              bgcolor: '#1565c0'
            }
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadDialog;
