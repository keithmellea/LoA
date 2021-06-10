import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getScrolls, deleteScroll } from "../../store/scroll";

import EditScrollForm from "../EditScrollForm/EditScrollForm";
import "./DeleteList.css";

const DeleteList = () => {
  const scrolls = useSelector((state) => Object.values(state.scroll.scrolls));
  const user = useSelector((state) => state.session.user.username);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getScrolls());
  }, [dispatch]);


  // const updateStartDate = (e) => setStartDate(e.target.value);
  // const updateEndDate = (e) => setEndDate(e.target.value);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(author, title, published, body, scrollId);
  //   let createdScroll = await dispatch(
  //     editScroll(author, title, published, body, scrollId)
  //   );
  // };

  const onDelete = (scrollId) => () => {
    dispatch(deleteScroll(scrollId));
  };

  if (!scrolls) {
    return null;
  } else {
    console.log("scrolls", scrolls);

    return (
      <>
        <ul id="delete-scrolls">
          {scrolls?.map((scroll) => (
            <div id="delete-scroll">
              <li
                className="delete-scroll-items"
                onClick={onDelete(scroll.id)
                }
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
