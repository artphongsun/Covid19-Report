import React from 'react';
import styled from 'styled-components';
import { Table } from 'antd';

export const List = ({ filteredData }) => {
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
      <Table columns={columns} bordered dataSource={filteredData?.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)} />
    </Root>
  );
};

const Root = styled.div`
  @media (max-width: 460px) {
    overflow-x: scroll;
  }
`;
