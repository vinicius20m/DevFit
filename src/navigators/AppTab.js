import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import CustomTabBar from "../components/CustomTabBar";

import HomeStack from "./HomeStack";
import MyWorkoutsStack from "./MyWorkoutsStack";
import WorkoutStack from "./WorkoutStack";

export default createBottomTabNavigator({
  HomeStack,
  MyWorkoutsStack,
  WorkoutStack: {
    screen: WorkoutStack,
    navigationOptions: {tabBarVisible: false,},
  },
}, {
  tabBarComponent: props => (
    <CustomTabBar
      {...props}
      items={[
        {
          type: 'regular',
          text: 'Início',
          icon: require('../assets/home.png'),
          route: 'HomeStack'
        },
        {
          type: 'big',
          icon: require('../assets/dumbbell.png'),
          route: 'WorkoutStack'
        },
        {
          type: 'regular',
          text: 'Meus Treinos',
          icon: require('../assets/myworkouts.png'),
          route: 'MyWorkoutsStack'
        },
      ]}
    />
  )
});
