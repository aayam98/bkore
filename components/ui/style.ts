import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  margin: 0 auto;
  color: #fff;
  text-align: center;
`;

const BodyModel = styled.div`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  top:-200px;
  cursor: pointer;
  background-color: transparent;
  color:#000; 
`;

export { Container, BodyModel };
