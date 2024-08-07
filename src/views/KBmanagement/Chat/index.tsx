import { CircularProgress, IconButton, TextField, Button, Box } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { toast } from 'react-toastify';

import { Message } from './Message';

import { useOrganizationContext } from '/src/globalContexts/OrganizationContext';
import { sendMessage } from '/src/services/walleService';
import { ScrollBarStylesGenerator } from '/src/utils';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  setIsChatCreated: React.Dispatch<React.SetStateAction<boolean>>;
  suggestedMessages: string[] | [];
  chatId: string;
};

interface IMessage {
  created?: string;
  message: string;
  source: string;
}

const wrapperStyles = {
  boxShadow: `0px 0px 20px 1px ${Colors.simulacrumPrimary}`,
  border: `1px solid ${Colors.simulacrumPrimary + 50}`,
  backgroundColor: Colors.mainBackgroundColor,
  height: 'calc(100% - 32px)',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '16px',
  margin: '16px auto',
  display: 'flex',
  width: '75%',
};

const chatWindowStyles = {
  backgroundColor: Colors.rootBackgroundColor,
  borderRadius: '16px 16px 0 0',
  justifyContent: 'flex-start',
  height: 'calc(100% - 56px)',
  flexDirection: 'column',
  alignItems: 'center',
  display: 'flex',
  padding: '6px',
  width: '100%',
};

const sendMassageStyles = {
  backgroundColor: Colors.mainBackgroundColor,
  borderRadius: '0 0 16px 16px',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  width: '100%',
};

export const Chat = ({ suggestedMessages, setIsChatCreated, chatId }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = useState('');
  const listRef = useRef<HTMLInputElement>(null);
  const [conversation, setConversation] = useState<IMessage[] | []>([]);
  const [loading, setLoading] = useState(false);
  const {
    organizationInfo: { widgetKey },
  } = useOrganizationContext();

  const handleGoBack = () => {
    setIsChatCreated(false);
  };

  const handleSendMessage = () => {
    if (!message.trim() && !loading) {
      return;
    }
    setOutgoingMessage(message);
    setIncomingMessage(message);
    setMessage('');
    if (inputRef.current && inputRef.current.firstChild && inputRef.current.firstChild.firstChild) {
      (inputRef.current.firstChild.firstChild as HTMLElement).focus();
    }
  };

  const setOutgoingMessage = (message: string) => {
    const humanMessage = { source: 'human', message };
    setConversation([...conversation, humanMessage]);
  };

  const setIncomingMessage = async (message: string) => {
    setLoading(true);
    try {
      const {
        data: { ai_answer },
      } = await sendMessage({ widgetKey, message, chatId });

      setConversation([
        ...conversation,
        { message: message as string, source: 'human' },
        { message: ai_answer as string, source: 'ai' },
      ]);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLImageElement>): void => {
    if (e.key === 'Enter') {
      if (loading) {
        return;
      }
      handleSendMessage();
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.currentTarget.value);
  };

  const handleSuggestedMessageClick = (event: React.MouseEvent) => {
    const target = event.target as Element;
    if (!target.textContent) {
      return;
    }
    setOutgoingMessage(target.textContent);
    setIncomingMessage(target.textContent);
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
      <Box sx={wrapperStyles}>
        <Box sx={chatWindowStyles}>
          <Box
            sx={{
              ...ScrollBarStylesGenerator('80vh'),
              padding: '0 12px 0 6px',
              width: '100%',
            }}
            ref={listRef}
          >
            {!conversation.length &&
              suggestedMessages.map((suggestedMessage, index) => {
                return (
                  <Message
                    message={{ message: suggestedMessage, source: 'suggested' }}
                    handleSuggestedMessageClick={handleSuggestedMessageClick}
                    key={index}
                  />
                );
              })}

            {conversation.map(
              (message: { created?: string; message: string; source: string }, index: number) => {
                return <Message message={message} key={index} />;
              },
            )}
          </Box>
        </Box>
        <Box sx={sendMassageStyles}>
          <TextField
            sx={{ margin: '8px', width: '50%' }}
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            value={message}
            ref={inputRef}
            size="small"
            autoFocus
          />
          <Button
            endIcon={loading ? <CircularProgress sx={{ color: Colors.white }} size={18} /> : <SendIcon />}
            onClick={handleSendMessage}
            variant="contained"
            disabled={loading}
            color="primary"
          >
            Send
          </Button>
        </Box>
      </Box>
      <Box sx={{ position: 'absolute', left: '8px', top: '8px' }}>
        <IconButton onClick={handleGoBack}>
          <ArrowBackIcon />
        </IconButton>{' '}
        Go Back
      </Box>
    </>
  );
};
