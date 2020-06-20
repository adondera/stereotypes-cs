const io = require("socket.io-client");
let socket = undefined;
export const withToken = (token) => {
  console.log(token);
  socket = io("ws://localhost:8000", {
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
