const initialState = {
  name: '',
  level: '',
  workoutDays: [],
  myWorkouts: [],
  lastWorkout: '',
  dailyProgress: ['2019-09-13', '2019-09-12'],
};

export default (state= initialState, action) => {
  switch (action.type) {
    case 'USER_SET_NAME':
      return {...state, name: action.payload.name};
    case 'USER_SET_WORKOUTDAYS':
      return {...state, workoutDays: action.payload.workoutDays};
  }

  return state;
}
