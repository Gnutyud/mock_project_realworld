import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  createStyles,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch } from 'app/hooks';
import clsx from 'clsx';
import { favoriteRequest, setTag } from 'features/articles/articlesSlice';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { convertArticleDate } from 'share/methods/dateFormat';
import { upperFirstLetter } from 'share/methods/upperFirst';
import Popup from './Popup';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      minHeight: '200px',
      marginBottom: '20px',
      [theme.breakpoints.down('md')]: {
        borderRight: 'none',
      },
    },
    card: {
      display: 'flex',
      justifyContent: 'space-between',
      marginRight: '30px',
      width: '90%',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        margin: '0',
        flexDirection: 'column',
      },
    },
    cardLeft: {
      flex: '1',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    authorName: {
      fontWeight: 600,
      fontSize: '1.2rem',
      position: 'relative',
      '&:hover $popup': {
        display: 'Block',
        position: 'absolute',
        backgroundColor: 'white',
        border: '1px solid black',
        left: '80px',
        top: '-15px',
      },
    },
    description: {
      fontSize: '1.6rem',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    avatar: {
      backgroundColor: blue[400],
    },
    cardAction: {
      height: '80%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'row',
      },
    },
    chip: {
      marginRight: '5px',
    },
    favoritesContainer: {
      width: '100%',
      textAlign: 'right',
      [theme.breakpoints.down('sm')]: {
        width: 'auto',
        minWidth: '75px',
      },
    },
    link: {
      textDecoration: 'none',
    },
    title: {
      cursor: 'pointer',
    },
    popup: {
      display: 'none',
      minHeight: '150px',
      minWidth: '300px',
      boxShadow: '0 8px 60px 0 rgba(103, 151, 255, .11)',
      padding: '10px',
      borderRadius: '5px',
    },
  })
);

interface ArticleProps {
  article: ArticleType;
}

const queryString = require('query-string');

const Article: React.FC<ArticleProps> = ({ article }) => {
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch();
  const dispatch = useAppDispatch();

  const { slug, author, title, updatedAt, description, favorited, favoritesCount, tagList } =
    article;

  // update tags from store
  const handleClickTag = (tagLabel: string) => {
    dispatch(setTag(tagLabel));

    // sync url param
    const queryParams = { tag: tagLabel, page: '1' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  // handle go to article detail
  const handleGoToArticleDetail = () => {
    history.push(`/article/${slug}`);
  };
  // handle favorite
  const handleFavorite = () => {
    console.log(favorited);
    let favoritePayload: FavoritePayloadProps = { slug: slug, favorited: favorited };
    dispatch(favoriteRequest(favoritePayload));
  };
  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <Box className={classes.cardLeft}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar} src={author?.image}>
                {author?.username[0].toUpperCase()}
              </Avatar>
            }
            title={
              <Box className={classes.authorName} component="div" display="flex">
                <Link className={classes.link} to={`/profile/${author?.username}`}>
                  {upperFirstLetter(author?.username)}
                </Link>
                <Box className={classes.popup}>
                  <Popup article={article} />
                </Box>
              </Box>
            }
            subheader={convertArticleDate(updatedAt)}
          />
          <CardContent>
            <Box
              className={clsx(classes.description, classes.title)}
              fontWeight="fontWeightMedium"
              onClick={handleGoToArticleDetail}
            >
              {title}
            </Box>
            <Typography variant="body2" color="textSecondary" component="p">
              {description?.slice(0, 30) + ' ...'}
            </Typography>
          </CardContent>
        </Box>

        <Box>
          <CardActions className={classes.cardAction}>
            <Box className={classes.favoritesContainer}>
              {favoritesCount}
              <IconButton aria-label="add to favorites" onClick={handleFavorite}>
                {favorited ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
              </IconButton>
            </Box>
            <Box>
              {tagList?.map((tag) => (
                <Chip
                  className={classes.chip}
                  key={nanoid()}
                  label={tag}
                  onClick={() => handleClickTag(tag)}
                />
              ))}
            </Box>
          </CardActions>
        </Box>
      </Card>
    </Box>
  );
};

export default Article;
