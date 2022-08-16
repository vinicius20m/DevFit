import React from "react";
import styled from "styled-components/native";
import { connect } from "react-redux";

import DefaultButton from "../components/DefaultButton";
import { Alert } from "react-native";

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #FFF;
  margin-left: 30px;
  margin-right: 30px;
`;
const HeaderText = styled.Text`
  font-size: 22px;
  color: #333;
  margin-top: 50px;
  margin-bottom: 50px;
`;
const NameInput = styled.TextInput`
  border: 1px solid #CCC;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  padding: 10px;
`;
const NextButton = styled.Button``;

const Page = props => {
  const nextAction = () => {
    if (!props.name) {
      return Alert.alert('Atenção', 'Você precisa informar um nome!');
    }

    props.navigation.navigate('StarterDias');
  }

  const handleChangeName = t => {
    props.setName(t);
    props.navigation.setParams({name:t});
  }

  return (
    <Container>
      <HeaderText>Qual é o seu Nome?</HeaderText>
      <NameInput
        value={props.name} onChangeText={handleChangeName}
        autoFocus={true}
        autoCapitalize="words"
        onSubmitEditing={nextAction}
      />
    </Container>
  );
}

Page.navigationOptions = ({navigation}) => {
  const nextAction = () => {
    if(!navigation.state.params || !navigation.state.params.name) {
      return Alert.alert('Atenção', 'Você precisa informar um nome!');
    }
    navigation.navigate('StarterDias');
  }

  return {
    title: '',
    headerRight: <NextButton title="Próximo" onPress={nextAction} />,
    headerRightContainerStyle: {marginRight: 10},
  };
};

const mapStateToProps = state => {
  return {name: state.userReducer.name};
};

const mapDispatchToProps = dispatch => {
  return {setName: name => dispatch({type: 'USER_SET_NAME', payload: {name}})};
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
