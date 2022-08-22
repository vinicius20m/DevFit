import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import {connect} from 'react-redux';
import Workout from "../components/Workout";

//---------------- STYLED COMPONENTS ---------------------------------
//---------------- STYLED COMPONENTS ---------------------------------

const Container = styled.SafeAreaView`
  flex: 1;
`;
const WorkoutList = styled.FlatList`
  flex: 1;
  padding: 20px;
`;

//---- END ------------ STYLED COMPONENTS -------------- END ---------------

const Page = props => {
  const editWorkout = workout => {
    props.navigation.navigate('EditWorkout', {workout});
  }

  return (
    <Container>
      <WorkoutList
        data={props.myWorkouts}
        renderItem={({item}) =>
          <Workout
            data={item}
            editAction={()=>editWorkout(item)}
            delAction={()=>props.delWorkout(item)}
          />
        }
      />
    </Container>
  );
}

Page.navigationOptions = ({navigation}) => {
  //---------------- STYLED COMPONENTS ---------------------------------
  const ButtonArea = styled.TouchableHighlight`
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
  `;
  const ButtonImage = styled.Image`
    width: 25px;
    height: 25px;
  `;
  //---- END ------------ STYLED COMPONENTS -------------- END ---------------

  const AddWorkoutButton = () => {
    const btnAction = () => {
      navigation.navigate('EditWorkout');
    }

    return (
      <ButtonArea onPress={btnAction} underlayColor="transparent" >
        <ButtonImage source={require('../assets/add.png')} />
      </ButtonArea>
    );
  }


  return {
    title: 'Meus Treinos',
    headerRight: <AddWorkoutButton />,
    headerRightContainerStyle: {
      marginRight: 10,
    },
  };
};

const mapStateToProps = state => {
  return {
    name: state.userReducer.name,
    myWorkouts: state.userReducer.myWorkouts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    delWorkout: workout => dispatch({type: 'USER_DEL_WORKOUT', payload: {workout}}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
