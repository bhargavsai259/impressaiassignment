const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'EDIT_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? { ...user, ...action.payload } : user
        ),
      };

    case "LIST_USERS":
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
