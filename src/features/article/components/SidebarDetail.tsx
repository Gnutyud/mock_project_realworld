import { Box, Divider, IconButton, makeStyles, Typography } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { toggleComment } from '../articleSlice';
import ButtonSplit from './ButtonSplit';
import { useAppDispatch } from 'app/hooks';
import { favoriteRequest } from 'features/articles/articlesSlice';
import { upperFirstLetter } from 'share/methods/upperFirst';

const useStyle = makeStyles((theme) => ({
  position: {
    position: 'fixed',
    width: '19%',
    marginTop: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      position: 'static',
      width: '100%',
    },
  },
  name: {
    textDecoration: 'none',
    fontSize: theme.spacing(3),
    fontWeight: 'bold',
    color: 'black',
    '&:hover': {
      transition: 'all 0.5s',
      fontSize: theme.spacing(4),
      cursor: 'pointer',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  bio: {
    marginTop: theme.spacing(3),
    fontSize: '15px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  actionContainer: {
    marginTop: '20px',
    display: 'flex',
    lineHeight: '48px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
    },
  },
}));

function SidebarDetail({ article }: { article: ArticleType }) {
  const dispatch = useAppDispatch();
  const classes = useStyle();
  const local: any = localStorage.getItem('user');
  const curUser = JSON.parse(local);
  // handle favorite
  const handleFavorite = () => {
    let favoritePayload: FavoritePayloadProps = {
      slug: article.slug,
      favorited: article.favorited,
    };
    dispatch(favoriteRequest(favoritePayload));
  };
  // Show comment
  const onShowComment = () => {
    dispatch(toggleComment());
  };
  if (!article) {
    return <h1>Loading...</h1>;
  }
  return (
    <Box className={classes.position}>
      <NavLink className={classes.name} to={`/profile/${article?.author?.username}`}>
        {upperFirstLetter(article?.author?.username)}
      </NavLink>
      <Typography className={classes.bio}>{article?.author?.bio}</Typography>
      <Divider light />
      <Box className={classes.actionContainer}>
        <Box>
          <IconButton aria-label="like" color="default" onClick={handleFavorite}>
            {article?.favorited ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
          </IconButton>
          <span>{article?.favoritesCount}</span>
        </Box>
        <Box>
          <React.Fragment key="right">
            <IconButton aria-label="comment" color="default" onClick={onShowComment}>
              <ChatBubbleOutlineIcon />
            </IconButton>
          </React.Fragment>
          <span>100</span>
        </Box>
        <Box>
          {curUser?.username === article?.author?.username && (
            <ButtonSplit slug={article.slug} username={article?.author?.username} />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default SidebarDetail;
