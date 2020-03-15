import React from "react";
import { useSelector } from "react-redux";
import ItemTable from "./styled";

function Item({ name, open, high, low, close, volume }) {
  const formatPrice = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  let rate = ((close - open) / open) * 100;
  rate = rate === 0 ? rate : rate.toFixed(2);

  const formatTradeVolume = () => {
    return Math.floor(volume);
  };

  return (
    <ItemTable.tableCellRow>
      <ItemTable.starImgCell>
        <img src="https://www.gopax.co.kr/images/icons/star-gray.svg" />
      </ItemTable.starImgCell>
      <ItemTable.coinNameCell>{name}</ItemTable.coinNameCell>
      <ItemTable.priceCell>{formatPrice(close)}</ItemTable.priceCell>
      <ItemTable.changeRateCell rate={rate}>{rate}%</ItemTable.changeRateCell>
      <ItemTable.highPriceCell>{formatPrice(high)}</ItemTable.highPriceCell>
      <ItemTable.lowPriceCell>{formatPrice(low)}</ItemTable.lowPriceCell>
      <ItemTable.volumeCell>{formatTradeVolume()}</ItemTable.volumeCell>
    </ItemTable.tableCellRow>
  );
}

function ItemList() {
  const stats = useSelector(state => state.coin.stats);
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
        {stats.map(stat => (
          <Item
            key={stat.name}
            name={stat.name}
            open={stat.open}
            high={stat.high}
            low={stat.low}
            close={stat.close}
            volume={stat.volume}
          />
        ))}
      </tbody>
    </ItemTable>
  );
}

export default ItemList;
