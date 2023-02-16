
import { Weather } from 'src/app/models/weatherReport.type';
import { Action, createAction, props } from '@ngrx/store';
import { VisibleError } from 'src/app/models/error.type';

export const RAISE_ERROR = '[Error] Raise Error';
export class RaiseError implements Action {
  readonly type = RAISE_ERROR;
  constructor(public payload: VisibleError) {}
}

export const CLEAR_ALL_ERRORS = '[Error] Clear All Errors';
export class ClearAllErrors implements Action {
  readonly type = CLEAR_ALL_ERRORS;
}

export type ErrorActions = RaiseError | ClearAllErrors;