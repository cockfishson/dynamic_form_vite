export const extractChangedFields = (data, dirtyFields, defaultValues = {}) => {
  const changed = {};

  for (const key in dirtyFields) {
    const dataValue = data[key];
    const dirtyValue = dirtyFields[key];
    const defaultValue = defaultValues[key];

    if (dirtyValue && typeof dirtyValue === "object") {
      if (dataValue instanceof Date) {
        const defaultDate = defaultValue ? new Date(defaultValue) : null;
        if (
          (!defaultDate && dataValue) ||
          (defaultDate && dataValue.getTime() !== defaultDate.getTime())
        ) {
          changed[key] = dataValue.toISOString().substring(0, 10);
        }
      } else if (Array.isArray(dataValue)) {
        const hasArrayChanges = dirtyValue.some((item, index) => {
          if (!item) return false;
          const currentItem = dataValue[index];
          const defaultItem = defaultValue?.[index] || {};
          return Object.keys(item).some(
            (key) => currentItem[key] !== defaultItem[key]
          );
        });

        if (hasArrayChanges) {
          changed[key] = dataValue;
        }
      } else {
        const nestedChanged = extractChangedFields(
          dataValue,
          dirtyValue,
          defaultValue
        );
        if (Object.keys(nestedChanged).length > 0) {
          changed[key] = nestedChanged;
        }
      }
    } else if (dirtyValue) {
      if (dataValue !== defaultValue) {
        if (dataValue instanceof Date) {
          changed[key] = dataValue.toISOString().substring(0, 10);
        } else {
          changed[key] = dataValue;
        }
      }
    }
  }

  return changed;
};

export const extractFilledFields = (data) => {
  const filled = {};

  for (const key in data) {
    const value = data[key];

    if (value instanceof Date) {
      filled[key] = value;
    } else if (value && typeof value === "object") {
      if (Array.isArray(value)) {
        const arrayFilled = value
          .map((item) => extractFilledFields(item))
          .filter((item) => Object.keys(item).length > 0);
        if (arrayFilled.length > 0) {
          filled[key] = arrayFilled;
        }
      } else {
        const nestedFilled = extractFilledFields(value);
        if (Object.keys(nestedFilled).length > 0) {
          filled[key] = nestedFilled;
        }
      }
    } else if (value !== undefined && value !== null && value !== "") {
      filled[key] = value;
    }
  }

  return filled;
};
