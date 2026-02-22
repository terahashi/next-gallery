import styled from 'styled-components';

const YearSeparatorLineWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-left: 0.5em;
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: #d9d9d9;
  border-radius: 2px;
`;

const YearSepalatorLine = () => {
  return (
    <YearSeparatorLineWrapper>
      <Line></Line>
    </YearSeparatorLineWrapper>
  );
};

export default YearSepalatorLine;
