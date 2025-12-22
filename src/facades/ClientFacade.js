
import { useClientService } from "../services/ClientService";
import { useAccountService } from "../services/AccountClientService";
import { useAccountTypeService } from "../services/AccountService";
import { useFeatureService } from "../services/FeatureService";
import { withLogging } from "../services/decorators/ClientServiceDecorator";

export const useClientFacade = () => {
  const clientService = withLogging(useClientService(), "ClientService");
  const accountService = withLogging(useAccountService(), "AccountService");
  const accountTypeService = withLogging(useAccountTypeService(), "AccountTypeService");
  const featureService = withLogging(useFeatureService(), "FeatureService");

  const registerClientWithAccount = async (clientData, accountTypeId) => {
    try {
      const newClient = await clientService.addClient(clientData);
      const clientId = newClient.clientId;

      const account = await accountService.addAccount(
        clientId,
        accountTypeId,
        0,
        new Date().toISOString().split("T")[0]
      );

      return { success: true, client: newClient, account };
    } catch (err) {
      console.error("ERROR in Facade:", err);
      return { success: false, error: err };
    }
  };

  const createAccountTypeWithFeatures = async (typeData, features) => {
    try {
      const accountType = await accountTypeService.addAccountType(typeData);

      if (features?.length > 0) {
        for (let f of features) {
          await featureService.assignFeatureToAccountTypes(accountType.id, [f]);
        }
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  const loadClientCreationData = async () => {
    const types = await accountTypeService.getAccountTypes();
    return { accountTypes: types };
  };

  return {
    registerClientWithAccount,
    createAccountTypeWithFeatures,
    loadClientCreationData,
  };
};
