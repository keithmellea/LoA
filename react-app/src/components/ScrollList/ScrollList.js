import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getScrolls, addScroll, editScroll } from "../../store/scroll";

import EditScrollForm from "../EditScrollForm/EditScrollForm";
import "../ScrollList/ScrollList.css";

const ScrollList = () => {

const scrolls = useSelector((state) => Object.values(state.scroll.scrolls));
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
  let createdScroll = await dispatch(
    editScroll(author, title, published, body, scrollId)
  );

};

if (!scrolls) {
    return null;
}
else {

  return (
    <>
      <ul id="scrolls">
        <div className="edit-title"> Edit Scrolls </div>
        {scrolls?.map((scroll) => (
          <div id="scroll">
            <EditScrollForm scroll={scroll} />
            <li
              key={scroll.id}
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
