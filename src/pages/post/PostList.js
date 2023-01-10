import React from 'react'
import MainHeader from '../../components/MainHeader'
import { Grid } from "@mui/material";
import { PostListImpl } from './PostListImpl';

export const PostList = () => {
  return (
    <React.Fragment>
      <MainHeader value={0} />
      <Grid container spacing={2} sx={{ pt: "100px", px: 5 }}>
        <Grid item xs={12}>
          <PostListImpl />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
