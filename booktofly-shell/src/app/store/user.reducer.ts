import { createReducer, on } from '@ngrx/store';
import { setUser, clearUser } from './user.actions';

export interface UserState {
  name: string | null;
  email: string | null;
}

export const initialState: UserState = {
  name: null,
  email: null
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, { name, email }) => ({ name, email })),
  on(clearUser, () => initialState)
);
