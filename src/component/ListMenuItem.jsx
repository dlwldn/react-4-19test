import React from 'react';
import styled from 'styled-components';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

const MenuItem = styled.div`
  width: 14%;
  padding: 10px;
  text-align: center;
  position: relative;
  
  & > span:nth-child(2) {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }

  &:hover {
    cursor: pointer;
  }
`

const ListMenuItem = ({ item, index, orderIndex, onClickOrder }) => {
  return (
    <MenuItem onClick={()=>onClickOrder(index)}>
      <span>{item}</span> 
      <span>{(orderIndex === index) ? <RiArrowUpSLine/> : <RiArrowDownSLine/>}</span> 
    </MenuItem>
  )
}

export default ListMenuItem
