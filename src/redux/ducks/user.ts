const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

export const getUser = () => ({
  type: GET_USER,
});
export const setUser = (user: any) => ({
  type: SET_USER,
  user: user,
});

const intialState = {
  user: undefined,
};
export default (state = intialState, action: any) => {
  switch (action.type) {
    case SET_USER:
      const { user } = action;
      return { ...state, user: user };
      default:
        return state
  }
};
