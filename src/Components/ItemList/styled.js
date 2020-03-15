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

export default ItemTable;