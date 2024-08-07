import { AccordionSummary, AccordionDetails, Typography, Accordion, Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';

import { Proportion } from './Proportion';
import { Reflection } from './Reflection';
import { Material } from './Material';

import { ScrollBarStylesGenerator } from '/src/utils';
import { Colors } from '/src/globalStyles/colors';

export const AccordionSection = () => {
  return (
    <Box sx={{ mt: '16px', ...ScrollBarStylesGenerator('calc(100% - 190px)') }}>
      <Accordion
        sx={{
          backgroundColor: Colors.paperBackgroundColor,
          borderBottom: '2px solid white',
          borderRadius: '0px !important',
          borderTop: '2px solid white',
          boxShadow: 'none',
        }}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDownIcon sx={{ color: Colors.colorPrimary }} />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Material of signage</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Material />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          backgroundColor: Colors.paperBackgroundColor,
          borderBottom: '2px solid white',
          borderRadius: '0px !important',
          borderTop: '2px solid white',
          boxShadow: 'none',
        }}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDownIcon sx={{ color: Colors.colorPrimary }} />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Choose the proportion and color of the sign</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Proportion />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          backgroundColor: Colors.paperBackgroundColor,
          borderBottom: '2px solid white',
          borderRadius: '0px !important',
          borderTop: '2px solid white',
          boxShadow: 'none',
        }}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDownIcon sx={{ color: Colors.colorPrimary }} />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography>Choose type of reflection and size</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Reflection />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          backgroundColor: Colors.paperBackgroundColor,
          borderBottom: '2px solid white',
          borderRadius: '0px !important',
          borderTop: '2px solid white',
          boxShadow: 'none',
        }}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDownIcon sx={{ color: Colors.colorPrimary }} />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          <Typography>Choose layout</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet
            blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
