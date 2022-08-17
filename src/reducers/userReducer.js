const initialState = {
  name: '',
  level: '',
  workoutDays: [],
  myWorkouts: [],
  lastWorkout: '',
  dailyProgress: ['2019-09-13', '2019-09-12'],
};

export default (state= initialState, action) => {
  let myWorkouts = [...state.myWorkouts];

  switch (action.type) {
    case 'USER_SET_NAME':
      return {...state, name: action.payload.name};
    case 'USER_SET_WORKOUTDAYS':
      return {...state, workoutDays: action.payload.workoutDays};
    case 'USER_SET_LEVEL':
      return {...state, level: action.payload.level};
    case 'USER_ADD_WORKOUT':
      if (myWorkouts.findIndex(i=>i.id==action.payload.workout.id) < 0) {
        myWorkouts.push(action.payload.workout);
      }
      return {...state, myWorkouts};
    case 'USER_DEL_WORKOUT':
      myWorkouts = myWorkouts.filter(i=>i.id!=action.payload.workout.id);
      return {...state, myWorkouts};
  }

  return state;
}
