import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import StepButton from '@mui/material/StepButton';
import Stepper from '@mui/material/Stepper';
import { keyframes } from '@emotion/react';
import Step from '@mui/material/Step';
import Box from '@mui/material/Box';

import { Colors } from '/src/globalStyles/colors';

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0px #00B1E580;
  }
  100% {
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }
`;

const steps = [
  { stepName: 'Import Contacts', stepLink: '/contacts' },
  { stepName: 'Create Segment', stepLink: '/segments' },
  { stepLink: '/integration', stepName: 'Integration' },
  { stepName: 'Create Campaign', stepLink: '/campaigns' },
  { stepName: 'Knowledge Base', stepLink: '/kb-management' },
];

export const NavigationStepper = () => {
  const location = useLocation();
  const findLocationIndex = steps.findIndex((step) => step.stepLink === location.pathname);
  const [activeStep, setActiveStep] = useState(100);
  const navigate = useNavigate();

  const handleStep = (step: number, link: string) => () => {
    setActiveStep(step);
    navigate(link);
  };
  useEffect(() => {
    if (findLocationIndex === -1) {
      setActiveStep(100);
      return;
    }
    setActiveStep(findLocationIndex);
  }, [location.pathname]);

  return (
    <Box sx={{ width: '85%' }}>
      <Stepper activeStep={activeStep} nonLinear>
        {steps.map((step, index) => (
          <Step
            sx={{
              '& .MuiStepIcon-root.Mui-active': {
                '.MuiStepIcon-text': {
                  fill: Colors.paperBackgroundColor,
                },
                animation: `${pulseAnimation} 2s infinite`,
                borderRadius: '50%',
              },
              '& .MuiStepIcon-root': {
                color: Colors.paperBackgroundColor,
              },
            }}
            key={step.stepName}
          >
            <StepButton onClick={handleStep(index, step.stepLink)}>{step.stepName}</StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
