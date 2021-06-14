import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Box } from '../components/box';
import { List } from '../components/list';
import { Input, Card } from 'antd';
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
        Countries: response.data.Countries.map((item) => ({
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
      {loading ? (
        ''
      ) : (
        <StyledCard title={<strong>COVID-19 PANDEMIC</strong>} bordered>
          <SummaryContainer>
            <Box header='Total Cases' color='gray' content={data.Global.TotalConfirmed} />
            <Box header='Total Deaths' color='red' content={data.Global.TotalDeaths} />
            <Box header='Total Recovered' color='#8ACA2B' content={data.Global.TotalRecovered} />
          </SummaryContainer>
          <TimeContainer>
            <strong>Last Updated: </strong>
            {moment(data?.Global?.Date).format('MMMM Do YYYY, h:mm:ss a')}
          </TimeContainer>
          <StyledInput placeholder='Search Country' prefix={<SearchOutlined />} onChange={(e) => setSearch(e.target.value)} />
          <List filteredData={filteredData} />
        </StyledCard>
      )}
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

const StyledInput = styled(Input)`
  margin-bottom: 20px;
`;

const StyledCard = styled(Card)`
  box-shadow: 0 1px 5px rgb(0 0 0 / 10%);
  border-radius: 25px;
  @media (max-width: 600px) {
    box-shadow: 0;
    border-radius: 0;
    overflow-x: scroll;
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

const TimeContainer = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;
