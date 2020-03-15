import styled from "styled-components";

const Page = styled.div`
  margin: 15px;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

Page.Header = styled.div`
  width: 70%;
  display: flex;
  flex-grow: 1;
  align-items: center;
`;

Page.FilterBox = styled.div`
  display: flex;
  height: 7vh;
  margin: 10px 0px;
  align-items: center;
  flex: 1;
`;

Page.imgBox = styled.div``;

Page.img = styled.img`
  margin-right: 8px;
`;

Page.FavoriteText = styled.span`
  font-size: 11px;
`;

Page.FilterBtn = styled.div`
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

Page.FilterInputBox = styled.div`
  display: flex;
  background-color: #1d212b;;
  align-items: center;
  width: 27%;
  height: 5vh;
  margin: 10px 0px;
`;

Page.InputBox = styled.input`
  background-color: inherit;
  border: none;
  outline: none;
  color: #a0a5af;
  font-size: 11px;
`;

Page.MagnifierImgBox = styled.div`
  padding: 0px 14px;
`

Page.MagnifierImg = styled.img`
  width: 87%;
`

export default Page;