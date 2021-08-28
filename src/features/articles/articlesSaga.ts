import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { call, put } from '@redux-saga/core/effects';
import articlesApi from 'api/articlesApi';
import { getListArticleFromSaga } from './articlesSlice';

interface PayloadActionType {
  offset: number;
  limit: number;
  tag: string;
  author: string;
}

export function* getListArticleSaga(action: PayloadAction<PayloadActionType>): SagaIterator<void> {
  try {
    const { offset, limit, tag, author } = action.payload;
    const res = yield call(articlesApi.getAll, offset, limit, tag, author);

    yield put({
      type: getListArticleFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.error(error);
  }
}
