import { ADD_USER, DELETE_USER, EDIT_USER } from "../../Constants/constants";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload];
    case EDIT_USER:
      return state.map((user) => {
        if (user.id === action.payload) {
          return {
            ...user,
            ...action.payload,
          };
        }
        return user;
      });
    case DELETE_USER:
      return state.filter((user) => user.id !== action.payload);
    default:
      return state;
  }
};
