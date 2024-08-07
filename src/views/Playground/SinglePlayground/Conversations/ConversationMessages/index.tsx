import { CircularProgress, TextField, Button, Box } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { toast } from 'react-toastify';

import { NoConversationSelect } from '../NoChatSelect';
import { ConversationType, IMessage } from '../types';
import { Message } from './Message';

import { sendPlaygroundMessage } from '/src/services/walleService';
import { ScrollBarStylesGenerator } from '/src/utils';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  setSelectedConversationHistory: React.Dispatch<React.SetStateAction<IMessage[] | null>>;
  selectedConversation: ConversationType | null;
  conversation: IMessage[] | null | [];
};

const wrapperStyles = {
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '16px',
  display: 'flex',
  height: '100%',
  width: '100%',
};

const chatWindowStyles = {
  justifyContent: 'flex-start',
  height: 'calc(100% - 50px)',
  flexDirection: 'column',
  alignItems: 'center',
  display: 'flex',
  padding: '8px',
  width: '100%',
};

export const ConversationMessages = ({
  setSelectedConversationHistory,
  selectedConversation,
  conversation,
}: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const listRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef(null);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserMessage(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.stopPropagation();
      event.preventDefault();
      event.currentTarget.style.height = 'auto';
      if (isLoading) {
        return;
      }
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) {
      return;
    }
    setLoading(true);
    try {
      sendPlaygroundMessage({
        conversationId: selectedConversation!.id,
        message: userMessage,
      });
      setSelectedConversationHistory([
        ...conversation!,
        {
          message: userMessage,
          source: 'human',
        },
      ]);
      setUserMessage('');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      if (inputRef.current && inputRef.current.firstChild && inputRef.current.firstChild.firstChild) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        inputRef.current.firstChild.firstChild.focus();
      }
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!listRef.current) {
      return;
    }
    listRef.current.scrollTo({
      behavior: 'smooth',
      top: 20000,
    });
  }, [conversation]);

  return (
    <>
      {conversation ? (
        <Box sx={wrapperStyles}>
          <Box sx={chatWindowStyles}>
            <Box
              sx={{
                ...ScrollBarStylesGenerator('100%'),
                padding: '0 12px 0 6px',
                width: '100%',
              }}
              ref={listRef}
            >
              {conversation.map(
                (
                  message: {
                    created?: string;
                    message: string;
                    source: string;
                  },
                  index: number,
                ) => {
                  return <Message message={message} key={index} />;
                },
              )}
            </Box>
          </Box>
          <Box
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              width: '100%',
            }}
          >
            <TextField
              sx={{ width: 'calc(100% - 80px)', margin: '8px', mb: '10px' }}
              onChange={handleMessageChange}
              onKeyDown={handleKeyDown}
              value={userMessage}
              autoComplete="off"
              ref={inputRef}
              size="small"
              autoFocus
            />
            <Button
              endIcon={isLoading ? <CircularProgress sx={{ color: Colors.white }} size={18} /> : <SendIcon />}
              onClick={handleSendMessage}
              sx={{ height: '40px' }}
              disabled={isLoading}
              variant="contained"
              color="primary"
            >
              Send
            </Button>
          </Box>
        </Box>
      ) : (
        <NoConversationSelect />
      )}
    </>
  );
};
