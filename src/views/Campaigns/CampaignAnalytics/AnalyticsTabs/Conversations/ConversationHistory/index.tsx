import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

import { NoConversationSelect } from '../NoChatSelect';
import { Message } from './Message';
import { IMessage } from '../types';

import { ScrollBarStylesGenerator } from '/src/utils';

type Props = {
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
  height: 'calc(100% - 12px)',
  flexDirection: 'column',
  alignItems: 'center',
  display: 'flex',
  padding: '6px',
  width: '100%',
};

export const ConversationHistory = ({ conversation }: Props) => {
  const listRef = useRef<HTMLInputElement>(null);

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
        </Box>
      ) : (
        <NoConversationSelect />
      )}
    </>
  );
};
