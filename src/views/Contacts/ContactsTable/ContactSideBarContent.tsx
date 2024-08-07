/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Typography, Divider, Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';

import { ScrollBarStylesGenerator, stringCapitalize, generateValue } from '/src/utils';
import { Colors } from '/src/globalStyles/colors';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = { contactData: null | {} };

export const ContactSideBarContent = ({ contactData }: Props) => {
  return (
    <Box
      sx={{
        padding: ' 8px 16px 16px 16px',
        flexDirection: 'column',
        display: 'flex',
        height: '100%',
        width: '400px',
      }}
    >
      <Typography fontSize={22}>Contact Details</Typography>
      <Divider
        sx={{
          borderColor: `${Colors.white + 50}`,
          borderBottomWidth: '1px',
          margin: '10px 0 16px 0',
          width: '100%',
        }}
      />
      <Box
        sx={{
          ...ScrollBarStylesGenerator('calc(100% - 60px)'),
          flexDirection: 'column',
          display: 'flex',
          gap: '12px',
        }}
      >
        {/* @ts-ignore */}
        {contactData.standardFields &&
          //@ts-ignore
          contactData.standardFields
            //@ts-ignore
            .filter((field) => {
              return field.value !== null;
            })
            //@ts-ignore
            .map((prop, index) => {
              if (typeof prop.value === 'object') {
                return (
                  <Box
                    sx={{
                      backgroundColor: Colors.placeholderColor + 50,
                      flexDirection: 'column',
                      display: 'flex',
                      padding: '8px',
                    }}
                    key={index}
                  >
                    <Typography sx={{ color: Colors.simulacrumPrimary }} fontWeight={700} fontSize={18}>
                      {prop.label}
                    </Typography>
                    {/*@ts-ignore */}
                    {Object.keys(prop.value)
                      .filter((field) => {
                        return prop.value[field] !== null;
                      })
                      .map((nestedField) => {
                        return (
                          <Box
                            sx={{
                              flexDirection: 'column',
                              display: 'flex',
                            }}
                            key={uuidv4()}
                          >
                            <Typography fontWeight={700} fontSize={16}>
                              {stringCapitalize(nestedField)}
                            </Typography>
                            <Typography fontWeight={300} fontSize={12}>
                              {prop.value[nestedField]}
                            </Typography>
                          </Box>
                        );
                      })}
                  </Box>
                );
              }
              return (
                <Box
                  sx={{
                    flexDirection: 'column',
                    display: 'flex',
                  }}
                  key={uuidv4()}
                >
                  <Typography fontWeight={700} fontSize={16}>
                    {prop.label}
                  </Typography>
                  <Typography fontWeight={300} fontSize={12}>
                    {generateValue(prop)}
                  </Typography>
                </Box>
              );
            })}
        {/* @ts-ignore */}
        {contactData.customFields.length ? (
          <Typography
            sx={{
              backgroundColor: Colors.placeholderColor + 50,
              padding: '4px 8px',
            }}
            fontWeight={700}
            fontSize={18}
          >
            Custom Fields
          </Typography>
        ) : null}
        {/* @ts-ignore */}
        {contactData.customFields &&
          //@ts-ignore
          contactData.customFields
            //@ts-ignore
            .filter((field) => {
              return field.value !== null;
            })
            //@ts-ignore
            .map((prop, index) => {
              if (typeof prop.value === 'object') {
                return (
                  <Box
                    sx={{
                      backgroundColor: Colors.placeholderColor + 50,
                      flexDirection: 'column',
                      display: 'flex',
                      padding: '8px',
                    }}
                    key={index}
                  >
                    <Typography sx={{ color: Colors.simulacrumPrimary }} fontWeight={700} fontSize={18}>
                      {prop.label}
                    </Typography>
                    {/*@ts-ignore */}
                    {Object.keys(prop.value)
                      .filter((field) => {
                        return prop.value[field] !== null;
                      })
                      .map((nestedField) => {
                        return (
                          <Box
                            sx={{
                              flexDirection: 'column',
                              display: 'flex',
                            }}
                            key={uuidv4()}
                          >
                            <Typography fontWeight={700} fontSize={16}>
                              {stringCapitalize(nestedField)}
                            </Typography>
                            <Typography fontWeight={300} fontSize={12}>
                              {prop.value[nestedField]}
                            </Typography>
                          </Box>
                        );
                      })}
                  </Box>
                );
              }
              return (
                <Box
                  sx={{
                    flexDirection: 'column',
                    display: 'flex',
                  }}
                  key={uuidv4()}
                >
                  <Typography fontWeight={700} fontSize={16}>
                    {prop.label}
                  </Typography>
                  <Typography fontWeight={300} fontSize={12}>
                    {generateValue(prop)}
                  </Typography>
                </Box>
              );
            })}
      </Box>
    </Box>
  );
};
