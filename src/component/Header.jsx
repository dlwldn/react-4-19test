import React from 'react';
import logo from '../asset/logo/logo.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderWrap = styled.header`
  width: 100%;
  height: 70px;
  padding: 0 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;

  & > a > img {
    height: 40px;
  }
`

const FilterWrap = styled.div`
  & > select {
    padding: 5px;
    border: none;
  }

  & > input {
    margin-left: 10px;
    padding: 5px;
    border: none;
    outline: none;
    border-bottom: 1px solid gray;
  }
`

const FILTER_ARRAY = [
  {name: "age", nameKo: "나이"},
  {name: "isDeath", nameKo: "사망여부", category: [true, false]},
  {name: "gender", nameKo: "성별", category: ["F","M"]},
  {name: "race", nameKo: "인종", category: ["other","native","black","white","asian"]},
  {name: "ethnicity", nameKo: "민족", category: ["nonhispanic","hispanic"]},
];

const Header = ({ filterValue, inputValue, onChangeSelect, onChangeInput}) => {

  return (
    <HeaderWrap>
      <Link to="/">
        <img src={logo} alt="로고"/>
      </Link>
      <FilterWrap>
        <select onChange={onChangeSelect} value={filterValue}>
          <option value="" disabled>필터를 선택해주세요</option>
          {FILTER_ARRAY.map((item, index)=> {
            return (
              <option key={item+index} value={item.name}>{item.nameKo}</option> 
            )
          })}
        </select>
        {filterValue !== "" && <input type="text" onChange={onChangeInput} value={inputValue}/>}
      </FilterWrap>
    </HeaderWrap>
  )
}

export default Header
