import '@fontsource/roboto';
import { Box, makeStyles } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Header, NotFound } from 'components/common';
import HomeLayout from 'components/layout/Home';
import AddArticle from 'features/article/page/AddArticle';
import DetailArticle from 'features/article/page/DetailArticle';
import LoginPage from 'features/auth/pages/LoginPage';
import { selectInAuthorPage, setInAuthorPage } from 'features/profile/profileSlice';
import AuthorPage from 'features/profile/pages/ProfilePage';
import SettingPage from 'features/setting/pages/SettingPage';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    margin: '0 auto',
    fontFamily: 'Roboto, sans-serif',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));

function App() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const inAuthorPage = useAppSelector(selectInAuthorPage);

  // persist state first time of is in author page
  useEffect(() => {
    dispatch(setInAuthorPage(false));
    localStorage.setItem('inAuthorPage', 'false');
  }, [dispatch]);

  return (
    <>
      {!inAuthorPage && <Header />}
      <Box className={classes.root}>
        <Switch>
          <Route path="/" component={HomeLayout} exact />
          <Route path="/auth" component={LoginPage} />
          <Route path="/home" component={HomeLayout} />
          <Route path="/article/create" component={AddArticle} />
          <Route path="/article/:slug" component={DetailArticle} />
          <Route path="/settings" component={SettingPage} />
          <Route path="/profile/:username" component={AuthorPage} exact />
          <Route component={NotFound} />
        </Switch>
      </Box>
    </>
  );
}

export default App;
