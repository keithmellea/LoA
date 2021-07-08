import React, {useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getScrolls, deleteScroll } from "../../store/scroll";

import "./DeleteList.css";

const DeleteList = () => {
  const scrolls = useSelector((state) => Object.values(state.scroll.scrolls));
  // const user = useSelector((state) => state.session.user.username);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getScrolls());
  }, [dispatch]);



  const onDelete = (scrollId) => () => {
    dispatch(deleteScroll(scrollId));
  };

  if (!scrolls) {
    return null;
  } else {

    return (
      <>
        <div id="title-delete"> Destroy Scrolls </div>
        <ul id="delete-scrolls">
          {scrolls?.map((scroll) => (
            <div id="delete-scroll">
              <li
                key={scroll.id}
                className="delete-scroll-items"
                onClick={onDelete(scroll.id)}
              >
                {scroll.title}
              </li>
            </div>
          ))}
        </ul>
      </>
    );
  }
};

export default DeleteList;
