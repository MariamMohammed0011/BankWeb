
export const validateAccount = ({
  clientId,
  accountTypeId,
  balance,
  createdAt,
}) => {
  const errors = {};

  if (!clientId) {
    errors.clientId = "العميل مطلوب";
  } else if (isNaN(clientId)) {
    errors.clientId = "رقم العميل غير صالح";
  }

  if (!accountTypeId) {
    errors.accountTypeId = "نوع الحساب مطلوب";
  } else if (isNaN(accountTypeId)) {
    errors.accountTypeId = "نوع الحساب غير صالح";
  }

  if (!balance) {
    errors.balance = "الرصيد مطلوب";
  } else if (isNaN(balance)) {
    errors.balance = "الرصيد يجب أن يكون رقمًا";
  }

  if (!createdAt) {
    errors.createdAt = "تاريخ الإنشاء مطلوب";
  }

  return errors;
};
