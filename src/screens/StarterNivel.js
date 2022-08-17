import React, { useEffect } from "react";
import styled from "styled-components/native";
import { connect } from "react-redux";

import DefaultButton from "../components/DefaultButton";
import { Alert, Text } from "react-native";

//---------------- STYLED COMPONENTS ---------------------------------
//---------------- STYLED COMPONENTS ---------------------------------

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #FFF;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 50px;
`;
const HeaderText = styled.Text`
  font-size: 15px;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;
const NextButton = styled.Button``;
const BoldText = styled.Text`
  font-weight: bold;
`;
const LevelArea = styled.View`
  width: 100%;
`;

//---- END ------------ STYLED COMPONENTS -------------- END ---------------

const Page = props => {
  let phrases = [];
  phrases[1] = 'Só 1 dia não vai adiantar muito, mas...';
  phrases[2] = '2 dias eu acho pouco, mas quem sou eu pra te julgar?';
  phrases[3] = 'Legal, 3 dias dá pro gasto...';
  phrases[4] = 'Legal, 4 dias vai ser TOP';
  phrases[5] = 'É isso aí, 5 dias é o mínimo, lets GO!';
  phrases[6] = 'É, 6 dias não é pra todo mundo...';
  phrases[7] = 'Wooow! Todo dia?! WTF?!';

  let funnyPhrase = phrases[props.workoutDays.length];

  // **Function to set the user level
  const setMyLevel = l => {
    props.setLevel(l);
    props.navigation.setParams({level:l});
  }

  return (
    <Container>
      <HeaderText>{funnyPhrase}</HeaderText>
      <HeaderText><BoldText>Qual seu nível hoje?</BoldText></HeaderText>

      {/* TODO: **To Refactoring this peace of code in an iteration */}
      <LevelArea>
        <DefaultButton onPress={()=>setMyLevel('beginner')}
          style={{marginBottom: 20}} underlayColor="#CCC"
          bgcolor={props.level == 'beginner'?'#A5E8BC':false}
        >
          <Text>Iniciante / Um frango</Text>
        </DefaultButton>
        <DefaultButton onPress={()=>setMyLevel('intermediate')}
          style={{marginBottom: 20}} underlayColor="#CCC"
          bgcolor={props.level == 'intermediate'?'#A5E8BC':false}
        >
          <Text>Intermediário / Me viro bem</Text>
        </DefaultButton>
        <DefaultButton onPress={()=>setMyLevel('advanced')}
          style={{marginBottom: 20}} underlayColor="#CCC"
          bgcolor={props.level == 'advanced'?'#A5E8BC':false}
        >
          <Text>Avançado / Primo do The Rock</Text>
        </DefaultButton>
      </LevelArea>
    </Container>
  );
}

Page.navigationOptions = ({navigation}) => {
  const nextAction = () => {
    if(!navigation.state.params || !navigation.state.params.level) {
      return Alert.alert('Atenção', 'Você precisa escolher uma opção!');
    }
    navigation.navigate('StarterRecommendations');
  }

  return {
    title: '',
    headerRight: <NextButton title="Próximo" onPress={nextAction} />,
    headerRightContainerStyle: {marginRight: 10},
  };
};

const mapStateToProps = state => {
  return {
    level: state.userReducer.level,
    workoutDays: state.userReducer.workoutDays,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLevel: level => dispatch({type: 'USER_SET_LEVEL', payload: {level}}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
