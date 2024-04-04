export interface IUser {
  email: string;
}

export interface IState {
  user: IUser;
  loading: boolean;
  error: null | string;
}

export interface IAction {
  type: string;
  payload: never;
}

export interface IValidationError {
  [key: string]: string;
}

export enum FirebaseErrorType {
  InvalidEmail = 'auth/invalid-email',
  InvalidPassword = 'auth/invalid-credential',
  TooManyRequsts = 'auth/too-many-requests',
}
