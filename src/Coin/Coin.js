import React, { useState, useCallback, useEffect } from 'react';
import ItemList from "./ItemList";
import styled from "styled-components";

const Page = styled.div`
  margin: 15px;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageHeader = styled.div`
  width: 70%;
  display: flex;
  flex-grow: 1;
  align-items: center;
`;

PageHeader.FilterBox = styled.div`
  display: flex;
  height: 7vh;
  margin: 10px 0px;
  align-items: center;
  flex: 1;
`;

PageHeader.imgBox = styled.div``;

PageHeader.img = styled.img`
  margin-right: 8px;
`;

PageHeader.FavoriteText = styled.span`
  font-size: 11px;
`;

PageHeader.FilterBtn = styled.div`
  background-color: ${({active}) => active ? "#242936" : "#1d212b"};
  color: ${({active}) => active ? "#ffba00" : "#6d717a"};
  cursor: pointer;
  :hover {
    background-color: #242936;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  width: 15%;
  height: 5.5vh;
`;

PageHeader.FilterInputBox = styled.div`
  display: flex;
  background-color: #1d212b;;
  align-items: center;
  width: 27%;
  height: 5vh;
  margin: 10px 0px;
`;

PageHeader.InputBox = styled.input`
  background-color: inherit;
  border: none;
  outline: none;
  color: #a0a5af;
  font-size: 11px;
`;

PageHeader.MagnifierImgBox = styled.div`
  padding: 0px 14px;
`

PageHeader.MagnifierImg = styled.img`
  width: 87%;
`

function Coin() {
  const [state, setState] = useState({
    originItems: [],
    items: [],
    loading: true,
    activeIndex: 1,
    inputValue: "",
  });
  const { originItems, items, loading, activeIndex, inputValue } = state;

  const callApi = useCallback(async () => {
    try {
      const response = await fetch("/trading-pairs/stats");
      const responseTes = await fetch("/assets");
      const assets = await responseTes.json()
      const originItems = await response.json();

      setState(state => ({ 
        ...state,
        originItems,
        items: originItems.filter((item, index) => item.name.indexOf("KRW") !== -1),
        loading: false 
      }));
    } catch(err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    callApi();
    // const intervalID = setInterval(() => {
    //   callApi();
    // }, 60000);

    // return () => clearInterval(intervalID);
  }, [callApi]);

  const onFilter = useCallback(activeIndex => {
    let filteredItems = null;
    switch (activeIndex) {
      case 0:
        filteredItems = originItems.filter(item => item.name.indexOf("-BTC") !== -1);
        break;
      case 1:
        filteredItems = originItems.filter(item => item.name.indexOf("-KRW") !== -1)
        break;
      case 2:
        filteredItems = originItems.filter(item => item.name.indexOf("-BTC") !== -1)
        break;
      case 3:
        filteredItems = originItems.filter(item => item.name.indexOf("-ETH") !== -1)
        break;
      default:
        throw new Error("Cannot be filtering")
        break;
    }
    setState({
      ...state,
      activeIndex,
      items: filteredItems,
    });
  }, [state]);

  const onChange = useCallback(e => {
    const { value } = e.target;
    setState({
      ...state,
      inputValue: value,
      items: originItems.filter(item => item.name.indexOf(value.toUpperCase()) !== -1)
    })
  }, [state]);

  const onFavorite = useCallback(name => {
    originItems.forEach((item, index) => {
      if (item.name === name) {
        let favoriteIds = JSON.parse(localStorage.getItem("favorites"));
        favoriteIds = !favoriteIds ? [index] : favoriteIds.concat(index)
        localStorage.setItem("favorites", JSON.stringify(favoriteIds));
      }
    })
  }, [originItems]);
  
  return (
    <Page>
      <PageHeader>
        <PageHeader.FilterBox>
          <PageHeader.FilterBtn active={activeIndex === 0} onClick={() => onFilter(0)}>
            <PageHeader.imgBox>
              <PageHeader.img src={`https://www.gopax.co.kr/images/icons/star-${activeIndex === 0 ? "mango" : "gray"}.svg`} />
              <PageHeader.FavoriteText>관심</PageHeader.FavoriteText>
            </PageHeader.imgBox>
          </PageHeader.FilterBtn>
          <PageHeader.FilterBtn active={activeIndex === 1} onClick={() => onFilter(1)}>KRW</PageHeader.FilterBtn>
          <PageHeader.FilterBtn active={activeIndex === 2} onClick={() => onFilter(2)}>BTC</PageHeader.FilterBtn>
          <PageHeader.FilterBtn active={activeIndex === 3} onClick={() => onFilter(3)}>ETH</PageHeader.FilterBtn>
        </PageHeader.FilterBox>
        <PageHeader.FilterInputBox>
          <PageHeader.MagnifierImgBox>
            <PageHeader.MagnifierImg src="https://www.gopax.co.kr/images/icons/magnifier.svg" />
          </PageHeader.MagnifierImgBox>
          <PageHeader.InputBox value={inputValue} onChange={onChange} placeholder="이름/심볼 검색" />
        </PageHeader.FilterInputBox>
      </PageHeader>
      {loading ? "Loading" : <ItemList items={items} onFavorite={onFavorite} />}
    </Page>
  );
};

export default Coin;