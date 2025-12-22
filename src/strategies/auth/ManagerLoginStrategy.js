import { AuthStrategy } from "./AuthStrategy";

export class ManagerLoginStrategy extends AuthStrategy {
  loginAction(data, navigate) {
    navigate("/"); // أو "/manager-dashboard"
  }
}
