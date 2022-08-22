import React, {useEffect, useState} from "react";
import styled from 'styled-components/native';
import {connect} from 'react-redux';
import { Alert } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";

//---------------- STYLED COMPONENTS ---------------------------------
//---------------- STYLED COMPONENTS ---------------------------------

const Container = styled.SafeAreaView`
  flex: 1;
  margin: 0 30px;
`;
const Label = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
`;
const Input = styled.TextInput`
  border: 1px solid #CCC;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  padding: 10px;
`;
const ListArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const DayItem = styled.TouchableHighlight`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: #EEE;
  justify-content: center;
  align-items: center;
`;
const DayItemText = styled.Text``;
const LevelItem = styled.TouchableHighlight`
  padding: 0 15px;
  border-radius: 5px;
  height: 30px;
  background-color: #EEE;
  justify-content: center;
  align-items: center;
`;
const LevelItemText = styled.Text``;
const ResetButton = styled.Button``;

//---- END ------------ STYLED COMPONENTS -------------- END ---------------

const Page = props => {
  const toggleWorkoutDay = d => {
    let newWorkoutDays = [...props.workoutDays];

    if (newWorkoutDays.includes(d)) {
      if (newWorkoutDays.length == 1) {
        return Alert.alert('Calma ae!!', 'Você precisa treinar pelo menos 1 dia.');
      }
      newWorkoutDays = newWorkoutDays.filter(i=>i!=d);
    } else {
      newWorkoutDays.push(d);
    }

    props.setWorkoutDays(newWorkoutDays);
  }

  const handleReset = () => {
    props.reset();
    const resetAction = StackActions.reset({
      index: 0,
      actions:[NavigationActions.navigate({routeName: 'StarterStack'})],
    });

    props.navigation.dispatch(resetAction);
  }

  let weekDays = [];
  weekDays[1] = 'S';
  weekDays[2] = 'T';
  weekDays[3] = 'Q';
  weekDays[4] = 'Q';
  weekDays[5] = 'S';
  weekDays[6] = 'S';
  weekDays[0] = 'D';

  return (
    <Container>
      <Label>Seu nome completo:</Label>
      <Input value={props.name} onChangeText={props.setName} />

      <Label>Dias em que você treina:</Label>
      <ListArea>
        {weekDays.map((wd, i)=>(
          <DayItem onPress={()=>toggleWorkoutDay(i)} key={i}
            style={props.workoutDays.includes(i)?{backgroundColor: '#A5E8BC'}:{}} underlayColor="transparent"
          >
            <DayItemText>{wd}</DayItemText>
          </DayItem>
        ))}
      </ListArea>

      <Label>Seu nível:</Label>
      <ListArea>
        <LevelItem onPress={()=>props.setLevel('beginner')} underlayColor="transparent"
          style={props.level=='beginner'?{backgroundColor: '#A5E8BC'}:{}}
        >
          <LevelItemText>Iniciante</LevelItemText>
        </LevelItem>
        <LevelItem onPress={()=>props.setLevel('intermediate')} underlayColor="transparent"
          style={props.level=='intermediate'?{backgroundColor: '#A5E8BC'}:{}}
        >
          <LevelItemText>Intermediário</LevelItemText>
        </LevelItem>
        <LevelItem onPress={()=>props.setLevel('advanced')} underlayColor="transparent"
          style={props.level=='advanced'?{backgroundColor: '#A5E8BC'}:{}}
        >
          <LevelItemText>Avançado</LevelItemText>
        </LevelItem>
      </ListArea>

      <Label>Você quer resetar tudo?</Label>
      <ResetButton title="Resetar Tudo" onPress={handleReset} />
    </Container>
  );
}

Page.navigationOptions = ({navigation}) => {

  return {
    title: 'Configurações',
  };
};

const mapStateToProps = state => {
  return {
    name: state.userReducer.name,
    workoutDays: state.userReducer.workoutDays,
    level: state.userReducer.level,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setName: name=> dispatch({type: 'USER_SET_NAME', payload: {name}}),
    setWorkoutDays: workoutDays=> dispatch({type: 'USER_SET_WORKOUTDAYS', payload: {workoutDays}}),
    setLevel: level=> dispatch({type: 'USER_SET_LEVEL', payload: {level}}),
    reset: ()=> dispatch({type: 'USER_RESET'}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
