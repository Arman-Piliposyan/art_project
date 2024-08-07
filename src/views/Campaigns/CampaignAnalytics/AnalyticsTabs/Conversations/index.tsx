import { CircularProgress, Typography, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ConversationsDataType, ConversationType, IMessage } from './types';
import { ConversationHistory } from './ConversationHistory';
import { ConversationsList } from './ConversationsList';

import { getSingleConversation, getConversations } from '/src/services/campaignService';
import { LayoutLoader } from '/src/common/components/UI-Components/LayoutLoader';
import { EmptyContent } from '/src/common/components/EmptyContent';
import { ScrollBarStylesGenerator } from '/src/utils';
import { Colors } from '/src/globalStyles/colors';

export const Conversations = () => {
  const { id } = useParams();

  const [isTabLoading, setIsTabLoading] = useState(true);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [conversationsData, setConversations] = useState<ConversationsDataType>(null);
  const [selectedConversation, setSelectedConversation] = useState<ConversationType | null>(null);
  const [selectedConversationHistory, setSelectedConversationHistory] = useState<IMessage[] | null>(null);

  useEffect(() => {
    if (!selectedConversation) {
      return;
    }
    (async () => {
      setIsContentLoading(true);
      try {
        const { data } = await getSingleConversation({
          conversationId: selectedConversation.id,
          campaignId: id as string,
        });
        setSelectedConversationHistory(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsContentLoading(false);
      }
    })();
  }, [selectedConversation]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getConversations(id as string);
        setConversations(data);
        setIsTabLoading(false);
      } catch (error) {
        console.error(error);
        toast.error('Fail');
      } finally {
        setIsTabLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {isTabLoading ? (
        <LayoutLoader height="250px" />
      ) : (
        <Box sx={{ display: 'flex', height: '100%', width: '100%', gap: '8px' }}>
          <Box
            sx={{
              backgroundColor: Colors.paperBackgroundColor,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '8px',
              display: 'flex',
              height: '100%',
              width: '80%',
            }}
          >
            <Box
              sx={{
                borderRight: `1px solid ${Colors.simulacrumPrimary}`,
                flexDirection: 'column',
                alignItems: 'start',
                display: 'flex',
                height: '100%',
                width: '300px',
                px: '16px',
              }}
            >
              <Box
                sx={{
                  borderBottom: `1px solid ${Colors.simulacrumPrimary}`,
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  height: '50px',
                  width: '100%',
                }}
              >
                <Typography fontWeight={500} align="center" fontSize={18}>
                  Conversations
                </Typography>
              </Box>
              <Box
                sx={{
                  ...ScrollBarStylesGenerator('calc(100% - 64px)'),
                  width: 'calc(100% - 4px)',
                  paddingRight: '0px',
                  marginTop: '6px',
                }}
              >
                <ConversationsList
                  setSelectedConversation={setSelectedConversation}
                  selectedConversation={selectedConversation}
                  conversationsData={conversationsData}
                />
              </Box>
            </Box>
            <Box
              sx={{
                width: 'calc(100% - 300px)',
                flexDirection: 'column',
                paddingX: '48px',
                display: 'flex',
                height: '100%',
              }}
            >
              <Box
                sx={{
                  borderBottom: `1px solid ${Colors.simulacrumPrimary}`,
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  height: '50px',
                  width: '100%',
                }}
              >
                <Typography fontWeight={500} align="center" fontSize={18}>
                  Conversation
                </Typography>
              </Box>

              <Box sx={{ height: 'calc(100% - 64px)' }}>
                {isContentLoading ? (
                  <Box
                    sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      height: '100%',
                      width: '100%',
                    }}
                  >
                    <CircularProgress sx={{ color: Colors.simulacrumPrimary }} size={30} />
                  </Box>
                ) : selectedConversationHistory && !selectedConversationHistory!.length ? (
                  <EmptyContent text="There is nothing to show" />
                ) : (
                  <ConversationHistory conversation={selectedConversationHistory} />
                )}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: Colors.paperBackgroundColor,
              borderRadius: '8px',
              height: '100% ',
              width: '20%',
              px: '16px',
            }}
          >
            <Box
              sx={{
                borderBottom: `1px solid ${Colors.simulacrumPrimary}`,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                height: '50px',
                width: '100%',
              }}
            >
              <Typography fontWeight={500} align="center" fontSize={18}>
                Train Center
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
