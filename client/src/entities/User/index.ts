export type { UserSchema, User, AuthData } from "./model/types/userSchema.ts";
export { userReducer, userActions } from "./model/slice/userSlice.ts";
export { selectUserIsAuth, selectUserAuthData } from "./model/selectors";
