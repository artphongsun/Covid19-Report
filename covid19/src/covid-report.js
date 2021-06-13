import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Table, Input, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';

const CovidReport = () => {
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

  const columns = [
    {
      title: 'Country Name',
      dataIndex: 'Country',
      key: 'Country',
      width: '25%',
    },
    {
      title: ' Total Confirmed Cases',
      dataIndex: 'TotalConfirmedCleaned',
      key: 'TotalConfirmedCleaned',
      sorter: (a, b) => a.TotalConfirmed - b.TotalConfirmed,
      width: '25%',
    },
    {
      title: 'Total Death Cases',
      dataIndex: 'TotalDeathsCleaned',
      key: 'TotalDeathsCleaned',
      sorter: (a, b) => a.TotalDeaths - b.TotalDeaths,
      width: '25%',
    },
    {
      title: 'Total Recovered Cases',
      key: 'TotalRecoveredCleaned',
      dataIndex: 'TotalRecoveredCleaned',
      sorter: (a, b) => a.TotalRecovered - b.TotalRecovered,
      width: '25%',
    },
  ];

  return (
    <Root>
      {loading ? (
        ''
      ) : (
        <StyledCard title={<strong>COVID-19 PANDEMIC</strong>} bordered>
          <SummaryContainer>
            <Box>
              <strong>
                Total Cases <Text color='gray'>{data.Global.TotalConfirmed}</Text>
              </strong>
            </Box>
            <Box>
              <strong>
                Total Deaths <Text color='red'>{data.Global.TotalDeaths}</Text>
              </strong>
            </Box>
            <Box>
              <strong>
                Total Recovered <Text color='#8ACA2B'>{data.Global.TotalRecovered}</Text>
              </strong>
            </Box>
          </SummaryContainer>
          <TimeContainer>
            <strong>Last Updated: </strong>
            {moment(data?.Global?.Date).format('MMMM Do YYYY, h:mm:ss a')}
          </TimeContainer>
          <StyledInput placeholder='Search Country' prefix={<SearchOutlined />} onChange={(e) => setSearch(e.target.value)} />
          <Table
            columns={columns}
            bordered
            dataSource={filteredData && filteredData.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)}
          />
        </StyledCard>
      )}
    </Root>
  );
};

export default CovidReport;

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
  @media (max-width: 600px) {
    .ant-card-body {
      overflow: scroll;
      height: 100vh;
    }
    .ant-card-bordered {
      border: none;
    }
  }
  @media (max-width: 320px) {
    .ant-pagination {
      width: 125%;
    }
  }
`;

const Text = styled.div`
  color: ${(props) => props.color};
`;

const SummaryContainer = styled.div`
  font-size: 25px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Box = styled.div`
  background: #fafafa;
  padding: 10px;
  margin: 10px;
  width: 300px;
  border: 1px solid #ececec;
`;

const TimeContainer = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;
