import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ItemTable from "./styled";

const Item = React.memo(function Item({ label, name, open, high, low, close, volume, onFavorite, isFavorite }) {
  const formatPrice = number => {
    return number < 1 ? number : number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  let rate = ((close - open) / open) * 100;
  rate = rate === 0 ? rate : rate.toFixed(2);

  const formatTradeVolume = () => {
    const money = volume * close;
    return Math.floor(money);
  };

  useEffect(() => {
    console.log(name);
  }, []);

  return (
    <ItemTable.tableCellRow>
      <ItemTable.starImgCell onClick={() => onFavorite(name)}>
        <img src={`https://www.gopax.co.kr/images/icons/star-${isFavorite ? "mango" : "gray"}.svg`} alt="star-img" />
      </ItemTable.starImgCell>
      <ItemTable.coinNameCell>
        <div>{label}</div>
        <ItemTable.name>{name}</ItemTable.name>
      </ItemTable.coinNameCell>
      <ItemTable.priceCell>{formatPrice(close)}</ItemTable.priceCell>
      <ItemTable.changeRateCell rate={rate}>{rate}%</ItemTable.changeRateCell>
      <ItemTable.restCell>{formatPrice(high)}</ItemTable.restCell>
      <ItemTable.restCell>{formatPrice(low)}</ItemTable.restCell>
      <ItemTable.restCell>{formatTradeVolume()}</ItemTable.restCell>
    </ItemTable.tableCellRow>
  );
});

function ItemList() {
  const items = useSelector(state => state.coin.items);
  let favoriteName = JSON.parse(localStorage.getItem("favorites"));
  const [favorites, setFavorites] = useState(favoriteName);

  const onFavorite = useCallback(name => {
    if(favoriteName && favoriteName.indexOf(name) !== -1) return;
    favoriteName = !favoriteName ? [name] : favoriteName.concat(name)
    localStorage.setItem("favorites", JSON.stringify(favoriteName));
    setFavorites(favoriteName.concat(name))
  }, []);

  return (
    <ItemTable>
      <thead>
        <ItemTable.tableHeadRow>
          <ItemTable.emptyHead></ItemTable.emptyHead>
          <ItemTable.coinNameHead>이름</ItemTable.coinNameHead>
          <ItemTable.boxHead>현재가</ItemTable.boxHead>
          <ItemTable.middleHead>변동</ItemTable.middleHead>
          <ItemTable.middleHead>최고가</ItemTable.middleHead>
          <ItemTable.middleHead>최저가</ItemTable.middleHead>
          <ItemTable.boxHead>거래대금</ItemTable.boxHead>
        </ItemTable.tableHeadRow>
      </thead>
      <tbody>
        {items && items.length > 0 && items.map(item => (
          <Item
            key={item.name}
            label={item.label}
            name={item.name}
            open={item.open}
            high={item.high}
            low={item.low}
            close={item.close}
            volume={item.volume}
            onFavorite={onFavorite}
            isFavorite={favoriteName && favoriteName.indexOf(item.name) !== -1}
          />
        ))}
      </tbody>
    </ItemTable>
  );
}

export default React.memo(ItemList);
