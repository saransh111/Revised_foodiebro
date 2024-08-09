import React, { useState } from 'react';
import { Fab, Box, Paper, Typography, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

export default function ExpandingButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="chat"
        onClick={toggleOpen}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </Fab>

      {isOpen && (
        <Paper
          elevation={4}
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 16,
            width: 300,
            height: 200,
            padding: 2,
            zIndex: 999,
            borderRadius: 2,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Chat Window</Typography>
            <IconButton onClick={toggleOpen} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" mt={2}>
            Start your conversation here!
          </Typography>
        </Paper>
      )}
    </div>
  );
}
