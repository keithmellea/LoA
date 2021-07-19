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
      const scrollDiv = document.getElementById(
        `scroll-title-author-container-${scroll.id}`
      );
      const scrollBody = document.getElementById(`scroll-body-${scroll.id}`);
      const readScroll = document.getElementById(`title-read`);
      const scrollTitle = document.getElementById(`scroll-title-${scroll.id}`);
      const scrollAuthor = document.getElementById(`scroll-author-${scroll.id}`);
      scrollLi.forEach(element => {
          element.style.display = "none";
      });
      scrollBody.style.display = "flex";
      scrollDiv.style.display = "flex";
      scrollTitle.style.display = "flex";
      scrollAuthor.style.display = "flex";
      readScroll.style.display = "none";
      console.log(scrollBody);
  };

  if (!scrolls) {
    return null;

  } else {
    return (
      <>
        <div id="scroll-list-container">
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
              <div
                className={`scroll-title-author-container`}
                id={`scroll-title-author-container-${scroll.id}`}
              >
                <div id={`scroll-title-${scroll.id}`} className="scroll-titles">
                  {scroll.title}
                </div>
                <div
                  id={`scroll-author-${scroll.id}`}
                  className="scroll-authors"
                >
                  {scroll.author}
                </div>
                <div id={`scroll-body-${scroll.id}`} className="scroll-bodies">
                  {scroll.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
};

export default TitleList;
