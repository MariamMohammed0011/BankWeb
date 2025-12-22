// src/services/decorators/ClientServiceDecorator.js

export const withLogging = (clientService) => ({
  ...clientService, // نحافظ على كل الدوال الأصلية
  addClient: async (formData) => {
    console.log("[Decorator] محاولة إضافة عميل:", formData); // قبل التنفيذ
    try {
      const result = await clientService.addClient(formData); // استدعاء الدالة الأصلية
      console.log("[Decorator] تم إضافة العميل بنجاح:", result); // بعد التنفيذ
      return result;
    } catch (err) {
      console.error("[Decorator] خطأ أثناء إضافة العميل:", err);
      throw err; // إعادة الخطأ ليتم التعامل معه لاحقاً
    }
  },
});
