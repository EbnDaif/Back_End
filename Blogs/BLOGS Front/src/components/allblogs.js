import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchallBlogData } from "../redux/reducers/blog";
import BlogCard from "./blogcards";
import domain from "./domain";
function AllblogList() {
  const dispatch = useDispatch();
  const allblogs = useSelector((state) => state.blogSclice.alldata);
  console.log(allblogs);
  useEffect(() => {
    dispatch(fetchallBlogData());
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
if (allblogs.length > 0) {
  return (
    <div>
      {allblogs &&
        allblogs.map((blog) => (
          <BlogCard
            owner={blog.owner.username}
            id={blog._id}
            title={blog.Title}
            content={blog.content}
            image={domain + blog.image}
            showButtons={false}
          />
        ))}
    </div>
  );
} else {
  return <h1> No one created a Blog To show Create one first </h1>;
}
}

export default AllblogList;
