import { AdminLoginStrategy } from "./AdminLoginStrategy";
import { TellerLoginStrategy } from "./TellerLoginStrategy";
import { ManagerLoginStrategy } from "./ManagerLoginStrategy";

export class LoginStrategyFactory {
  static getStrategy(role) {
    switch (role) {
      case "Admin":
        return new AdminLoginStrategy();

      case "Teller":
        return new TellerLoginStrategy();

      case "Manager":
        return new ManagerLoginStrategy();

      default:
        throw new Error("Unknown role");
    }
  }
}
