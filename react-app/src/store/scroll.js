const LOAD = "scrolls/LOAD";
const ADD_SCROLL = "scrolls/ADD_SCROLL";
const DELETE_SCROLL = "scrolls/DELETE_SCROLLS";
const GET_SCROLL = "scrolls/GET_SCROLL";
const SET_SCROLL = "scrolls/SET_SCROLL";
const GRAB_SCROLLS = "scrolls/GRAB_SCROLLS";

const load = (list) => ({
  type: LOAD,
  list,
});

const setScroll = (scrollId) => {
  return {
    type: SET_SCROLL,
    scrollId
  };
};

const add_scroll = (scroll) => ({
  type: ADD_SCROLL,
  scroll,
});

const delete_scroll = (scrollId) => {
  console.log("-----===anything-----------======", scrollId);
  return { type: DELETE_SCROLL, scrollId };
  
};

const get_scroll = (scroll) => ({
  type: GET_SCROLL,
  scroll,
});

const grabScrolls = (scrolls) => ({
  type: GRAB_SCROLLS,
  scrolls,
});

export const getUsersScrolls = () => async (dispatch) => {
  const response = await fetch("/api/scrolls/", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    // console.log("OK")
    const usersScrolls = await response.json();
    dispatch(load(usersScrolls));
  }
};

//Get all Scrolls
export const getScrolls = () => async (dispatch) => {
  const response = await fetch("/api/scrolls/");
  const scrolls = await response.json();

  dispatch(grabScrolls(scrolls));
};

export const editScroll = (author, title, published, body, scrollId) => async (dispatch) => {
  const res = await fetch(`/api/scrolls/${scrollId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ author, title, published, body, scrollId }),
  });

  if (!res.ok) throw res;

  const data = await res.json();
  dispatch(setScroll(data.id));
  return res;
};

//POST a new scroll
export const addScroll = (author, title, published, body) => async (dispatch) => {
  const res = await fetch("/api/scrolls/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      author, title, published, body
    }),
  });
  if (!res.ok) throw res;
  const data = await res.json();
  console.log("THIS IS THE SCROLL WE ARE TRYING TO CRAETE", data);
  dispatch(add_scroll(data));
  dispatch(setScroll(data.id));
  return;
};

export const deleteScroll = (id) => async (dispatch) => {
  const res = await fetch(`/api/scrolls/${id}`, {
    method: "DELETE",
  });
  // const data = await res.json();
  dispatch(delete_scroll(id));
  return;
};

export const getScroll = (id) => async (dispatch) => {
  console.log("-------------------test-------------", id);
  const res = await fetch(`/api/scrolls/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("----------------test2------------", res);
  const data = await res.json();
  console.log(
    "---------------------THE DATA THAT WE ARE DISPATCHING=============",
    data
  );
  dispatch(get_scroll(data));
};

const initialState = {
  list: [],
  current: null,
  scrolls: {}
};

const scrollsReducer = (state = initialState, action) => {
  console.log("state", state, action);
  let newState = { ...state };
  switch (action.type) {
    case GRAB_SCROLLS:
      return {...state, scrolls: action.scrolls}

    case ADD_SCROLL: {
      state.scrolls[action.scroll.id] = action.scroll;
      return {
        ...state,
      };
    }

    case DELETE_SCROLL: {
      console.log("actionId", action.scrollId);
      console.log("state.scrolls", state.scrolls);
      delete state.scrolls[action.scrollId];
      return {
        ...state,
      };
    }

    case SET_SCROLL: {
      return { ...state, current: state.scrolls[action.scrollId]}
    }

    case GET_SCROLL: {
      return {
        ...state,
        current: action.scroll,
      };
    }

    default:
      return state;
  }
};

export default scrollsReducer;
