import React, { useState } from 'react';

import Header from '../component/Header';
import Content from '../component/Content';

const Main = () => {
  const [filterValue, setFilterValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const onChangeSelect = (e) => {
    setFilterValue(e.target.value);
  }

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  }


  return (
    <>
      <Header onChangeSelect={onChangeSelect} onChangeInput={onChangeInput} filterValue={filterValue} inputValue={inputValue}/>
      <Content filterValue={filterValue} inputValue={inputValue}/>
    </>
  )
}

export default Main;