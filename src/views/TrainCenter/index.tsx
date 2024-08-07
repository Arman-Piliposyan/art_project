import React, { useEffect, useState } from 'react';
import { Pagination, Box } from '@mui/material';
import { toast } from 'react-toastify';

import { UploadFileModalContent } from './UploadFileModalContent';
import { TrainCenterContent } from './TrainCenterContent';
import { TrainCenterHeader } from './TrainCenterHeader';
import { TrainModalContent } from './TrainModalContent';
import { TrainDataType, TrainItemType } from './type';

import { LayoutLoader } from '/src/common/components/UI-Components/LayoutLoader';
import { CommonModal } from '/src/common/components/UI-Components/CommonModal';
import { getCampaignsOptions, getTrainData } from '/src/services/walleService';
import { EmptyContent } from '/src/common/components/EmptyContent';
import { useDebouncedValue } from '/src/hooks/useDebounce';
import { useDidUpdate } from '/src/hooks/useDidUpdate';
import { Colors } from '/src/globalStyles/colors';

export type OptionsType = { value: string; label: string };

const TrainCenter = () => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isUploadFile, setIsUploadFile] = useState(true);
  const [isTrainsChanged, setIsTrainsChanged] = useState(false);
  const [trainsData, setTrainsData] = useState<TrainDataType | null>(null);
  const [isLoadingGetCampaigns, setIsLoadingGetCampaigns] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState<TrainItemType | null>(null);
  const [campaignsOptions, setCampaignsOptions] = useState<OptionsType[] | []>();
  const [filterBy, setFilterBy] = useState<'organization' | 'campaign' | 'all'>('all');

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getTrains = async () => {
    setIsLoading(true);
    try {
      const { data } = await getTrainData({
        content: searchValue,
        filterBy: filterBy,
        page: page,
      });
      setPage(data.currentPage);
      setTrainsData(data);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedPage = useDebouncedValue(page);
  const debouncedSearchValue = useDebouncedValue(searchValue);

  useDidUpdate(() => {
    (async () => {
      if (page === 1) {
        await getTrains();
        return;
      }
      setPage(1);
    })();
  }, [filterBy, debouncedSearchValue]);

  useEffect(() => {
    (async () => {
      await getTrains();
    })();
  }, [debouncedPage]);

  useEffect(() => {
    if (!isTrainsChanged) {
      return;
    }
    (async () => {
      await getTrains();
      setIsTrainsChanged(false);
    })();
  }, [isTrainsChanged]);

  useEffect(() => {
    if (!openModal) {
      setIsUploadFile(false);
      setSelectedTrain(null);
      return;
    }
    (async () => {
      setIsLoadingGetCampaigns(true);
      try {
        const { data } = await getCampaignsOptions();
        setCampaignsOptions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingGetCampaigns(false);
      }
    })();
  }, [openModal]);

  return (
    <>
      <Box
        sx={{
          justifyContent: 'space-between',
          flexDirection: 'column',
          display: 'flex',
          height: '100%',
          gap: '16px',
          p: '8px',
        }}
      >
        <TrainCenterHeader
          isLoadingGetCampaigns={isLoadingGetCampaigns}
          setIsUploadFile={setIsUploadFile}
          setSearchValue={setSearchValue}
          setOpenModal={setOpenModal}
          setFilterBy={setFilterBy}
          searchValue={searchValue}
          filterBy={filterBy}
        />
        {isLoading ? (
          <LayoutLoader />
        ) : !trainsData?.data.length ? (
          <EmptyContent text="There is nothing to show" />
        ) : (
          <TrainCenterContent
            setIsTrainsChanged={setIsTrainsChanged}
            setSelectedTrain={setSelectedTrain}
            trainsData={trainsData?.data}
            setOpenModal={setOpenModal}
          />
        )}
        <Box
          sx={{
            backgroundColor: Colors.white + 15,
            padding: '4px 4px 8px 8px',
            justifyContent: 'flex-end',
            display: 'flex',
            width: '100%',
          }}
        >
          <Pagination
            count={trainsData?.totalPages}
            onChange={handleChange}
            variant="outlined"
            boundaryCount={2}
            siblingCount={0}
            showFirstButton
            color="primary"
            shape="rounded"
            showLastButton
            size="small"
            page={page}
          />
        </Box>
      </Box>
      {!isLoadingGetCampaigns && openModal && (
        <CommonModal
          modalContent={
            isUploadFile ? (
              <UploadFileModalContent
                setIsTrainsChanged={setIsTrainsChanged}
                campaignsOptions={campaignsOptions}
                setOpenModal={setOpenModal}
              />
            ) : (
              <TrainModalContent
                setIsTrainsChanged={setIsTrainsChanged}
                campaignsOptions={campaignsOptions}
                selectedTrain={selectedTrain}
                setOpenModal={setOpenModal}
              />
            )
          }
          height={isUploadFile ? '75vh' : 'max-content'}
          padding={isUploadFile ? '16px' : '0'}
          setOpenModal={setOpenModal}
          open={openModal}
          width="800px"
        />
      )}
    </>
  );
};

export default TrainCenter;
