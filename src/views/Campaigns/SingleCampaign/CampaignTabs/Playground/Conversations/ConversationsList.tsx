import { Typography, Avatar, Box } from '@mui/material';
import { format } from 'date-fns';
import React from 'react';

import { ConversationsDataType, ConversationType } from './types';

import { Colors } from '/src/globalStyles/colors';

const notificationStyles = {
  backgroundColor: Colors.invalidRed,
  position: 'absolute',
  borderRadius: '4px',
  padding: '0px 2px',
  fontSize: '6px',
  color: 'white',
  right: '4px',
  top: '4px',
} as React.CSSProperties;

type Props = {
  setSelectedConversation: React.Dispatch<React.SetStateAction<ConversationType | null>>;
  selectedConversation: ConversationType | null;
  conversationsData: ConversationsDataType;
};

export const ConversationsList = ({
  setSelectedConversation,
  selectedConversation,
  conversationsData,
}: Props) => {
  const generateUserName = (userData: { firstName: string; lastName: string; phone: string }) => {
    return userData.firstName
      ? userData.firstName + ' ' + userData.lastName || ''
      : userData.lastName || userData.phone;
  };

  return (
    <Box sx={{ flexDirection: 'column', display: 'flex', gap: '32px', pt: '6px' }}>
      {conversationsData?.map((conversationGroup, index) => {
        return (
          <Box key={conversationGroup.groupDate}>
            <Typography fontSize={12}>
              {index === 0 &&
              format(new Date(), 'MM/dd/yyyy') === format(new Date(conversationGroup.groupDate), 'MM/dd/yyyy')
                ? 'Today'
                : format(new Date(conversationGroup.groupDate), 'MM/dd/yyyy')}
            </Typography>
            <Box
              sx={{
                flexDirection: 'column',
                marginTop: '16px',
                display: 'flex',
                gap: '4px',
              }}
            >
              {conversationGroup.conversations.map((conversation) => {
                return (
                  <Box
                    sx={{
                      '&: hover': {
                        backgroundColor:
                          selectedConversation && selectedConversation.id === conversation.id
                            ? ''
                            : Colors.simulacrumPrimary + 50,
                      },
                      backgroundColor:
                        selectedConversation && selectedConversation.id === conversation.id
                          ? Colors.white
                          : '',
                      width: 'calc(100% - 8px)',
                      transition: 'all 0.3s',
                      alignItems: 'center',
                      position: 'relative',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      padding: '8px',
                      gap: '8px',
                    }}
                    onClick={() => {
                      setSelectedConversation({ ...conversation, groupIndex: index });
                    }}
                    key={conversation.id}
                  >
                    <Avatar
                      sx={{
                        color: Colors.black,
                        bgcolor: '#FFE6CC',
                        fontSize: '18px',
                        height: 32,
                        width: 32,
                      }}
                    ></Avatar>
                    <Box
                      sx={{
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontWeight: '400px',
                        overflow: 'hidden',
                        fontSize: '16px',
                        width: '300px',
                      }}
                    >
                      {generateUserName(conversation.userData)}
                    </Box>
                    {conversation.hasUnseenMessage && <span style={notificationStyles}>new</span>}
                  </Box>
                );
              })}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
