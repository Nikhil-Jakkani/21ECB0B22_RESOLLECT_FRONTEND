import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  IconButton,
  Checkbox,
  Typography,
  Pagination,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const mockData = [
  {
    id: 'L78/15247',
    loanType: 'Home Loan',
    borrower: 'Tushar',
    borrowerAddress: '058720',
    coBorrowerName: 'Divit Vora',
    coBorrowerAddress: 'Dingee-0152360',
    currentDPD: 91,
    sanctionAmount: '₹ 1924568',
    region: 'West',
  },
  {
    id: 'L78/15243',
    loanType: 'Car Loan',
    borrower: 'Nivritti Agrawal',
    borrowerAddress: '88/622, Dev Path, Burhanpura-841188',
    coBorrowerName: 'Monika Tak',
    coBorrowerAddress: '58 16th Road, Sultan Pur Majra 870873',
    currentDPD: 100,
    sanctionAmount: '₹ 1842163',
    region: 'North',
  },
  // Add more mock data as needed
];

const tabs = [
  'All',
  'Pre Sarfaesi',
  'NPA',
  '13(2) Responses',
  'Symbolic Possession',
  'DM Order',
  'Physical Possessions',
  'Auctions',
];

const headCells = [
  { id: 'id', label: 'Loan No.' },
  { id: 'loanType', label: 'Loan Type' },
  { id: 'borrower', label: 'Borrower' },
  { id: 'borrowerAddress', label: 'Borrower Address' },
  { id: 'coBorrowerName', label: 'Co-Borrower Name' },
  { id: 'coBorrowerAddress', label: 'Co-Borrower Address' },
  { id: 'currentDPD', label: 'Current DPD', numeric: true },
  { id: 'sanctionAmount', label: 'Sanction Amount' },
  { id: 'region', label: 'Region' },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const PortfolioTable = () => {
  const [openUpload, setOpenUpload] = useState(false);
  const [documentType, setDocumentType] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const rowsPerPage = 10;

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : orderBy === property ? '' : 'asc');
    setOrderBy(order === 'desc' && orderBy === property ? '' : property);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = mockData.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleUploadClick = () => {
    setOpenUpload(true);
  };

  const handleClose = () => {
    setOpenUpload(false);
    setSelectedFile(null);
    setDocumentType('');
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    console.log('Uploading file:', selectedFile);
    console.log('Document type:', documentType);
    handleClose();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 3,
          fontWeight: 1000,
          color: 'text.primary',
        }}
      >
        Portfolio
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="portfolio tabs"
        >
          {tabs.map((tab) => (
            <Tab key={tab} label={tab} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, gap: 2 }}>
        <TextField
          placeholder="Search Loan Number"
          size="small"
          sx={{ minWidth: 200 }}
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            endIcon={<KeyboardArrowDownIcon />}
            size="small"
          >
            Select Columns
          </Button>
          <Button
            variant="contained"
            startIcon={<FilterListIcon />}
            size="small"
          >
            More Filters
          </Button>
        </Box>
      </Box>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="portfolio table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < mockData.length}
                  checked={mockData.length > 0 && selected.length === mockData.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      userSelect: 'none',
                      color: orderBy === headCell.id ? 'primary.main' : 'inherit',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                    onClick={() => handleRequestSort(headCell.id)}
                  >
                    {headCell.label}
                    <Box 
                      component="span" 
                      sx={{ 
                        display: 'inline-flex',
                        ml: 0.5,
                        opacity: orderBy === headCell.id ? 1 : 0.5,
                      }}
                    >
                      {orderBy === headCell.id ? (
                        order === 'asc' ? (
                          <KeyboardArrowUpIcon fontSize="small" />
                        ) : (
                          <KeyboardArrowDownIcon fontSize="small" />
                        )
                      ) : (
                        <UnfoldMoreIcon fontSize="small" />
                      )}
                    </Box>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(mockData, getComparator(order, orderBy))
              .map((row) => {
                const isItemSelected = isSelected(row.id);
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isItemSelected} />
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.loanType}</TableCell>
                    <TableCell>{row.borrower}</TableCell>
                    <TableCell>{row.borrowerAddress}</TableCell>
                    <TableCell>{row.coBorrowerName}</TableCell>
                    <TableCell>{row.coBorrowerAddress}</TableCell>
                    <TableCell align="right">{row.currentDPD}</TableCell>
                    <TableCell>{row.sanctionAmount}</TableCell>
                    <TableCell>{row.region}</TableCell>
                  </TableRow>
                );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Total {mockData.length} row(s)
        </Typography>
        <Pagination
          count={Math.ceil(mockData.length / rowsPerPage)}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Box>

      <Dialog open={openUpload} onClose={handleClose}>
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Document Name"
              variant="outlined"
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Document Type</InputLabel>
              <Select
                value={documentType}
                label="Document Type"
                onChange={(e) => setDocumentType(e.target.value)}
              >
                <MenuItem value="type1">Type 1</MenuItem>
                <MenuItem value="type2">Type 2</MenuItem>
                <MenuItem value="type3">Type 3</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Document Remarks"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
            />
            <Button
              variant="outlined"
              component="label"
              fullWidth
            >
              Choose File
              <input
                type="file"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {selectedFile && (
              <Box sx={{ mt: 1 }}>
                Selected file: {selectedFile.name}
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PortfolioTable;
