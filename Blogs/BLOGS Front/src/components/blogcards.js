import React from "react";
import { useNavigate } from "react-router-dom";
import Api from "../config/api";
import { notifySuccess, notifyerror } from "./notify";
import { useDispatch } from "react-redux";
import { fetchBlogData } from "../redux/reducers/blog";

const BlogCard = ({
  id,
  owner,
  title,
  content,
  image,
  onEdit,
  onDelete,
  showButtons,
}) => {
  const disbatch = useDispatch();

  const navigate = useNavigate();
  onEdit = (blogcard) => {
    navigate(`/updateblog/${id}`);
  };

  onDelete = async (blogcard) => {
    console.log(id);
    await Api.delete(`blogs/delete/${id}`)
      .then(() => {
        notifySuccess("blog deleted successfully");
        disbatch(fetchBlogData());
      })
      .catch((e) => {
        const errorMessage =
          e?.response?.data?.message || e?.response?.data?.error;
        notifyerror(errorMessage);
      });
  };
  return (
    <div className="card">
      <div className="content">
        <div className="header">
          <h1>Created By : {owner}</h1>
        </div>
        <div className="header">
          <h3>Title: {title}</h3>
        </div>
        <div className="description">
          <p>{content}</p>
        </div>
      </div>
      <div className="image">
        <img
          src={image}
          style={{ width: "280px", height: "200px", position: "center" }}
          alt=""
        />
      </div>
      {showButtons && (
        <div className="actions">
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
