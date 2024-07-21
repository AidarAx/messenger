export type { UserSchema, User, AuthData } from "./model/types/userSchema.ts";
export { userReducer, userActions } from "./model/slice/userSlice.ts";
export { selectUserIsAuth } from "./model/selectors/selectUserIsAuth/selectUserIsAuth.ts";
export { selectUserAuthData } from "./model/selectors/selectUserAuthData/selectUserAuthData.ts";
