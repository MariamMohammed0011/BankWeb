import { AuthStrategy } from "./AuthStrategy";

export class AdminLoginStrategy extends AuthStrategy {
  loginAction(data, navigate) {
    navigate("/"); // صفحة الادمن الرئيسية
  }
}
