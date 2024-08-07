import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { format } from 'date-fns';
import React from 'react';

// import { AiLoading } from '/src/common/components/AiLoading';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  message: { createdAt?: string; message: string; source: string };
  handleSuggestedMessageClick?: (event: React.MouseEvent) => void;
};

const itemStyle = { display: 'flex', margin: '8px 0', width: '100%' };

export const Message = ({ handleSuggestedMessageClick, message }: Props) => {
  const messageSide = message.source === 'human' ? 'flex-end' : 'flex-start';

  const messageStyles =
    message.source === 'human'
      ? {
          borderRadius: '20px 20px 0px 20px',
          backgroundColor: Colors.white,
          width: '260px',
        }
      : {
          borderRadius: '20px 20px 20px 0px',
          backgroundColor: Colors.white,
          width: '260px',
        };

  const messageSourceStyles =
    message.source === 'human'
      ? {
          textAlign: 'left',
        }
      : {
          textAlign: 'right',
        };

  return (
    <Box sx={{ ...itemStyle, justifyContent: messageSide }}>
      <Box
        onClick={
          message.source === 'suggested'
            ? handleSuggestedMessageClick
            : // eslint-disable-next-line @typescript-eslint/no-empty-function
              () => {}
        }
        sx={{
          ...messageStyles,
          flexDirection: 'column',
          transition: 'all 0.3s',
          padding: '2px 16px',
          display: 'flex',
        }}
      >
        <Typography
          sx={{
            wordBreak: 'break-word',
            marginBottom: '8px',
            lineHeight: '18px',
            textAlign: 'left',
            paddingTop: '4px',
            fontSize: '14px',
          }}
        >
          <span style={{ alignItems: 'center', display: 'flex' }}>{message.message}</span>
        </Typography>
        <Box
          sx={{
            flexDirection: `${message.source === 'human' ? 'row-reverse' : ''}`,
            justifyContent: 'space-between',
            display: 'flex',
          }}
        >
          <Typography
            sx={{
              ...messageSourceStyles,
              fontSize: '10px',
            }}
          >
            {message.source === 'human' ? 'Human' : 'AI'}
          </Typography>
          {message.createdAt && (
            <Typography sx={{ fontSize: '8px' }}>
              {format(new Date(message.createdAt), 'MM/dd/yyyy HH:mm')}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};
