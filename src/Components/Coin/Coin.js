import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ItemList from "../ItemList/ItemList";
import { getStatsAndAssets } from "../../actions";
import Page from "./styled";

function Coin() {
  const [state, setState] = useState({
    loading: true,
    activeIndex: 1,
  });
  const { loading, activeIndex } = state;
  const dispatch = useDispatch();

  const callApi = useCallback(async () => {
    try {
      await dispatch(getStatsAndAssets());
      setState(state => ({ 
        ...state,
        loading: false 
      }));
    } catch(err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    callApi();
  }, [callApi]);

  const onFilter = useCallback(activeIndex => {
    setState({
      ...state,
      activeIndex,
    });
  }, [state]);

  const stats = useSelector(state => state.coin.stats);
  const assets = useSelector(state => state.coin.assets);

  return (
    <Page>
      <Page.Header>
        <Page.FilterBox>
          <Page.FilterBtn active={activeIndex === 0} onClick={() => onFilter(0)}>
            <Page.imgBox>
              <Page.img src={`https://www.gopax.co.kr/images/icons/star-${activeIndex === 0 ? "mango" : "gray"}.svg`} />
              <Page.FavoriteText>관심</Page.FavoriteText>
            </Page.imgBox>
          </Page.FilterBtn>
          <Page.FilterBtn active={activeIndex === 1} onClick={() => onFilter(1)}>KRW</Page.FilterBtn>
          <Page.FilterBtn active={activeIndex === 2} onClick={() => onFilter(2)}>BTC</Page.FilterBtn>
          <Page.FilterBtn active={activeIndex === 3} onClick={() => onFilter(3)}>ETH</Page.FilterBtn>
        </Page.FilterBox>
        <Page.FilterInputBox>
          <Page.MagnifierImgBox>
            <Page.MagnifierImg src="https://www.gopax.co.kr/images/icons/magnifier.svg" />
          </Page.MagnifierImgBox>
          <Page.InputBox placeholder="이름/심볼 검색" />
        </Page.FilterInputBox>
      </Page.Header>
      {!loading && <ItemList />}
    </Page>
  );
};

export default Coin;