import NearMeIcon from '@mui/icons-material/NearMe';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { format } from 'date-fns';
import React from 'react';

import { AiLoading } from '/src/common/components/AiLoading';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  message: { createdAt?: string; message: string; source: string };
  handleSuggestedMessageClick?: (event: React.MouseEvent) => void;
};

const itemStyle = { display: 'flex', margin: '8px 0', width: '100%' };

export const Message = ({ handleSuggestedMessageClick, message }: Props) => {
  const messageSide =
    message.source === 'human' || message.source === 'suggested' ? 'flex-end' : 'flex-start';

  const messageStyles =
    message.source === 'human'
      ? {
          backgroundColor: Colors.simulacrumPrimary,
          borderRadius: '20px 20px 0px 20px',
          width: '260px',
        }
      : message.source === 'suggested'
      ? {
          '&:hover': {
            '& p': {
              color: Colors.simulacrumPrimary,
            },
            backgroundColor: Colors.white,
          },
          '& p': {
            padding: '6px 12px',
            margin: '0px',
          },
          backgroundColor: Colors.simulacrumPrimary,
          borderRadius: '20px 20px 20px 20px',
          cursor: 'pointer',
        }
      : {
          backgroundColor: Colors.simulacrumSecondary,
          borderRadius: '20px 20px 20px 0px',
          width: '260px',
        };

  const messageSourceStyles =
    message.source === 'human' || message.source === 'suggested'
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
          {message.source !== 'human' && message.source !== 'suggested' ? (
            <AiLoading message={message.message} />
          ) : (
            <span style={{ alignItems: 'center', display: 'flex' }}>
              {message.message}
              {message.source === 'suggested' && <NearMeIcon sx={{ marginLeft: '8px' }} />}
            </span>
          )}
        </Typography>

        {message.source !== 'suggested' && (
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
              {message.source === 'human' ? 'You' : message.source}
            </Typography>
            {message.createdAt && (
              <Typography sx={{ fontSize: '8px' }}>
                {format(new Date(message.createdAt), 'MM/dd/yyyy HH:mm')}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
