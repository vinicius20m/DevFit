import React, {useEffect} from "react";
import { StackActions, NavigationActions } from "react-navigation";
import styled from 'styled-components';
import {connect} from 'react-redux';
import Workout from '../components/Workout';
import workoutJson from '../presetWorkouts.json';

//---------------- STYLED COMPONENTS ---------------------------------
//---------------- STYLED COMPONENTS ---------------------------------

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #FFF;
  margin-left: 30px;
  margin-right: 30px;
  margin-top:50px;
`;
const HeaderText = styled.Text`
  font-size: 15px;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;
const NextButton = styled.Button``;
const WorkoutList = styled.FlatList`
  width: 100%;
`;

//---- END ------------ STYLED COMPONENTS -------------- END ---------------

const Page = props => {
  let workoutsLength = props.myWorkouts.length;
  useEffect(()=>{
    props.navigation.setParams({myWorkouts:props.myWorkouts});
  }, [props.myWorkouts]);

  // **
  const addWorkout = item => {
    if (props.myWorkouts.findIndex(i=>i.id==item.id) < 0) {
      props.addWorkout(item);
    } else {
      props.delWorkout(item);
    }
  }

  return (
    <Container>
      <HeaderText>Opções de treino pré-criados com base no seu nível.</HeaderText>
      <HeaderText>
        Você {workoutsLength?'':'não'} selecionou {workoutsLength ?
          (workoutsLength>1 ?
            workoutsLength +' treinos'
          :
            '1 treino'
          )
        :
          'nenhum treino.'
        }
      </HeaderText>

      <WorkoutList
        data={workoutJson} keyExtractor={item=>item.id}
        renderItem={({item}) => <Workout
          data={item} addAction={()=> addWorkout(item)}
        />}
      />
    </Container>
  );
}

Page.navigationOptions = ({navigation}) => {
  let btnNext = 'Ignorar';
  if (navigation.state.params && navigation.state.params.myWorkouts.length > 0) {
    btnNext = 'Concluir';
  }

  const nextAction = () => {
    navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'AppTab'})]
    }));
  };

  return {
    title: '',
    headerRight: <NextButton title={btnNext} onPress={nextAction} />,
    headerRightContainerStyle: {marginRight: 10},
  };
};

const mapStateToProps = state => {
  return {
    myWorkouts: state.userReducer.myWorkouts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addWorkout: workout => dispatch({type: 'USER_ADD_WORKOUT', payload: {workout}}),
    delWorkout: workout => dispatch({type: 'USER_DEL_WORKOUT', payload: {workout}}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
