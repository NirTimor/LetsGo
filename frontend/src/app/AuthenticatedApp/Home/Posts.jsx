import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Box } from "@mui/material";
import Post, { LoadingPost } from "../../../components/post";
import { useTripStore } from "../../../stores/tripStore";
import { Async } from "../../../utils";
import Typography, { Link } from "../../../components/Typography";
import usersStore from "../../../stores/usersStore";
import NewPost from "./NewPost";

const Posts = () => {
  const {
    db: { fetch, isLoading },
    postsData,
    hasMoreData,
  } = useTripStore();

  useEffect(() => {
    if (!postsData.length) {
      fetch();
    }
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        gridGap: "15px",
        minWidth: "600px",
        height: "fit-content",
      }}
    >
      <NewPost />
      <Async
        isLoading={isLoading && !postsData.length}
        isNoData={!postsData.length && !isLoading}
        LoadingComponent={
          <>
            <LoadingPost />
            <LoadingPost />
            <LoadingPost />
          </>
        }
        NoDataComponent={
          <Typography variant="body2">No data to display</Typography>
        }
      >
        {postsData.map((trip) => (
          <Post trip={trip} showComments={false} name={usersStore.getName(trip.user_email)} photo={usersStore.getProfilePhoto(trip.user_email)} />
        ))}
        <Async
          isLoading={isLoading}
          isNoData={!hasMoreData}
          NoDataComponent={null}
          LoadingComponent={
            <>
              <LoadingPost />
              <LoadingPost />
              <LoadingPost />
            </>
          }
        >
          <Link textAlign="center" onClick={() => fetch()} sx={{ marginBottom: '30px' }}>
            Show More
          </Link>
        </Async>
      </Async>
    </Box>
  );
};

export default observer(Posts);
