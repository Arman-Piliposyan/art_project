import { CircularProgress, Typography, IconButton, Box } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate, useParams } from 'react-router-dom';
import ReplayIcon from '@mui/icons-material/Replay';
import React, { useEffect, useState } from 'react';

import { ConversationsDataType, ConversationType, IMessage } from './types';
import { ConversationMessages } from './ConversationMessages';
import { ConversationsList } from './ConversationsList';
import { TrainSection } from './TrainSection';

import { getSingleConversation } from '/src/services/campaignService';
import { EmptyContent } from '/src/common/components/EmptyContent';
import { getPlayGroundData } from '/src/services/walleService';
import { ScrollBarStylesGenerator } from '/src/utils';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  setConversationsData: React.Dispatch<React.SetStateAction<ConversationsDataType>>;
  conversationsData: ConversationsDataType;
};

export const Conversations = ({ setConversationsData, conversationsData }: Props) => {
  const { id } = useParams();
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  const [selectedConversation, setSelectedConversation] = useState<ConversationType | null>(null);
  const [selectedConversationHistory, setSelectedConversationHistory] = useState<IMessage[] | null>(null);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

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

        const findSelectedConversationIndex = conversationsData![
          selectedConversation.groupIndex as number
        ].conversations.findIndex((conversation: ConversationType) => {
          return conversation.id === selectedConversation?.id;
        });

        setConversationsData((prev: ConversationsDataType) => {
          return [
            ...prev!.slice(0, selectedConversation.groupIndex),
            {
              ...prev![selectedConversation.groupIndex!],
              conversations: [
                ...prev![selectedConversation.groupIndex!].conversations.slice(
                  0,
                  findSelectedConversationIndex,
                ),
                {
                  ...prev![selectedConversation.groupIndex!].conversations[findSelectedConversationIndex],
                  hasUnseenMessage: false,
                },
                ...prev![selectedConversation.groupIndex!].conversations.slice(
                  findSelectedConversationIndex + 1,
                ),
              ],
            },
            ...prev!.slice(selectedConversation.groupIndex! + 1),
          ];
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsContentLoading(false);
      }
    })();
  }, [selectedConversation, isRefresh]);

  const handleRefresh = async () => {
    setIsRefresh(true);
    try {
      const { data } = await getPlayGroundData(id!);
      setConversationsData(data);
      setIsRefresh(false);
    } catch (error) {
      console.error(error);
      setIsRefresh(false);
    }
  };

  return (
    <>
      <Box sx={{ alignItems: 'center', display: 'flex', gap: '2px', mb: '8px' }}>
        <IconButton
          sx={{
            '&:hover': {
              backgroundColor: Colors.inputBorder + 50,
              color: Colors.simulacrumPrimary,
            },
            transition: 'all 0.3s',
            color: Colors.black,
          }}
          onClick={handleGoBack}
        >
          <ChevronLeftIcon fontSize="small" color="inherit" />
        </IconButton>
        <Typography fontWeight={500}>Go Back</Typography>
      </Box>

      <Box sx={{ height: 'calc(100% - 44px)', display: 'flex', width: '100%', gap: '8px' }}>
        <Box
          sx={{
            backgroundColor: Colors.paperBackgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
            display: 'flex',
            height: '100%',
            width: '75%',
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
              px: '8px',
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
              <IconButton
                sx={{
                  color: Colors.simulacrumPrimary,
                  backgroundColor: 'white',
                  borderRadius: '6px',
                  ml: '16px',
                  p: '4px',
                }}
                onClick={handleRefresh}
                size="small"
              >
                <ReplayIcon sx={{ height: '18px', width: '18px' }} />
              </IconButton>
            </Box>
            <Box
              sx={{
                ...ScrollBarStylesGenerator('calc(100% - 64px)'),
                width: 'calc(100% - 4px)',
                position: 'relative',
                paddingRight: '0px',
                marginTop: '6px',
              }}
            >
              {isRefresh && (
                <Box
                  sx={{
                    backgroundColor: Colors.white + 90,
                    justifyContent: 'center',
                    position: 'absolute',
                    alignItems: 'center',
                    borderRadius: '6px',
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    zIndex: '10',
                  }}
                >
                  <CircularProgress sx={{ color: Colors.simulacrumPrimary }} size={30} />
                </Box>
              )}

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
              paddingX: '8px',
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

            <Box sx={{ height: 'calc(100% - 52px)' }}>
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
                <ConversationMessages
                  setSelectedConversationHistory={setSelectedConversationHistory}
                  selectedConversation={selectedConversation}
                  conversation={selectedConversationHistory}
                />
              )}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: Colors.paperBackgroundColor,
            borderRadius: '8px',
            height: '100% ',
            width: '25%',
            px: '8px',
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
          {selectedConversation && <TrainSection selectedConversation={selectedConversation} />}
        </Box>
      </Box>
    </>
  );
};
