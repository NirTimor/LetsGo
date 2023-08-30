import React from "react";
import { observer } from "mobx-react";
import Post, { LoadingPost } from "../../../components/post";
import { useProfileStore } from "../../../stores/profileStore";
import { Async } from "../../../utils";
import Typography, { Link } from "../../../components/Typography";
import usersStore from "../../../stores/usersStore";

const PostsSection = () => {
    const {
        posts: { isLoading, fetch },
        postsData,
        hasMorePosts,
        isPostsFirstPage,
        user
    } = useProfileStore();
    return (
        <Async
          isLoading={isLoading && isPostsFirstPage}
          isNoData={!postsData.length}
          LoadingComponent={
              <>
                  <LoadingPost />
                  <LoadingPost />
                  <LoadingPost />
              </>
          }
          NoDataComponent={
              <Typography variant="body2">No posts to display</Typography>
          }
        >
            {postsData.map((trip) => (
                <Post trip={trip} showComments={false} name={usersStore.getName(trip.user_email)} photo={usersStore.getProfilePhoto(trip.user_email)} />
            ))}
            <Async
              isLoading={isLoading}
              isNoData={!hasMorePosts}
              NoDataComponent={null}
              LoadingComponent={
                  <>
                      <LoadingPost />
                      <LoadingPost />
                      <LoadingPost />
                  </>
              }
            >
                <Link textAlign="center" onClick={() => fetch(user.email)}>
                    Show More
                </Link>
            </Async>
        </Async>
    );
};

export default observer(PostsSection);
