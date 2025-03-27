const actions = {
  updateUserProfile: (state, payload) => {
    const updatedState = { ...state };
    updatedState.auth = payload;
    return updatedState;
  },
};

export const { updateUserProfile } = actions;
