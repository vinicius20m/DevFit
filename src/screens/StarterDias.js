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
const DaysArea = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

//---- END ------------ STYLED COMPONENTS -------------- END ---------------

const Page = props => {
  // Get the first name of the user
  let firstName = props.name.split(' ')[0];
  // useEffect(()=>{props.setWorkoutDays([]);}, []);


  // Function to toggle the day buttons
  const toggleDay = d => {
    let newWorkoutDays = [...props.workoutDays];

    if (!props.workoutDays.includes(d)) {
      newWorkoutDays.push(d);
    } else {
      newWorkoutDays = newWorkoutDays.filter(i=>i!=d);
    }

    props.setWorkoutDays(newWorkoutDays);
    props.navigation.setParams({workoutDays: newWorkoutDays});
  }

  return (
    <Container>
      <HeaderText>Opa, <BoldText>{firstName}</BoldText>, tudo Bem?</HeaderText>
      <HeaderText>Quais <BoldText>dias da semana</BoldText> você pretende Treinar?</HeaderText>

      {/* TODO: To Refactoring this peace of code in an iteration */}
      <DaysArea>
        <DefaultButton onPress={()=>toggleDay(1)}
          width={100} style={{marginBottom: 20}} underlayColor="#CCC"
          bgcolor={props.workoutDays.includes(1)?'#A5E8BC':false}
        >
          <Text>Segunda</Text>
        </DefaultButton>
        <DefaultButton onPress={()=>toggleDay(2)}
          width={100} style={{marginBottom: 20}} underlayColor="#CCC"
          bgcolor={props.workoutDays.includes(2)?'#A5E8BC':false}
        >
          <Text>Terça</Text>
        </DefaultButton>
        <DefaultButton onPress={()=>toggleDay(3)}
          width={100} style={{marginBottom: 20}} underlayColor="#CCC"
          bgcolor={props.workoutDays.includes(3)?'#A5E8BC':false}
        >
          <Text>Quarta</Text>
        </DefaultButton>
        <DefaultButton onPress={()=>toggleDay(4)}
          width={100} style={{marginBottom: 20}} underlayColor="#CCC"
          bgcolor={props.workoutDays.includes(4)?'#A5E8BC':false}
        >
          <Text>Quinta</Text>
        </DefaultButton>
        <DefaultButton onPress={()=>toggleDay(5)}
          width={100} style={{marginBottom: 20}} underlayColor="#CCC"
          bgcolor={props.workoutDays.includes(5)?'#A5E8BC':false}
        >
          <Text>Sexta</Text>
        </DefaultButton>
        <DefaultButton onPress={()=>toggleDay(6)}
          width={100} style={{marginBottom: 20}} underlayColor="#CCC"
          bgcolor={props.workoutDays.includes(6)?'#A5E8BC':false}
        >
          <Text>Sabado</Text>
        </DefaultButton>
        <DefaultButton onPress={()=>toggleDay(0)}
          width={100} style={{marginBottom: 20}} underlayColor="#CCC"
          bgcolor={props.workoutDays.includes(0)?'#A5E8BC':false}
        >
          <Text>Domingo</Text>
        </DefaultButton>
      </DaysArea>
    </Container>
  );
}

Page.navigationOptions = ({navigation}) => {
  const nextAction = () => {
    if(!navigation.state.params || !navigation.state.params.workoutDays.length) {
      return Alert.alert('Atenção', 'Você precisa treinar pelo menos 1 dia!');
    }
    navigation.navigate('StarterNivel');
  }

  return {
    title: '',
    headerRight: <NextButton title="Próximo" onPress={nextAction} />,
    headerRightContainerStyle: {marginRight: 10},
  };
};

const mapStateToProps = state => {
  return {
    name: state.userReducer.name,
    workoutDays: state.userReducer.workoutDays,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setName: name => dispatch({type: 'USER_SET_NAME', payload: {name}}),
    setWorkoutDays: workoutDays => dispatch({type: 'USER_SET_WORKOUTDAYS', payload: {workoutDays}}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
