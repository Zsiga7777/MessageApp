import { registerUser } from "./register.auth.controller";
import {activateUser} from "./activate.auth.controller"
import {forgotPassword} from "./forgot.auth.controller"
import {resetPassword} from "./resetPasswordController"
import { login } from "./login.auth.controller";
import { changePassword } from "./changePasswordController";

export { registerUser, activateUser, forgotPassword, resetPassword, login, changePassword }