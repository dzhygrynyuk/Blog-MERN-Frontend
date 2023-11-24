import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

import axios from '../axios';

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Error while get post item');
      });
  }, []);

  if(isLoading){
    return <Post isLoading={isLoading} isFullPost />
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:5000${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Scott Davis",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Test comment",
          },
          {
            user: {
              fullName: "Brian Fletcher",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
