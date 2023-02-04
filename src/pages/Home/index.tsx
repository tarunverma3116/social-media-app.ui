import React, { useEffect } from "react";
import useFeedPosts from "hooks/queries/posts/useFeedPosts";
import PostCard from "components/Cards/PostCard";

type Props = {};

const Home = (props: Props) => {
  const [posts, setPosts] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const FetchPosts = async () => {
    setLoading(true);
    const response = await useFeedPosts();
    console.log("home posts", response);
    setPosts(response.data);
    setLoading(false);
  };

  useEffect(() => {
    FetchPosts();
  }, []);

  return (
    <section>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col basis-2/3">
          {posts.map((post: any) => {
            return <PostCard post={post} />;
          })}
        </div>
        <div className="flex flex-col basis-1/3"></div>
      </div>
    </section>
  );
};

export default Home;
