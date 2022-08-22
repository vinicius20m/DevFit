const initialState = {
  name: '',
  level: '',
  workoutDays: [],
  myWorkouts: [],
  lastWorkout: '',
  dailyProgress: ['2022-08-14', '2022-08-15'],
};

export default (state= initialState, action) => {
  let myWorkouts = [...state.myWorkouts];
  let dailyProgress = [...state.dailyProgress];

  switch (action.type) {
    case 'USER_SET_NAME':
      return {...state, name: action.payload.name};
    case 'USER_SET_WORKOUTDAYS':
      return {...state, workoutDays: action.payload.workoutDays};
    case 'USER_SET_LEVEL':
      return {...state, level: action.payload.level};
    case 'USER_SET_LASTWORKOUT':
      return {...state, lastWorkout: action.payload.id};
    case 'USER_ADD_WORKOUT':
      if (myWorkouts.findIndex(i=>i.id==action.payload.workout.id) < 0) {
        myWorkouts.push(action.payload.workout);
      }
      return {...state, myWorkouts};
    case 'USER_EDIT_WORKOUT':
      let index = myWorkouts.findIndex(i=>i.id == action.payload.workout.id);
      if (index > -1) {
        myWorkouts[index] = action.payload.workout;
      }
      return {...state, myWorkouts};
    case 'USER_DEL_WORKOUT':
      myWorkouts = myWorkouts.filter(i=>i.id!=action.payload.workout.id);
      return {...state, myWorkouts};
    case 'USER_ADD_PROGRESS':
      if (!dailyProgress.includes(action.payload.date)) {
        dailyProgress.push(action.payload.date);
      }
      return {...state, dailyProgress};
    case 'USER_DEL_PROGRESS':
      dailyProgress = dailyProgress.filter(i=>i!= action.payload.date);
      return {...state, dailyProgress};
    case 'USER_RESET':
      return initialState;
  }

  return state;
}
