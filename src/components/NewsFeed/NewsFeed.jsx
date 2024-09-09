import React from 'react';
import NewsArticle from '../NewsArticle';
import CircularProgress from "@mui/material/CircularProgress";
import {  Box, Typography } from '@mui/material';
export default function NewsFeed({ articles , loading }) {

    if (loading) {
        return (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
        >
        <CircularProgress />
        </Box>
        );
    }       


    if (!articles?.length) {
        return (
        <Typography
        align='center'
        variant='h6'
        color='textSecondary'
        marginTop={4}
        >
            No Articles Found.
        </Typography>
        );
    }



  return (
    <div>
      {articles.map((article) => (
        <NewsArticle key={article.title} {...article} />
      ))}
    </div>
  );
}
