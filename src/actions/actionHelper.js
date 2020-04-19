export const createAction = (type, payload) => {
  if (!type) console.error('Action not found');

  return payload === undefined ? { type } : { type, payload };
}

export const createFnAction = (type, action) => async (dispatch) => {
  const payload = await action();
  dispatch({ type, payload });
}
