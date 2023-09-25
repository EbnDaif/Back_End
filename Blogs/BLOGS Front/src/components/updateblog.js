import React, { useEffect, useRef, useState } from "react";
import Api from "../config/api";
import { notifySuccess, notifyerror } from "./notify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogData } from "../redux/reducers/blog";
import domain from "./domain";



function Uodateblog () {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const blog = useSelector((state) => state.blogSclice.data);
  console.log(blog);

      const editblog = blog.find((ele) => ele._id)

  const imgf = useRef()
  const [loading, setloading] = useState(false);
  const [image, setimage] = useState(null);
  const [inputs, setinputs] = useState({
    Title: "",
    content: "",
    image: "",
  });
    console.log(editblog);
      useEffect(() => {
        dispatch(fetchBlogData());
        setinputs(editblog);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlechange = (e) => {
    setinputs((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  }; 

  const handleSubmit = (event) => {
    setloading(true);
    event.preventDefault();
    try {
      Api.patch(
        "/blogs/Update",
        { ...inputs, image: image },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
        .then(() => {
          console.log(inputs.image);
          console.log(image);

          setloading(false);
          notifySuccess("updated");
          dispatch(fetchBlogData());
          navigate("/myblogs");
        })
        .catch((e) => {
          const errorMessage =
            e?.response?.data?.message || e?.response?.data?.error;
          setloading(false);

          notifyerror(errorMessage);
        });

      console.log(inputs);
    } catch (error) {
      console.log(error);
      
      notifyerror(error.message);
    }
  };
    const uploadimage = () => {
      imgf.current.click()
    };
    const fileupload = (e) => { 
        let  image = e.target.files[0]
        setimage( image )
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Title">
          <b>Title</b>
        </label>
        <input
          name="Title"
          type="text"
          placeholder="Title"
          value={inputs?.Title}
          onChange={handlechange}
        />
        <label htmlFor="content">
          <b>content</b>
        </label>
        <input
          name="content"
          type="text"
          placeholder="content"
          value={inputs?.content}
          onChange={handlechange}
        />

        <input
          name="imagef"
          type="file"
          ref={imgf}
          style={{ display: "none" }}
          onChange={fileupload}
        />


        <img src={(image&&URL.createObjectURL(image))|| domain+inputs.image} style={{ width: "300px", height: "300px" ,position:"center" }} alt="" />
    

        <button
          disabled={loading}
          className="uploadimage"
          onClick={uploadimage}
          type="button"
        >
          Upload image
        </button>
        <button disabled={loading} className="sbtn" type="submit">
          update
        </button>
      </form>
    </div>
  );
}


export default Uodateblog;
