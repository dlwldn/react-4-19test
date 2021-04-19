import React from 'react';
import styled from 'styled-components';

import PatientList from './PatientList';

const PatientListsWrap = styled.ul`
  width: 100%;
`

const PatientLists = ({ patientData, filterValue, inputValue }) => {
  return (
    <PatientListsWrap>
      {console.log(filterValue, inputValue)}
      {patientData.filter((item)=> {
        if(filterValue === "") {
          return item;
        }
        if(filterValue === "age") {
          return (
            item[filterValue].toString().slice(0,inputValue.length) === inputValue.toString()
          )
        }
        if(filterValue === "isDeath") {
          const result =  item[filterValue] ? "O" : "X";
          return (
            result.toUpperCase().slice(0,inputValue.length) === inputValue.toUpperCase()
          )
        }
        return (
          (item[filterValue]?.toUpperCase().slice(0,inputValue.length) === inputValue.toUpperCase())
        )
      }).map((patientItem, index)=> {
        return <PatientList key={patientItem.personID} patientItem={patientItem} index={index}/>
      })}
    </PatientListsWrap>
  )
}

export default PatientLists
