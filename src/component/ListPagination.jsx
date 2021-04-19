import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useReactRouter from 'use-react-router';

const PaginationWrap = styled.div`
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);

  & > a {
    padding: 10px;
  }

  & > span {
    &:hover {
      cursor: pointer;
    }
  }
`

const PageNumber = styled.span`
  color: ${props => props.isActive && "red"};
`

const ListPagination = ({ totalPage, currentPage, pageCount, PAGE_LIMIT_COUNT }) => {
  const { history } = useReactRouter();

  const onClickPrev = () => {
    if(pageCount === 0) {
      return;
    }
    history.push(`/list?pageIndex=${(PAGE_LIMIT_COUNT * (pageCount - 1) + 1)}`);
  }

  const onClickNext = () => {
    if((pageCount+1)*PAGE_LIMIT_COUNT >= totalPage) {
      return;
    }
    history.push(`/list?pageIndex=${(PAGE_LIMIT_COUNT * (pageCount + 1) + 1)}`);
  }

  return (
    <PaginationWrap>
      <span onClick={onClickPrev}>이전</span>
      {new Array(PAGE_LIMIT_COUNT).fill("").map((item,index)=> {
        if((PAGE_LIMIT_COUNT * pageCount) + index + 1 > totalPage) {
          return null;
        } else {
          return (
            <Link key={index} to={`/list?pageIndex=${(PAGE_LIMIT_COUNT * (pageCount)) + index + 1}`}>
              <PageNumber isActive={(PAGE_LIMIT_COUNT * pageCount) + index + 1 === currentPage}>{(PAGE_LIMIT_COUNT * pageCount) + index + 1}</PageNumber>
            </Link>
          )
        }
      })}
      <span onClick={onClickNext}>다음</span>
    </PaginationWrap>
  )
}

export default ListPagination;