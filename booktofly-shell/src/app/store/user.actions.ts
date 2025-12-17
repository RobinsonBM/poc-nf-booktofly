import { createAction, props } from '@ngrx/store';

export const setUser = createAction(
  '[User] Set User',
  props<{ name: string; email: string }>()
);

export const clearUser = createAction('[User] Clear User');
