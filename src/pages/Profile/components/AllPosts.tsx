import React from "react";

type Props = {
  posts: any;
};

const AllPosts = (props: Props) => {
  return (
    props.posts && (
      <div className="w-full grid grid-cols-3 gap-3">
        {props.posts.map((post: any, key: any): JSX.Element => {
          return (
            <div className="w-full h-[200px] bg-gray-200">
              <img
                src={`https://pixelpark-images.s3.amazonaws.com/${post.image}`}
                alt="post"
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>
    )
  );
};

export default AllPosts;
