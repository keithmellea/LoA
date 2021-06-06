const LOAD = "scrolls/LOAD";
const ADD_SCROLL = "scrolls/ADD_SCROLL";
const DELETE_SCROLL = "scrolls/DELETE_SCROLLS";
const GET_SCROLL = "scrolls/GET_SCROLL";
const GRAB_SCROLLS = "scrolls/GRAB_SCROLLS";

const load = (list) => ({
  type: LOAD,
  list,
});

const add_scroll = (scroll) => ({
  type: ADD_SCROLL,
  scroll,
});

const delete_scroll = (scroll) => ({
  type: DELETE_SCROLL,
  scroll,
});

const get_scroll = (scroll) => ({
  type: GET_SCROLL,
  scroll,
});

const grabScrolls = (scrolls) => ({
  type: GRAB_SCROLLS,
  scrolls,
});

// export const getUsersScrolls = () => async (dispatch) => {
//   const response = await fetch("/api/scrolls/", {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (response.ok) {
//     // console.log("OK")
//     const usersScrolls = await response.json();
//     dispatch(load(usersScrolls));
//   }
// };

//Get all Scrolls
export const getScrolls = () => async (dispatch) => {
  const response = await fetch("/api/scrolls/");
  const scrolls = await response.json();
  if (scrolls.errors) {
    return;
  }

  dispatch(grabScrolls(scrolls));
};

//POST a new scroll
export const addScroll = (img_url, scroll_name) => async (dispatch) => {
  console.log(img_url, scroll_name);
  const res = await fetch("/api/scrolls/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      img_url,
      scroll_name,
    }),
  });
  const data = await res.json();
  console.log("THIS IS THE SCROLL WE ARE TRYING TO CRAETE", data);
  dispatch(add_scroll(data));
  return;
};

export const deleteScroll = (id) => async (dispatch) => {
  const res = await fetch(`/api/scrolls/${id}`, {
    method: "DELETE",
  });
  console.log("THIS IS THE SCROLL ID", id);
  const data = await res.json();
  console.log("THIS IS THE DATA FROM DELETION", data);
  dispatch(delete_scroll(data));
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
  current: [],
};

const scrollsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      return {
        ...state,
        list: action.list,
      };
    }

    case ADD_SCROLL: {
      return {
        ...state,
        list: action.scroll,
      };
    }

    case DELETE_SCROLL: {
      delete state[action.scroll.id];
      return {
        ...state,
      };
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
