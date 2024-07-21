export interface User {
  id: string;
  email: string;
}

export interface AuthData {
  user: User;
  refreshToken: string;
  accessToken: string;
}

export interface UserSchema {
  authData?: AuthData;
  isAuth: boolean;
}
