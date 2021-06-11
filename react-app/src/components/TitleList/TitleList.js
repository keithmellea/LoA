import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import scrollsReducer, { getScrolls, deleteScroll } from "../../store/scroll";

import '../TitleList/TitleList.css';

const TitleList = () => {
  const scrolls = useSelector((state) => Object.values(state.scroll.scrolls));
  // const user = useSelector((state) => state.session.user.username);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getScrolls());
  }, [dispatch]);

  const showBody = (scroll) => () => {
      const scrollLi = document.querySelectorAll(`.read-scroll`);
      const scrollBody = document.getElementById(`scroll-body-${scroll.id}`);
      scrollLi.forEach(element => {
          element.style.display = "none";
      });
      scrollBody.style.display = "flex";
      console.log(scrollBody);
  };

  if (!scrolls) {
    return null;

  } else {
    return (
      <>
        <div id="title-read">Read Scrolls </div>
        <ul id="read-scrolls">
          {scrolls?.map((scroll) => (
            <div>
              <li
                key={scroll.id}
                id={`read-scroll-${scroll.id}`}
                onClick={showBody(scroll)}
                className="read-scroll"
              >
                {scroll.title}
              </li>
            </div>
          ))}
        </ul>
          {scrolls?.map((scroll) => (
            <div>
              <div id={`scroll-body-${scroll.id}`} className="scroll-bodies">
                {scroll.body}
              </div>
            </div>
          ))}
      </>
    );
  }
};

export default TitleList;
