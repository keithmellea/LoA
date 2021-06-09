
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addScroll } from "../../store/scroll";

import '../addScrollForm/addScrollForm.css';

const AddScrollForm = () => {
    const dispatch = useDispatch();
    const [scroll, setScroll] = useState(" ");
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [published, setPublished] = useState("yyyy-MM-dd");
    const [body, setBody] = useState("");

    // const updateStartDate = (e) => setStartDate(e.target.value);
    // const updateEndDate = (e) => setEndDate(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const newScroll = {
        //   author: author,
        //   title: title,
        //   published: published,
        //   body: body
        // };
        let createdScroll = await dispatch(addScroll(author, title, published, body));
        setScroll(" ");
    }

    return (
      <form key={"id"} onSubmit={handleSubmit} id="add_scroll">
        <label>Author</label>
        <input
          type="text"
          required
          value={author}
          id="author"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label>Title</label>
        <input
          type="text"
          required
          value={title}
          id="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Published</label>
        <input
          type="text"
          required
          value={published}
          id="published"
          onChange={(e) => setPublished(e.target.value)}
        />
        <label>Body</label>
        <input
          type="text"
          required
          placeholder={body}
          id="body"
          onChange={(e) => setBody(e.target.value)}
        />
        <button className="submit-button" type="submit">
          Create Scroll
        </button>
      </form>
    );
}

export default AddScrollForm;
