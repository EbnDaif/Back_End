import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogData } from "../redux/reducers/blog";
import BlogCard from "./blogcards";
import domain from "./domain";
function BlogList() {
  
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blogSclice.data);
  console.log(blog);
  useEffect(() => {
    dispatch(fetchBlogData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleEdit = (blogPost) => {

  };
  console.log(blog.length);

  const handleDelete = (blogPost) => {
  };
  if (blog.length > 0) {

    return (
      
   
      <div>
        {(blog.map((blog) => (
          <BlogCard
            owner={blog.owner.username}
            id={blog._id}
            title={blog.Title}
            content={blog.content}
            image={domain + blog.image}
            showButtons={true}
            onEdit={() => handleEdit(blog)}
            onDelete={() => handleDelete(blog)}
          />
        )))}
      </div>
    );
   
  } else { return <h1> No any Blogs To show Create one first </h1> }
    
  
}




export default BlogList;
