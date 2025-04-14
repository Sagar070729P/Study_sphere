import React, { useState } from 'react';
import {
  Box, Grid, Typography, IconButton, Menu, MenuItem, Card, CardContent, CardMedia
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import '../styles/Uploads.css';

const Uploads = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [openFolders, setOpenFolders] = useState({});


  const open = Boolean(anchorEl);

  const toggleFolder = (folderName) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFileUpload = async (type) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.webkitdirectory = type === 'folder';
    input.onchange = (e) => {
      const files = Array.from(e.target.files);
  
      if (type === 'folder') {
        const folderMap = {};
  
        files.forEach((file) => {
          const folderName = file.webkitRelativePath.split('/')[0];
  
          if (!folderMap[folderName]) {
            folderMap[folderName] = {
              name: folderName,
              isFolder: true,
              type: 'folder',
              children: [],
            };
          }
  
          folderMap[folderName].children.push({
            name: file.name,
            url: URL.createObjectURL(file),
            type: file.type.includes('image') ? 'image' :
                  file.type.includes('video') ? 'video' : 'file',
          });
        });
  
        const folders = Object.values(folderMap);
        setUploads((prev) => [...prev, ...folders]);
      } else {
        const newFiles = files.map((file) => ({
          name: file.name,
          url: URL.createObjectURL(file),
          type: file.type.includes('image') ? 'image' :
                file.type.includes('video') ? 'video' : 'file',
          isFolder: false
        }));
        setUploads((prev) => [...prev, ...newFiles]);
      }
    };
    input.click();
    handleClose();
  };
  

  const handleDrop = (targetIndex) => {
    if (!draggedItem || draggedItem === uploads[targetIndex]) return;
    const newUploads = [...uploads];
    const folderName = `${uploads[targetIndex].name}_${draggedItem.name}_Folder`;
    newUploads.splice(targetIndex, 1, {
      name: folderName,
      isFolder: true,
      type: 'folder',
      children: [uploads[targetIndex], draggedItem],
    });
    setUploads(newUploads.filter((item) => item !== draggedItem));
    setDraggedItem(null);
  };

  const files = uploads.filter((item) => !item.isFolder);
  const folders = uploads.filter((item) => item.isFolder);

  const renderItem = (item, index) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={3}
      key={index}
      draggable
      onDragStart={() => setDraggedItem(item)}
      onDrop={() => handleDrop(index)}
      onDragOver={(e) => e.preventDefault()}
    >
      <Card className="upload-card">
        {item.type === 'image' ? (
          <CardMedia
            component="img"
            height="140"
            image={item.url}
            alt={item.name}
          />
        ) : item.type === 'video' ? (
          <CardMedia
            component="video"
            height="140"
            src={item.url}
            controls
          />
        ) : item.isFolder ? (
          <Box className="upload-preview">
            <FolderIcon fontSize="large" />
          </Box>
        ) : (
          <Box className="upload-preview" onClick={() => toggleFolder(item.name)} style={{ cursor: 'pointer' }}>
  <FolderIcon fontSize="large" />
</Box>

        )}
        <CardContent>
          <Typography variant="body2">{item.name}</Typography>
          <Box className="card-actions">
            <IconButton size="small"><SendIcon /></IconButton>
            <IconButton size="small"><MoreVertIcon /></IconButton>
          </Box>
        </CardContent>
      </Card>
      {openFolders[item.name] && item.children && (
  <Grid container spacing={1} sx={{ pl: 2 }}>
    {item.children.map((child, childIdx) => (
      <Grid item xs={6} sm={4} md={3} key={childIdx}>
        <Card className="upload-card">
          {child.type === 'image' ? (
            <CardMedia component="img" height="140" image={child.url} />
          ) : child.type === 'video' ? (
            <CardMedia component="video" height="140" src={child.url} controls />
          ) : (
            <Box className="upload-preview">
              <InsertDriveFileIcon fontSize="large" />
            </Box>
          )}
          <CardContent>
            <Typography variant="body2">{child.name}</Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
)}

    </Grid>
  );

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Uploads</Typography>

      <Typography variant="h6" mt={3}>Folders</Typography>
      <Grid container spacing={2}>
        {folders.map(renderItem)}
      </Grid>

      <Typography variant="h6" mt={3}>Files</Typography>
      <Grid container spacing={2}>
        {files.map(renderItem)}
      </Grid>

      <IconButton
        color="primary"
        className="upload-fab"
        onClick={handleClick}
      >
        <AddIcon fontSize="large" />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleFileUpload('file')}>Upload File</MenuItem>
        <MenuItem onClick={() => handleFileUpload('folder')}>Upload Folder</MenuItem>
      </Menu>
    </Box>
  );
};

export default Uploads;
