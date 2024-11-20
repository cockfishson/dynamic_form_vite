export const extractChangedFields = (data, dirtyFields) => {
  const changed = {};

  for (const key in dirtyFields) {
    if (
      typeof dirtyFields[key] === "object" &&
      !Array.isArray(dirtyFields[key])
    ) {
      const nestedChanged = extractChangedFields(data[key], dirtyFields[key]);
      if (Object.keys(nestedChanged).length > 0) {
        changed[key] = nestedChanged;
      }
    } else if (Array.isArray(dirtyFields[key])) {
      changed[key] = data[key]
        .map((item, index) => {
          if (dirtyFields[key][index]) {
            return extractChangedFields(item, dirtyFields[key][index]);
          }
          return null;
        })
        .filter(Boolean);
    } else {
      changed[key] = data[key];
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
