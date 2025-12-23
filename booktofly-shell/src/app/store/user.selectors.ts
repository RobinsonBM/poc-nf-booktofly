import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state
);

export const selectUserName = createSelector(
  selectUserState,
  (state: UserState) => state.name
);

export const selectUserEmail = createSelector(
  selectUserState,
  (state: UserState) => state.email
);
