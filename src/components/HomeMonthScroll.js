import React, {useRef, useState, useEffect} from "react";
import { Dimensions } from "react-native";
import styled from 'styled-components/native';

import months from './MonthsArray';

const MonthScroll = styled.ScrollView`
  width: 100%;
  height: 60px;
`;
const MonthButton = styled.TouchableHighlight`
  width: ${props=>props.width};
  justify-content: center;
  align-items: center;
`;
const MonthItem = styled.View`
  width: 90%;
  height: 30px;
  background-color: #EEE;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;
const MonthText = styled.Text``;

const screenWidth = Math.round(Dimensions.get('window').width);
let thirdW = screenWidth / 3;

export default props => {
  const MonthRef = useRef();

  return (
    <MonthScroll ref={MonthRef}
      horizontal={true} showsHorizontalScrollIndicator={false}
      decelerationRate="fast" snapToInterval={thirdW}
      contentContainerStyle={{paddingLeft: thirdW, paddingRight: thirdW}}
    >
      {months.map((m, k)=>(
        <MonthButton key={k} width={thirdW} >
          <MonthItem>
            <MonthText>{m}</MonthText>
          </MonthItem>
        </MonthButton>
      ))}
    </MonthScroll>
  );
}
