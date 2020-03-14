import React from "react";
import styled from "styled-components";

const ItemTable = styled.table`
  width: 70%;
  /* border-collapse: collapse; */
`;

ItemTable.tableHeadRow = styled.tr`
  background-color: #242936;
  height: 5vh;
`;

const TableHeading = styled.th`
  color: #6d717a;
  font-size: 11px;
  padding-right: 20px;
  text-align: right;
`;

ItemTable.emptyHead = styled.th`
  width: 6%;
`;


ItemTable.coinNameHead = styled(TableHeading)`
  width: 18%;
  text-align: left;
`;

ItemTable.boxHead = styled(TableHeading)`
  width: 17%;
`;

ItemTable.middleHead = styled(TableHeading)`
  width: 15%;
`;

ItemTable.tableCellRow = styled.tr`
  background-color: #1d212b;
  height: 6vh;
`;

const TableData = styled.td`
  font-size: 14px;
  padding-right: 20px;
  text-align: right;
  width: 15%;
`;

ItemTable.starImgCell = styled.td`
  text-align: center;
`;

ItemTable.coinNameCell = styled(TableData)`
  text-align: left;
  color: #e2e3e4;
`;

ItemTable.priceCell = styled(TableData)`
  color: #e2e3e4;
`;

ItemTable.changeRateCell = styled(TableData)`
  color: ${({rate}) => rate > 0 ? "#3dcc88" : (rate < 0 ? "#f25430" : "#e2e3e4")};
`;

ItemTable.highPriceCell = styled(TableData)`
  color: #a0a5af;
`;

ItemTable.lowPriceCell = styled(TableData)`
  color: #a0a5af;
`;

ItemTable.volumeCell = styled(TableData)`
  color: #a0a5af;
`;

function Item({ originalItems, name, open, high, low, close, volume, onFavorite }) {
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
      <ItemTable.starImgCell onClick={() => onFavorite(name)}>
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

function ItemList({ items, onFavorite }) {
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
        {items.map(item => (
          <Item
            key={item.name}
            name={item.name}
            open={item.open}
            high={item.high}
            low={item.low}
            close={item.close}
            volume={item.volume}
            onFavorite={onFavorite}
          />
        ))}
      </tbody>
    </ItemTable>
  );
}

export default ItemList;
