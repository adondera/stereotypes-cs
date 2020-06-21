const io = require("socket.io-client");
let socket = undefined;
export const withToken = (token) => {
  socket = io(`${process.env.REACT_APP_SOCKETS_URL}`, {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: "Bearer " + token,
        },
      },
    },
  });
};

export const startSocket = () => {
  socket.on("free-laptops", () => {
  });
};

export const switchListening = (dispatch, hasActiveChild) => {
  socket.off("free-laptops");
  if (hasActiveChild) {
    socket.on("free-laptops", () => {
    });
  } else {
    socket.on("free-laptops", () => {
      getChild(dispatch);
    });
  }
  return { type: "LISTENING_SWITCHED" };
};

export const getChild = (dispatch) => {
  socket.emit("free", "I want free", (data) => {
    if (data) {
      dispatch({ type: "REGISTER_CHILD", child: data });
    }
  });
};
