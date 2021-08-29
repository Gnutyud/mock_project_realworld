import settingReducer from './../features/setting/settingSlice';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import articleReducer from '../features/articles/articlesSlice';
import tagReducer from '../features/tags/tagsSlice';
import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/profile/profileSlice';
import authorReducer from '../features/author/authorSlice';
import { oneArticleReducer } from 'features/article/articleSlice';

// create saga middleware
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    article: articleReducer,
    tag: tagReducer,
    setting: settingReducer,
    profile: profileReducer,
    author: authorReducer,
    oneArticleReducer: oneArticleReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

// run saga
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
