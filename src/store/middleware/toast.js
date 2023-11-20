const toast = (store) => (next) => (action) => {
  if (action.type === "error") {
  } else return next(action);
};

export default toast;
