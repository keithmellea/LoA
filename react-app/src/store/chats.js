const SHOW_CHAT = "chats/SHOW_CHAT";
const ADD_CHAT = "chats/ADD_CHAT";

const showChat = (list) => ({
  type: SHOW_CHAT,
  payload: list,
});

const addChat = (content) => ({
  type: ADD_CHAT,
  payload: content,
});

export const chatForChannel = () => async (dispatch) => {
  const res = await fetch(`/api/chat/1`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(showChat(data));
  }
};

export const chatPost = (content) => async (dispatch) => {
  const res = await fetch(`/api/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
    }),
  });
  const data = await res.json();
  if (data.errors) {
    return data;
  }
  dispatch(addChat(data));
  return {};
};

export default function chatReducer(state = [], action) {
  let newState;
  switch (action.type) {
    case SHOW_CHAT:
      newState = action.payload.chats;
      return newState;
    case ADD_CHAT:
      newState = [...state, action.payload];
      return newState;
    default:
      return state;
  }
}
