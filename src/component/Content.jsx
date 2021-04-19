import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import useReactRouter from 'use-react-router';

import ListMenu from './ListMenu'; 
import PatientLists from './PatientLists';
import ListPagination from './ListPagination';
import ContentChart from './ContentChart';

import CircularProgress from '@material-ui/core/CircularProgress';

const ContentWrap = styled.main`
  width: 100%;
  height: calc(100vh - 70px);
  padding: 0 2%;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: reletive;
`

const TableWrap = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  overflow: auto;
`

const LoadingWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const EmptyWrap = styled(LoadingWrap)`
`

const PAGE_ROW = 15;
const PAGE_LIMIT_COUNT = 5;

const Content = ({ filterValue, inputValue }) => {
  const { location } = useReactRouter();
  const [patientData, setPatientData] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [orderColumn, setOrderColumn] = useState("");
  const [orderDesc, setOrderDesc] = useState(true);

  const onClickOrderMenu = (columnName) => {
    setOrderColumn(columnName);
  }

  useEffect(()=> {
    const _currentPage = location.search.split("pageIndex=")[1] ? parseInt(location.search.split("pageIndex=")[1]) : 1;
    setCurrentPage(_currentPage);
    setPageCount(Math.ceil(_currentPage/PAGE_LIMIT_COUNT)-1);
    
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://49.50.167.136:9871/api/patient/list?page=${_currentPage}&length=${PAGE_ROW}&order_column=${orderColumn}&order_desc=${orderDesc}`
        );
        setPatientData(response.data.patient.list);
        setTotalPage(Math.ceil(response.data.patient.totalLength/PAGE_ROW));
        if(Math.ceil(response.data.patient.totalLength/PAGE_ROW) < _currentPage) {
          setIsDataEmpty(true);
        }
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    fetchUsers();
  }, [location, orderColumn])


  // if (isLoading) return <LoadingWrap><CircularProgress/></LoadingWrap>
  if (!isLoading && isDataEmpty) return <EmptyWrap>데이터가 없어요</EmptyWrap>;
  return (
    <ContentWrap>
      <ContentChart />
      <TableWrap>
        <ListMenu onClickOrderMenu={onClickOrderMenu}/>
        <PatientLists patientData={patientData} filterValue={filterValue} inputValue={inputValue}/>
      </TableWrap>
      <ListPagination totalPage={totalPage} currentPage={currentPage} pageCount={pageCount} PAGE_LIMIT_COUNT={PAGE_LIMIT_COUNT}/>
    </ContentWrap>
  )
}

export default Content
