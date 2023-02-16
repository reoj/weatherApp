import { createReducer, on, Action } from '@ngrx/store';
import * as errorActions from '../actions/error.actions';
import { VisibleError } from 'src/app/models/error.type';

interface ErrorState {
  hasErrors: boolean;
  loggedErrors: VisibleError[];
}

const initialState = { hasErrors: false, loggedErrors: [] } as ErrorState;

export function errorReducer (state = initialState, action: errorActions.ErrorActions) {
  switch (action.type) {
    case errorActions.RAISE_ERROR:
      return {
        ...state,
        hasErrors: true,
        loggedErrors: [...state.loggedErrors, action.payload]
      };
    case errorActions.CLEAR_ALL_ERRORS:
      return {
        ...state,
        hasErrors: false,
        loggedErrors: []
      };
    default:
      return state;
  }
}