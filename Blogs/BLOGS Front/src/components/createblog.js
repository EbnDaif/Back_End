import React, { useRef, useState } from "react";
import Api from "../config/api";
import { notifySuccess, notifyerror } from "./notify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchBlogData } from "../redux/reducers/blog";


function Createblog () {
  const navigate = useNavigate();
  const disbatch= useDispatch()
    const imgf= useRef()
  const [loading, setloading] = useState(false);
  const [inputs, setinputs] = useState({
    Title: "",
    content: "",
    image: "",
  });
    
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
        Api.post("/blogs/create", inputs, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(() => {
          setloading(false);
            notifySuccess("Created");
            setinputs({
              Title: "",
              content: "",
              image: "",
            });
          disbatch(fetchBlogData());
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
        let image = e.target.files[0]
        setinputs({ ...inputs, image })
    }
    console.log(inputs);
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
          value={inputs.Title}
          onChange={handlechange}
        />
        <label htmlFor="content">
          <b>content</b>
        </label>
        <input
          name="content"
          type="text"
          placeholder="content"
          value={inputs.content}
          onChange={handlechange}
        />
       
        <input
          name="imagef"
                  type="file"
                  ref={imgf}
          style={{ display: "none" }}
          onChange={fileupload}
              />
              <img src={(inputs.image&&URL.createObjectURL(inputs.image))} style={{ width: "300px", height: "300px" ,position:"center" }} alt="" />
        <button disabled={loading}  className="uploadimage" onClick={uploadimage} type="button">
          Upload image
        </button>
        <button disabled={loading} className="sbtn" type="submit">
          create
        </button>
      </form>
    </div>
  );
}


export default Createblog;
