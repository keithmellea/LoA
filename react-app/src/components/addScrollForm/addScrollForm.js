import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addScroll } from "../../store/scroll";


const addScrollForm = () => {
    const dispatch = useDispatch();
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [published, setPublished] = useState("yyyy-MM-dd");
    const [body, setBody] = useState("");

    // const updateStartDate = (e) => setStartDate(e.target.value);
    // const updateEndDate = (e) => setEndDate(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newScroll = {
          author: author,
          title: title,
          published: published,
          body: body
        };
        let createdScroll = await dispatch(addScroll(newScroll));
        setBooking("");
    }

    return (
      <form key={"id"} onSubmit={handleSubmit} id="add_scroll">
        <label>Author</label>
        <input type="text" require value={author} onChange={setAuthor} />
        <label>Title</label>
        <input type="text" require value={title} onChange={setTitle} />
        <label>Published</label>
        <input type="text" require value={published} onChange={setPublished} />
        <label>Body</label>
        <input type="text" require value={body} onChange={setBody} />
        <button className="submit-button" type="submit">
          Book
        </button>
      </form>
    );
}

export default addScrollForm;
