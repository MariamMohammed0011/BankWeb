import { AuthStrategy } from "./AuthStrategy";

export class TellerLoginStrategy extends AuthStrategy {
  loginAction(data, navigate) {
    navigate("/"); 
  }
}
