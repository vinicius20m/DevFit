import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import {connect} from 'react-redux';
import uuid from 'uuid/v4';
import { Alert } from "react-native";

import DefaultButton from "../components/DefaultButton";
import CustomModal from '../components/CustomModal';
import ExerciseItemEdit from '../components/ExerciseItemEdit';
import useMuscleImage from "../components/useMuscleImage";

//---------------- STYLED COMPONENTS ---------------------------------
//---------------- STYLED COMPONENTS ---------------------------------

const Container = styled.SafeAreaView`
  flex: 1;
  margin: 20px;
`;
const NameInput = styled.TextInput`
  border: 1px solid #CCC;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  padding: 10px;
`;
const ButtonText = styled.Text`
  color: #FFF;
`;
const ExercisesArea = styled.View`
  flex: 1;
  margin-top: 20px;
  padding-top: 20px;
  border-top-width: 1px;
  border-top-color: #CCC;
`;
const ExercisesList = styled.FlatList`
  flex: 1;
  padding-top: 20px;
`;
const ModalLabel = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-top: 10px;
`;
const ModalMuscles = styled.ScrollView``;
const ModalInput = styled.TextInput`
  width: 100%;
  font-size: 14px;
  color: #333;
  height: 40px;
  border-bottom-width: 1px;
  border-bottom-color: #CCC;
`;
const ModalMuscle = styled.TouchableHighlight`
  width: 50px;
  height: 50px;
  background-color: #EEE;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  opacity: ${props=>props.opacity};
`;
const ModalMuscleImage = styled.Image`
  width: 35px;
  height: 35px;
`;
const ModalExtra = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const ModalExtraItem = styled.View`
  align-items: center;
`;

//---- END ------------ STYLED COMPONENTS -------------- END ---------------

const Page = props => {
  let workout =
    (
      props.navigation.state.params &&
      props.navigation.state.params.workout
    )
    ? props.navigation.state.params.workout
    : false
  ;

  const muscles = ['abs', 'back', 'biceps', 'chest', 'gluteos', 'legs', 'shoulders', 'triceps',];

  const [id, setId] = useState(workout?workout.id:'');
  const [name, setName] = useState(workout?workout.name:'');
  const [exercises, setExercises] = useState(workout?workout.exercises:[]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalId, setModalId] = useState('');
  const [modalName, setModalName] = useState('');
  const [modalMuscle, setModalMuscle] = useState('');
  const [modalSets, setModalSets] = useState('');
  const [modalReps, setModalReps] = useState('');
  const [modalLoad, setModalLoad] = useState('');

  useEffect(()=>{
    props.navigation.setParams({
      workout: {id, name, exercises},
      addWorkout: props.addWorkout,
      editWorkout: props.editWorkout,
    });
  }, [name, exercises]);

  const editExercise = exercise => {
    setModalId(exercise.id);
    setModalName(exercise.name);
    setModalMuscle(exercise.muscle);
    setModalSets(exercise.sets);
    setModalReps(exercise.reps);
    setModalLoad(exercise.load);
    setModalVisible(true);
  }

  const delExercise = exercise => {
    let newExercises = [...exercises];
    newExercises = newExercises.filter(i=>i.id!=exercise.id);
    setExercises(newExercises);
  }

  const modalSave = () => {
    let newExercises = [...exercises];

    if (modalName == '' || modalMuscle == '' || modalSets == '' || modalReps == '') {
      return Alert.alert('Atenção', 'Preencha todas as informações!');
    }

    if (modalId) {
      let index = newExercises.findIndex(i=>i.id == modalId);
      if (index > -1) {
        newExercises[index].name = modalName;
        newExercises[index].muscle = modalMuscle;
        newExercises[index].sets = modalSets;
        newExercises[index].reps = modalReps;
        newExercises[index].load = modalLoad;
      }
    } else {
      let ex = {
        id: uuid(),
        name: modalName,
        muscle: modalMuscle,
        sets: modalSets,
        reps: modalReps,
        load: modalLoad,
      };
      newExercises.push(ex);
    }

    setExercises(newExercises);
    setModalVisible(false);
  }

  const resetModal = () => {
    setModalId('');
    setModalName('');
    setModalMuscle('');
    setModalSets('');
    setModalReps('');
    setModalLoad('');
  }

  const addExercise = () => {
    resetModal();
    setModalVisible(true);
  }

  return (
    <Container>

      {/* ------- MODAL ---------------------- MODAL ---------------------- MODAL ------- */}
      <CustomModal visible={modalVisible} closeAction={()=>setModalVisible(false)} >
        <ModalLabel>Músculo de foco</ModalLabel>
        <ModalMuscles horizontal={true} showsHorizontalScrollIndicator={false}>
          {muscles.map((muscle, index)=>(
            <ModalMuscle onPress={()=>setModalMuscle(muscle)} key={index}
              opacity={modalMuscle== muscle? 1: 0.3} underlayColor="transparent"
            >
              <ModalMuscleImage source={useMuscleImage(muscle)} />
            </ModalMuscle>
          ))}
        </ModalMuscles>

        <ModalLabel>Nome do exercício</ModalLabel>
        <ModalInput value={modalName} onChangeText={setModalName} />

        <ModalExtra>
          <ModalExtraItem>
            <ModalLabel>Séries</ModalLabel>
            <ModalInput keyboardType="numeric" value={modalSets} onChangeText={setModalSets} />
          </ModalExtraItem>
          <ModalExtraItem>
            <ModalLabel>Repetições</ModalLabel>
            <ModalInput keyboardType="numeric" value={modalReps} onChangeText={setModalReps} />
          </ModalExtraItem>
          <ModalExtraItem>
            <ModalLabel>Carga</ModalLabel>
            <ModalInput keyboardType="numeric" value={modalLoad} onChangeText={setModalLoad} />
          </ModalExtraItem>
        </ModalExtra>

        <DefaultButton bgcolor="#4AC34E" onPress={modalSave} underlayColor="green" >
          <ButtonText>Salvar</ButtonText>
        </DefaultButton>
      </CustomModal>
      {/* ------- MODAL ---------------------- END ---------------------- MODAL ------- */}

      <NameInput
        value={name} onChangeText={setName}
        placeholder="Digite o nome do treino"
      />

      <ExercisesArea>
        <DefaultButton bgcolor="#4AC34E" onPress={addExercise} underlayColor="green" >
          <ButtonText>Adicionar Exercício</ButtonText>
        </DefaultButton>

        <ExercisesList
          data={exercises} keyExtractor={item=>item.name}
          renderItem={({item})=>
            <ExerciseItemEdit data={item}
              editAction={()=>editExercise(item)}
              delAction={()=>delExercise(item)}
            />
          }
        />
      </ExercisesArea>
    </Container>
  );
};

Page.navigationOptions = ({navigation}) => {
  let isEdit = (navigation.state.params && navigation.state.params.workout.id)? true: false;

  const SaveWorkoutButton = () => {
    //---------------- STYLED COMPONENTS ---------------------------------
    const SaveArea = styled.TouchableHighlight`
      width: 30px;
      height: 30px;
      justify-content: center;
      align-items: center;
    `;
    const SaveImage = styled.Image`
      width: 25px;
      height: 25px;
    `;
    //---- END ------------ STYLED COMPONENTS -------------- END ---------------

    const handleSave = () => {
      if (navigation.state.params && navigation.state.params.workout) {
        let workout = navigation.state.params.workout;

        if (workout.exercises.length > 0) {
          if (workout.id != '') {
            navigation.state.params.editWorkout(workout);
          } else {
            workout.id = uuid();
            navigation.state.params.addWorkout(workout);
          }

          navigation.goBack();
        } else {
          return Alert.alert('Atenção', 'Você precisa ter pelo menos 1 exercício!');
        }
      }
    }

    return (
      <SaveArea onPress={handleSave} underlayColor="transparent" >
        <SaveImage source={require('../assets/check-black.png')} />
      </SaveArea>
    );
  }

  return {
    title: isEdit? 'Editar Treino': 'Adicionar Treino',
    headerRight: <SaveWorkoutButton />,
    headerRightContainerStyle: {marginRight: 10,},
  };
};

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addWorkout: workout =>dispatch({type: 'USER_ADD_WORKOUT', payload: {workout}}),
    editWorkout: workout =>dispatch({type: 'USER_EDIT_WORKOUT', payload: {workout}}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
