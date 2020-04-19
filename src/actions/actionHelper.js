export const createAction = (type, payload) => payload === undefined ? { type } : { type, payload };

export const createFnAction = (type, action) => async (dispatch) => {
  const payload = await action(dispatch);
  dispatch({ type, payload });
}
