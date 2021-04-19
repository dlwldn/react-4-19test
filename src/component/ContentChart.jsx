import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const ContentChartWrap = styled.section`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  background-color: #fff;
`

const ChartAllWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ChartWrap = styled.div`
  width: 19%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > h2 {
    margin-top: 5px;
    font-size: 11px;
  }
`


const ContentChart = () => {
  const [chartData, setChartData] = useState([]);

  const calGenderCount = () => {
    let countF = 0; 
    let countM = 0;
    const arr = [];

    chartData.forEach((item)=> {
      if(item.gender === "F") {
        countF = countF + item.count;
      } else {
        countM = countM + item.count;
      }
    })

    arr.push(countF);
    arr.push(countM);

    const data = {
      labels: [
        'F',
        'M',
      ],
      datasets: [{
        label: '성별 비율',
        data: arr,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
        ],
        hoverOffset: 4,
      }]
    }
    return data;
  }

  const calEthnicityCount = () => {
    const countObj = {};

    chartData.forEach((item)=> {
      countObj[item.ethnicity] = (countObj[item.ethnicity] || 0)+item.count;
    })

    const data = {
      labels: Object.keys(countObj),
      datasets: [{
        label: '민족 비율',
        data: Object.values(countObj),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
        ],
        hoverOffset: 4,
      }]
    }

    return data;
  }

  const calRaceCount = () => {
    const countObj = {};

    chartData.forEach((item)=> {
      countObj[item.race] = (countObj[item.race] || 0)+item.count;
    })

    const data = {
      labels: Object.keys(countObj),
      datasets: [{
        label: '인종 비율',
        data: Object.values(countObj),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(48, 100, 235)',
          'rgb(200, 172, 235)',
          'rgb(11, 102, 205)',
        ],
        hoverOffset: 4,
      }]
    }

    return data;
  }

  const calGenderRaceCount = () => {
    const countObj = {};

    chartData.forEach((item)=> {
      countObj[item.race + item.gender] = ((countObj[item.race] && countObj[item.gender]) || 0) + item.count;
    })

    const data = {
      labels: Object.keys(countObj),
      datasets: [{
        label: '성별+인종 비율',
        data: Object.values(countObj),
        backgroundColor: [
          'red',
          'blue',
          'orange',
          'yellow',
          'green',
          'purple',
          'gray',
          'skyblue',
          'yellowgreen',
        ],
        hoverOffset: 4,
      }]
    }

    return data;
  }

  const calGenderEthnicityCount = () => {
    const countObj = {};

    chartData.forEach((item)=> {
      countObj[item.ethnicity + item.gender] = ((countObj[item.ethnicity] && countObj[item.gender]) || 0) + item.count;
    })

    const data = {
      labels: Object.keys(countObj),
      datasets: [{
        label: '성별+민족 비율',
        data: Object.values(countObj),
        backgroundColor: [
          'red',
          'blue',
          'orange',
          'yellow',
        ],
        hoverOffset: 4,
      }]
    }

    return data;
  }


  useEffect(()=> {
    const fetchChart = async () => {
      try {
        const response = await axios.get(
          `http://49.50.167.136:9871/api/patient/stats`
        );
        setChartData(response.data.stats);
      } catch (err) {
        console.log(err);
      }
    };

    fetchChart();
  },[])

  return (
    <ContentChartWrap>
      <ChartAllWrap>
        <ChartWrap>
          <Pie data={calGenderCount()}/>
          <h2>성별 비율</h2>
        </ChartWrap>
        <ChartWrap>
          <Pie data={calEthnicityCount()}/>
          <h2>민족 비율</h2>
        </ChartWrap>
        <ChartWrap>
          <Pie data={calRaceCount()}/>
          <h2>인종 비율</h2>
        </ChartWrap>
        <ChartWrap>
          <Pie data={calGenderRaceCount()}/>
          <h2>성별 + 인종 비율</h2>
        </ChartWrap>
        <ChartWrap>
          <Pie data={calGenderEthnicityCount()}/>
          <h2>성별 + 민족 비율</h2>
        </ChartWrap>
      </ChartAllWrap>
    </ContentChartWrap>
  )
}

export default ContentChart;