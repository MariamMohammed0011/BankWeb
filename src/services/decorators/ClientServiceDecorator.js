
export const withLogging = (clientService) => ({
  ...clientService, 
  addClient: async (formData) => {
    console.log("[Decorator] محاولة إضافة عميل:", formData); 
    try {
      const result = await clientService.addClient(formData); 
      console.log("[Decorator] تم إضافة العميل بنجاح:", result); 
      return result;
    } catch (err) {
      console.error("[Decorator] خطأ أثناء إضافة العميل:", err);
      throw err; 
    }
  },
});
