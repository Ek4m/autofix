export default function objectToFormData(
  obj: object,
  formData: FormData = new FormData(),
  parentKey?: string,
): FormData {
  if (obj === null || obj === undefined) {
    return formData;
  }

  // File / Blob
  if (obj instanceof File || obj instanceof Blob) {
    if (!parentKey) {
      throw new Error("File requires a parent key");
    }

    formData.append(parentKey, obj);
    return formData;
  }

  // Date
  if (obj instanceof Date) {
    if (!parentKey) {
      throw new Error("Date requires a parent key");
    }

    formData.append(parentKey, obj.toISOString());
    return formData;
  }

  // Array
  if (Array.isArray(obj)) {
    obj.forEach((value, index) => {
      objectToFormData(value, formData, `${parentKey}[${index}]`);
    });

    return formData;
  }

  // Object
  if (typeof obj === "object") {
    Object.entries(obj).forEach(([key, value]) => {
      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      objectToFormData(value, formData, formKey);
    });

    return formData;
  }

  // Primitive values
  if (!parentKey) {
    throw new Error("Primitive value requires a parent key");
  }

  formData.append(parentKey, String(obj));

  return formData;
}
