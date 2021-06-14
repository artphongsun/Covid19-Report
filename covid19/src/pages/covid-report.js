import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Box } from '../components/box';
import { List } from '../components/list';
import { Input, Card, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';

export const CovidReport = () => {
  const [data, setData] = useState({});
  const [filteredData, setFilteredData] = useState();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://api.covid19api.com/summary`);
      setData({
        ...response.data,
        Countries: response?.data?.Countries?.map((item) => ({
          ...item,
          key: item.ID,
          TotalConfirmedCleaned: item.TotalConfirmed || 'unreported',
          TotalDeathsCleaned: item.TotalDeaths || 'unreported',
          TotalRecoveredCleaned: item.TotalRecovered || 'unreported',
        })),
      });
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(data?.Countries?.filter((item) => item.Country.toLowerCase().includes(search.toLowerCase())));
  }, [search, data]);

  return (
    <Root>
      <StyledCard title={<strong>COVID-19 PANDEMIC</strong>} bordered>
        {loading ? (
          <StyledSpin tip='Loading...' size='large' />
        ) : (
          <>
            <SummaryContainer>
              <Box header='Total Cases' color='#808080' content={data.Global.TotalConfirmed} />
              <Box header='Total Deaths' color='#FF0000' content={data.Global.TotalDeaths} />
              <Box header='Total Recovered' color='#8ACA2B' content={data.Global.TotalRecovered} />
            </SummaryContainer>
            <DateContainer>
              <strong>Last Updated: </strong>
              <Date>{moment(data?.Global?.Date).format('MMMM Do YYYY, h:mm:ss a')}</Date>
            </DateContainer>
            <StyledInput placeholder='Search Country' prefix={<SearchOutlined />} onChange={(e) => setSearch(e.target.value)} />
            <List filteredData={filteredData} />
          </>
        )}
      </StyledCard>
    </Root>
  );
};

const Root = styled.div`
  padding: 40px 50px;
  height: 100%;
  background-color: #ececec;
  @media (max-width: 600px) {
    padding: 0;
    background: #ffffff;
  }
`;

const StyledCard = styled(Card)`
  box-shadow: 0 1px 5px rgb(0 0 0 / 10%);
  border-radius: 25px;
  @media (max-width: 640px) {
    box-shadow: 0;
    border-radius: 0;
    overflow-x: hidden;
    .ant-card-bordered {
      border: none;
    }
    .ant-table-pagination-right {
      justify-content: flex-start;
      flex-wrap: nowrap;
    }
  }
`;

const SummaryContainer = styled.div`
  font-size: 25px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const DateContainer = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

const Date = styled.span`
  @media (max-width: 375px) {
    word-wrap: break-word;
    display: block;
  }
`;

const StyledInput = styled(Input)`
  margin-bottom: 20px;
`;

const StyledSpin = styled(Spin)`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;
