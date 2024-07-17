export interface User {
  userData: {
    id: string;
    email: string;
  };
  refreshToken: string;
  accessToken: string;
}

export interface UserSchema {
  authData?: User;
  isAuth: boolean;
}
