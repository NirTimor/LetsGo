import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { Box } from "@mui/material";
import Page from "../Page";
import { useProfileStore, tabs } from "../../../stores/profileStore";
import InfoSection from "./InfoSection";
import Tabs from "./Tabs";
import PostsSection from "./PostsSection";
import FavoritePostsSection from "./FavoritePostsSection";
import { border } from "../../../utils";
import RightBar from "../../../components/rightBar";

const Profile = () => {
  const { fetchUser, posts, favoritePosts, tab, reset } = useProfileStore();
  const { email } = useParams();
  useEffect(() => {
    fetchUser.fetch(email);
    posts.fetch(email);
    favoritePosts.fetch(email);
    return reset;
  }, [email]);

  return (
    <Page>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            border,
            borderRadius: "4px",
            padding: "0 20px",
            backgroundColor: "background.paper",
            minHeight: "calc(100vh - 100px)",
          }}
        >
          <InfoSection />
          <Box
            sx={{
              borderLeft: border,
              height: "100%",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              paddingBottom: "10px",
            }}
          >
            <Tabs />
            <Box
              sx={{
                minWidth: "600px",
                display: "grid",
                gridGap: "15px",
              }}
            >
              {tab === tabs.posts ? <PostsSection /> : <FavoritePostsSection />}
            </Box>
          </Box>
        </Box>
        <RightBar />
      </Box>
    </Page>
  );
};

export default observer(Profile);
