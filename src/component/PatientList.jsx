import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const PatientListWrap = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  margin-bottom: 3px;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`

const Item = styled.span`
  width: 14%;
  padding: 10px;
  text-align: center;
`

const DetailList = styled.li`
  width: 100%;
  padding: 20px;
  background-color: #00acee;
  margin-bottom: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div > h2 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 15px;
  }

  & > div > h3 {
    margin-bottom: 10px;

    & > span {
      color: #fff;
    }
  }

  & > div > div {
    text-align: left;
  }
`

const PatientList = ({ patientItem, index }) => {
  const [isDetail, setIsDetail] = useState(false);
  const [detailData, setDetailData] = useState([]);
  const [targetIndex, setTargetIndex] = useState(-1);

  const onClickList = (index) => {
    setIsDetail(!isDetail);
    setTargetIndex(index);
  }

  useEffect(()=> {
    const fetchUserDetail = async () => {
      try {
        const response = await axios.get(
          `http://49.50.167.136:9871/api/patient/brief/${patientItem.personID}`
        );

        setDetailData(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    isDetail && fetchUserDetail();
  }, [isDetail])

  return (
    <>
      <PatientListWrap onClick={()=>onClickList(index)}>
        <Item>{patientItem.personID}</Item>
        <Item>{patientItem.gender}</Item>
        <Item>{patientItem.birthDatetime.slice(0,10)}</Item>
        <Item>{patientItem.age}</Item>
        <Item>{patientItem.race}</Item>
        <Item>{patientItem.ethnicity}</Item>
        <Item>{patientItem.isDeath ? "O" : "X"}</Item>
      </PatientListWrap>
      {isDetail && 
        <DetailList>
          <div>
            <h2>{patientItem.personID}님의 상세정보</h2> 
            <h3>총 방문횟수 : <span>{detailData?.visitCount}</span></h3>
            {detailData?.conditionList?.map((item, index)=> {
              return (
                <div key={item+index}>{`${index+1} : ${item}`}</div>
              )
            })}
          </div>  
        </DetailList>
      }
    </>
  );
}

export default PatientList
