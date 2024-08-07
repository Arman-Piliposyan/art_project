import { Typography, Grid, Box } from '@mui/material';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';

import { animationJson } from './animation';

import { Colors } from '/src/globalStyles/colors';
import { SimulacrumLogoAuth } from '/src/assets';

type Props = {
  form: ReactElement;
};

const AuthContentStyles = {
  '@media (max-width: 900px)': {
    flexWrap: 'wrap',
    height: '125vh',
  },
  justifyContent: 'space-around',
  alignItems: 'center',
  position: 'relative',
  overflow: 'auto',
  display: 'flex',
  height: '100vh',
  width: '100%',
};

export const AuthContent = ({ form }: Props) => {
  return (
    <Box sx={AuthContentStyles}>
      <Box
        sx={{
          '@media (max-width: 900px)': {
            width: '100%',
            height: '50%',
            top: '0',
          },
          backgroundColor: Colors.white,
          position: 'absolute',
          height: '100%',
          width: '50%',
          zIndex: '-1',
          left: '0px',
        }}
      ></Box>
      <Box
        sx={{
          '@media (max-width: 900px)': {
            width: '100%',
            height: '50%',
            bottom: '0',
          },
          background: `linear-gradient(46.86deg, ${Colors.simulacrumPrimary} 56.5%, ${Colors.authContentBackgroundColor} 136.14%)`,
          position: 'absolute',
          height: '100%',
          width: '50%',
          right: '0px',
          zIndex: '-1',
        }}
      ></Box>
      <Grid spacing={2} container xs={11} xl={4} lg={4} md={5} sm={8} item>
        <Box
          sx={{
            '@media (max-width: 900px)': {
              top: '20px',
            },
            position: 'absolute',
            marginLeft: '16px',
            cursor: 'pointer',
            top: '50px',
          }}
        >
          <Link to="https://simulacrumai.com/">
            <SimulacrumLogoAuth />
          </Link>
        </Box>
        {form}
      </Grid>
      <Grid
        justifyContent={'center'}
        flexDirection={'column'}
        alignItems={'center'}
        spacing={2}
        container
        xs={11}
        lg={4}
        md={5}
        sm={8}
        item
      >
        <Grid lg={12} item>
          <Lottie
            style={{
              height: 250,
            }}
            animationData={animationJson}
            width={350}
          />
        </Grid>
        <Grid lg={12} item>
          <Typography
            sx={{
              '@media (max-width: 900px)': {
                fontSize: '14px',
              },
              '@media (max-width: 389px)': {
                fontSize: '10px',
              },
              color: Colors.white,
              fontWeight: '400',
              fontSize: '22px',
            }}
            textAlign={'center'}
          >
            AI-based advanced chat widget trained on your own data, designed to enhance customer interactions
            in your environment.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
