import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import {connect} from 'react-redux';
import Workout from "../components/Workout";
import { NavigationActions, StackActions } from "react-navigation";
import {HeaderBackButton} from 'react-navigation-stack';

//---------------- STYLED COMPONENTS ---------------------------------
//---------------- STYLED COMPONENTS ---------------------------------

const Container = styled.SafeAreaView`
  flex: 1;
  margin: 20px;
`;
const WorkoutList = styled.FlatList`
  flex: 1;
`;
const Title = styled.Text`
  margin-bottom: 10px;
`;

//---- END ------------ STYLED COMPONENTS -------------- END ---------------

const Page = props => {
  let lastWorkout = false;
  if (props.lastWorkout) {
    lastWorkout = props.myWorkouts.find(i=>i.id == props.lastWorkout);
  }

  const goWorkout = workout => {
    props.navigation.navigate('WorkoutChecklist', {workout});
  }

  return (
    <Container>
      {lastWorkout &&
        <>
          <Title>Seu último treino foi:</Title>
          <Workout data={lastWorkout} />
        </>
      }

      <WorkoutList
        data={props.myWorkouts}
        renderItem={({item}) =>
          <Workout
            data={item}
            goAction={()=>goWorkout(item)}
          />
        }
      />
    </Container>
  );
}

Page.navigationOptions = ({navigation}) => {
  const handleBackAction = () => {
    navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'AppTab'})],
    }));
  }

  return {
    title: 'Escolha seu treino',
    headerLeft: <HeaderBackButton onPress={handleBackAction} />
  };
};

const mapStateToProps = state => {
  return {
    myWorkouts: state.userReducer.myWorkouts,
    lastWorkout: state.userReducer.lastWorkout,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
