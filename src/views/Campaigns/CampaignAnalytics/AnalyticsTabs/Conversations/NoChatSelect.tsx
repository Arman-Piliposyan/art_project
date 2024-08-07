import { Typography, Divider, Box } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import React from 'react';

import { Colors } from '/src/globalStyles/colors';

export const NoConversationSelect = () => {
  return (
    <Box
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        width: '100%',
      }}
    >
      <Box
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          display: 'flex',
          width: '40%',
          gap: '6px',
        }}
      >
        {/* <Box sx={{ alignItems: 'center', display: 'flex', gap: '16px' }}>
          <ChatIcon sx={{ color: Colors.white, fontSize: '80px' }} />
          <Typography fontWeight={800} fontSize={96}>
            Chats
          </Typography>
        </Box> */}
        {/* <Divider
          sx={{
            borderColor: Colors.white,
            borderBottomWidth: '1px',
            marginTop: '8px',
            width: '100%',
          }}
        /> */}
        <Typography sx={{ marginTop: '8px' }} align="center" fontSize={18}>
          Select Conversation
        </Typography>
      </Box>
    </Box>
  );
};
