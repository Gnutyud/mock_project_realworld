import { Avatar, Box, Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Article from 'components/common/Article';
import { setTag } from 'features/articles/articlesSlice';
import { Link, NavLink } from 'react-router-dom';
import Loading from '../../../components/common/Loading';
import { followProfile, selectProfile, unFollowProfile } from '../profileSlice';
import ProfileArticlePagination from './ProfileArticlePagination';
import ProfileMenuTabs from './ProfileMenuTabs';

const HEIGHT = window.screen.height;

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 400,
  },
  media: {
    height: HEIGHT / 3,
    position: 'relative',
  },
  settingBtn: {
    position: 'absolute',
    right: '20px',
    bottom: '15px',
    backgroundColor: 'white',
    padding: '8px 10px',
    color: 'black',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    gap: '3px',
    '&:hover': {
      opacity: '0.8',
    },
  },
  followBtn: {
    cursor: 'pointer',
    position: 'absolute',
    right: '20px',
    bottom: '15px',
    backgroundColor: 'white',
    padding: '8px 10px',
    color: 'black',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    gap: '3px',
    '&:hover': {
      opacity: '0.8',
    },
  },

  profileImage: {
    position: 'relative',
    top: '-110px',
    justifyContent: 'center',
    width: theme.spacing(HEIGHT / 40),
    height: theme.spacing(HEIGHT / 40),
    border: '5px solid white',
    margin: 'auto',
  },
  profileInfoContainer: {
    position: 'relative',
    top: '-100px',
    margin: 'auto',
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 0,
  },
  userTag: {
    marginTop: 0,
  },
  contentContainer: {
    position: 'relative',
    top: '-90px',
  },
  articleListContainer: {
    marginTop: '30px',
  },
  articleList: {
    width: '100%',
  },
  navlink: {
    textDecoration: 'none',
  },
}));

interface ProfileProps {
  author: ProfileType;
  articleList?: ArticleType[];
  isLoading?: boolean;
  articleCount?: number;
  tagByArticle?: string;
  currentPage?: number;
  articlePerPage?: number;
  username?: string;
  displayMode: number;
  handleDisplay: (choose: number) => void;
}

const Profile: React.FC<ProfileProps> = ({
  author,
  articleList,
  isLoading,
  articleCount,
  tagByArticle,
  currentPage,
  articlePerPage,
  username,
  displayMode,
  handleDisplay,
}) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  console.log('username ', username);

  // auth
  const local: any = localStorage.getItem('user');
  const curUser = JSON.parse(local);
  const userFromStore = useAppSelector(selectProfile);
  const followingState = userFromStore.following;

  // display article list
  const articleListElement =
    articleList?.length === 0 ? null : (
      <Box>
        {isLoading ? (
          <Loading />
        ) : (
          <Box className={classes.articleList}>
            {articleList?.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </Box>
        )}
      </Box>
    );

  // handle go to profile home page
  const handleGoToProfileHomePage = () => {
    dispatch(setTag(null));
  };

  // handle follow action
  const handleFollow = () => {
    if (curUser) {
      if (!followingState) {
        dispatch({
          type: followProfile.type,
          payload: { username: username },
        });
      } else {
        dispatch({
          type: unFollowProfile.type,
          payload: { username: username },
        });
      }
    }
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="https://st.quantrimang.com/photos/image/2018/09/20/anh-bia-facebook-mau-den-1.jpg"
      >
        {curUser?.username === username ? (
          <Link className={classes.settingBtn} to="/settings">
            <SettingsIcon />
            Edit Profile Setting
          </Link>
        ) : (
          <Box className={classes.followBtn} onClick={handleFollow}>
            {followingState ? <CheckIcon /> : <AddIcon />}
            Following
          </Box>
        )}
      </CardMedia>

      <Avatar src={author?.image} className={classes.profileImage} />
      <Box className={classes.profileInfoContainer}>
        <NavLink
          to={`/profile/${username}`}
          onClick={handleGoToProfileHomePage}
          className={classes.navlink}
        >
          <Typography align={'center'} className={classes.userName} variant="h4" gutterBottom>
            {author?.username}
          </Typography>
        </NavLink>
        <p style={{ width: '60%', margin: '0 auto', textAlign: 'center' }}>{author?.following}</p>
        <p style={{ width: '60%', margin: '0 auto', textAlign: 'center' }}>{author?.bio}</p>
      </Box>
      <CardContent className={classes.contentContainer}>
        <ProfileMenuTabs option={displayMode} handleDisplay={handleDisplay} />
        <Box className={classes.articleListContainer}>{articleListElement}</Box>
        {articleCount && articleCount > 0 ? (
          <ProfileArticlePagination
            articleCount={articleCount}
            articlePerPage={articlePerPage}
            tagByArticle={tagByArticle}
            currentPage={currentPage}
            username={username}
          />
        ) : (
          'No Article To Show...'
        )}
      </CardContent>
    </Card>
  );
};
export default Profile;
