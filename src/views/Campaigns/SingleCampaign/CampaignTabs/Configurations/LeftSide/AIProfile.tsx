import { Typography, TextField, Tooltip, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import React, { useState } from 'react';

import { PhoneInput } from '/src/common/components/UI-Components/PhoneInput';
import { useCampaignsContext } from '/src/views/Campaigns/CampaignsContext';
import { useDebouncedValue } from '/src/hooks/useDebounce';
import { useDidUpdate } from '/src/hooks/useDidUpdate';
import { Colors } from '/src/globalStyles/colors';

export const AIProfile = () => {
  const { setSingleCampaignData, singleCampaignData } = useCampaignsContext();

  const [aiName, setAiName] = useState<string>(singleCampaignData.step2.aiName);
  const [aiPosition, setAiPosition] = useState<string>(singleCampaignData.step2.aiPosition);
  const [aiCompanyName, setAiCompanyName] = useState<string>(singleCampaignData.step2.aiCompanyName);
  const [aiCompanyPhone, setAiCompanyPhone] = useState<string>(singleCampaignData.step2.aiCompanyPhone);
  const [aiCompanyEmail, setAiCompanyEmail] = useState<string>(singleCampaignData.step2.aiCompanyEmail);
  const [aiCompanyIndustry, setAiCompanyIndustry] = useState<string>(
    singleCampaignData.step2.aiCompanyIndustry,
  );

  const debouncedAiName = useDebouncedValue(aiName);
  const debouncedAiPosition = useDebouncedValue(aiPosition);
  const debouncedAiCompanyName = useDebouncedValue(aiCompanyName);
  const debouncedAiCompanyPhone = useDebouncedValue(aiCompanyPhone);
  const debouncedAiCompanyEmail = useDebouncedValue(aiCompanyIndustry);
  const debouncedAiCompanyIndustry = useDebouncedValue(aiCompanyEmail);

  const handleChangeAiCompanyPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAiCompanyPhone(event.target.value);
  };

  const handleChangeAiCompanyEmail = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setAiCompanyEmail(event.target.value);
  };

  const handleChangeAiPosition = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setAiPosition(event.target.value);
  };

  const handleChangeAiName = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setAiName(event.target.value);
  };

  const handleChangeAiCompanyName = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setAiCompanyName(event.target.value);
  };

  const handleChangeAiCompanyIndustry = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setAiCompanyIndustry(event.target.value);
  };

  useDidUpdate(() => {
    setSingleCampaignData({
      ...singleCampaignData,
      step2: { ...singleCampaignData.step2, aiCompanyPhone },
    });
  }, [debouncedAiCompanyPhone]);

  useDidUpdate(() => {
    setSingleCampaignData({
      ...singleCampaignData,
      step2: { ...singleCampaignData.step2, aiCompanyEmail },
    });
  }, [debouncedAiCompanyEmail]);

  useDidUpdate(() => {
    setSingleCampaignData({
      ...singleCampaignData,
      step2: { ...singleCampaignData.step2, aiPosition },
    });
  }, [debouncedAiPosition]);

  useDidUpdate(() => {
    setSingleCampaignData({
      ...singleCampaignData,
      step2: { ...singleCampaignData.step2, aiName },
    });
  }, [debouncedAiName]);

  useDidUpdate(() => {
    setSingleCampaignData({
      ...singleCampaignData,
      step2: { ...singleCampaignData.step2, aiCompanyName },
    });
  }, [debouncedAiCompanyName]);

  useDidUpdate(() => {
    setSingleCampaignData({
      ...singleCampaignData,
      step2: { ...singleCampaignData.step2, aiCompanyIndustry },
    });
  }, [debouncedAiCompanyIndustry]);

  return (
    <Box
      sx={{
        boxShadow: '0px 0px 6px -3px rgba(0, 0, 0, 0.25)',
        backgroundColor: 'white',
        flexDirection: 'column',
        padding: '24px 16px',
        borderRadius: '6px',
        display: 'flex',
        width: '100%',
        gap: '8px',
      }}
    >
      <Box sx={{ alignItems: 'center', display: 'flex' }}>
        <Typography sx={{ color: Colors.titleColor }} fontWeight={700}>
          AI Profile
        </Typography>
        <Tooltip title={'Description'}>
          <InfoIcon sx={{ color: Colors.titleColor, fontSize: '16px', ml: '8px' }} />
        </Tooltip>
      </Box>
      <Typography sx={{ color: Colors.titleColor, mb: '12px' }} fontSize={14}>
        Select a channel for your outreach messages.
      </Typography>
      <Typography sx={{ mt: '16px' }} fontSize={14}>
        Company Details
      </Typography>
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <TextField
          onChange={handleChangeAiCompanyName}
          label="Company Name *"
          value={aiCompanyName}
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          onChange={handleChangeAiCompanyIndustry}
          value={aiCompanyIndustry}
          label="Industry *"
          variant="outlined"
          size="small"
          fullWidth
        />
      </Box>

      <Typography sx={{ mt: '32px' }} fontSize={14}>
        Your Details
      </Typography>
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <TextField
          onChange={handleChangeAiName}
          label="Your Name *"
          variant="outlined"
          value={aiName}
          size="small"
          fullWidth
        />
        <TextField
          onChange={handleChangeAiPosition}
          label="Your Position *"
          value={aiPosition}
          variant="outlined"
          size="small"
          fullWidth
        />
      </Box>

      <Typography sx={{ mt: '32px' }} fontSize={14}>
        Contact Information
      </Typography>
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <TextField
          onChange={handleChangeAiCompanyEmail}
          label="Email Address *"
          value={aiCompanyEmail}
          variant="outlined"
          size="small"
          fullWidth
        />
        <PhoneInput
          onChange={handleChangeAiCompanyPhone}
          value={aiCompanyPhone}
          label="Phone Number"
          size="small"
        />
      </Box>
    </Box>
  );
};
