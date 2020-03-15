import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ItemList from "../ItemList/ItemList";
import { getStatsWithAssets } from "../../actions";
import Page from "./styled";

function Coin() {
  const [state, setState] = useState({
    inputValue: "",
  });
  const { inputValue } = state;
  const filteringStr = useSelector(state => state.coin.filteringStr);
  const dispatch = useDispatch();

  const callApi = useCallback(async () => {
    try {
      await dispatch(getStatsWithAssets());
    } catch(err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    callApi();
  }, [callApi]);

  const onFilter = useCallback(event => {
    const { id } = event.target;
    dispatch({ type: 'FILTER_ITEMS', filteringStr: id });
  }, [dispatch]);

  const onChange = useCallback(event => {
    const { value } = event.target;
    setState({ ...state, inputValue: value });
    dispatch({ type: 'ON_CHANGE_ITEMS', inputValue: value });
  }, [state, dispatch]);

  return (
    <Page>
      <Page.Header>
        <Page.FilterBox>
          <Page.FilterBtn active={filteringStr === "FAVORITE"} onClick={onFilter}>
            <Page.imgBox>
              <Page.img src={`https://www.gopax.co.kr/images/icons/star-${filteringStr === "FAVORITE" ? "mango" : "gray"}.svg`} />
              <Page.FavoriteText>관심</Page.FavoriteText>
            </Page.imgBox>
          </Page.FilterBtn>
          <Page.FilterBtn id="KRW" active={filteringStr === "KRW"} onClick={onFilter}>KRW</Page.FilterBtn>
          <Page.FilterBtn id="BTC" active={filteringStr === "BTC"} onClick={onFilter}>BTC</Page.FilterBtn>
          <Page.FilterBtn id="ETH" active={filteringStr === "ETH"} onClick={onFilter}>ETH</Page.FilterBtn>
        </Page.FilterBox>
        <Page.FilterInputBox>
          <Page.MagnifierImgBox>
            <Page.MagnifierImg src="https://www.gopax.co.kr/images/icons/magnifier.svg" />
          </Page.MagnifierImgBox>
          <Page.InputBox value={inputValue} onChange={onChange} placeholder="이름/심볼 검색" />
        </Page.FilterInputBox>
      </Page.Header>
      <ItemList />
    </Page>
  );
};

export default Coin;