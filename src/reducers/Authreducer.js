const instate = {
  id: "",
  name: ""
};

export default (data = instate, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...data,
        id: action.payload.id,
        name: action.payload.name
      };
    case "LOGOUT_SUCCESS":
      return {
        ...data,
        id: "",
        username: ""
      };

    default:
      return data;
  }
};
