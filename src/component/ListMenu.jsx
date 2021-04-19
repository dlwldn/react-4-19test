import React, { useState } from 'react';
import styled from 'styled-components';

import ListMenuItem from './ListMenuItem';

const ListMenuWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #777;
  position: sticky;
  background-color: #eee;
`

const MENU_ARRAY_KO = ["환자 ID", "성별", "생년월일", "나이", "인종", "민족", "사망여부"];
const MENU_ARRAY_EN = ["person_id", "gender", "birth", "birth", "race", "ethnicity", "death"];

const ListMenu = ({ onClickOrderMenu }) => {
  const [orderIndex, setOrderIndex] = useState(-1);

  const onClickOrder = (index) => {
    if(orderIndex === index) {
      setOrderIndex(-1);
      onClickOrderMenu("");
    } else {
      setOrderIndex(index);
      onClickOrderMenu(MENU_ARRAY_EN[index]);
    }
  }

  return (
    <ListMenuWrap>
      {MENU_ARRAY_KO.map((item, index)=> {
        return (
          <ListMenuItem key={item + index} item={item} index={index} onClickOrder={onClickOrder} orderIndex={orderIndex}/>
        )
      })}
    </ListMenuWrap>
  )
}

export default ListMenu
