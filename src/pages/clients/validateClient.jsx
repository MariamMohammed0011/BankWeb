export const validateClient = (data) => {
  const errors = {};

  const onlyLetters = /^[\u0600-\u06FFa-zA-Z ]+$/;
  const onlyNumbers = /^[0-9]+$/;

  if (!data.FirstName.trim()) {
    errors.FirstName = "الاسم الأول مطلوب";
  } else if (!onlyLetters.test(data.FirstName)) {
    errors.FirstName = "الاسم يجب أن يحتوي على أحرف فقط";
  }

  if (!data.MiddleName.trim()) {
    errors.MiddleName = "الاسم الوسط مطلوب";
  }

  if (!data.LastName.trim()) {
    errors.LastName = "الاسم الأخير مطلوب";
  }

  if (!data.IdentityNumber) {
    errors.IdentityNumber = "رقم الهوية مطلوب";
  } else if (!onlyNumbers.test(data.IdentityNumber)) {
    errors.IdentityNumber = "رقم الهوية يجب أن يحتوي على أرقام فقط";
  } else if (data.IdentityNumber.length !== 12) {
    errors.IdentityNumber = "رقم الهوية يجب أن يكون 12 رقم";
  }

  if (!data.IdentityImage) {
    errors.IdentityImage = "صورة الهوية إجبارية";
  }

  if (!data.IncomeSource.trim()) {
    errors.IncomeSource = "مصدر الدخل إجباري";
  } else if (!onlyLetters.test(data.IncomeSource)) {
    errors.IncomeSource = "مصدر الدخل يجب أن يحتوي أحرف فقط";
  }

  if (!data.MonthlyIncome) {
    errors.MonthlyIncome = "الدخل الشهري إجباري";
  } else if (!onlyNumbers.test(data.MonthlyIncome)) {
    errors.MonthlyIncome = "الدخل الشهري يجب أن يكون أرقام فقط";
  }

  if (!data.AccountPurpose.trim()) {
    errors.AccountPurpose = "الغرض من الحساب إجباري";
  }

  if (!data.Phone.trim()) {
    errors.Phone = "رقم الهاتف إجباري";
  } else if (!/^09[0-9]{8}$/.test(data.Phone)) {
    errors.Phone = "رقم الهاتف يجب أن يبدأ بـ 09 ويتكون من 10 أرقام";
  }

  if (!data.Username.trim()) {
    errors.Username = "اسم المستخدم إجباري";
  }

  if (!data.Password.trim()) {
    errors.Password = "كلمة المرور إجبارية";
  } else if (data.Password.length < 6) {
    errors.Password = "الحد الأدنى لكلمة المرور هو 6 أحرف";
  }

  return errors;
};
