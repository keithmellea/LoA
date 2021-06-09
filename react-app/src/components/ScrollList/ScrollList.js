import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getScrolls, addScroll, editScroll } from "../../store/scroll";

import EditScrollForm from "../EditScrollForm/EditScrollForm";
import "../ScrollList/ScrollList.css";

const ScrollList = () => {

const scrolls = useSelector((state) => state.scroll.scrolls);
const user = useSelector((state) => state.session.user.username);

const dispatch = useDispatch();

useEffect(() => {
  dispatch(getScrolls());
}, [dispatch]);


const [scrollId, setScroll] = useState(1);
const [author, setAuthor] = useState("");
const [title, setTitle] = useState("");
const [published, setPublished] = useState("yyyy-MM-dd");
const [body, setBody] = useState("");

// const updateStartDate = (e) => setStartDate(e.target.value);
// const updateEndDate = (e) => setEndDate(e.target.value);

const handleSubmit = async (e) => {
  
  e.preventDefault();
  console.log(author, title, published, body, scrollId);
  let createdScroll = await dispatch(
    editScroll(author, title, published, body, scrollId)
  );

};

if (!scrolls) {
    return null;
}
else {
console.log("scrolls", scrolls);

  return (
    <>
      <ul id="scrolls">
        {scrolls?.map((scroll) => (
          <div id="scroll">
            <form
              key={"id"}
              onSubmit={handleSubmit}
              style={{ display: "none" }}
              id={`add-scroll-${scroll.id}`}
              className="scroll-form"
            >
              <label>Author</label>
              <input
                type="text"
                required
                placeholder={scroll.author}
                value={author}
                id="author"
                onChange={(e) => {
                    console.log(author);
                    setAuthor(e.target.value)}}
              />
              <label>Title</label>
              <input
                type="text"
                required
                placeholder={scroll.title}
                value={title}
                id="title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Published</label>
              <input
                type="text"
                required
                placeholder={scroll.published}
                value={published}
                id="published"
                onChange={(e) => setPublished(e.target.value)}
              />
              <label>Body</label>
              <input
                type="text"
                required
                placeholder={scroll.body}
                value={body}
                id="body"
                onChange={(e) => setBody(e.target.value)}
              />
              <button className="submit-button" type="submit">
                Create Scroll
              </button>
            </form>
            <li
              className="scroll-items"
              onClick={() => {
                let scrollId = `add-scroll-${scroll.id}`;
                let scrollForm = document.querySelectorAll("scroll-form");
                let scrollGrab = document.getElementById(scrollId);
                scrollGrab.style.display = "flex";
                let listItems = document.querySelectorAll("li.scroll-items");
                listItems.forEach((item) => {
                  item.style.display = "none";
                });
                console.log(listItems);
                // scrollForm.style.display = "flex";
              }}
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

export default ScrollList;
