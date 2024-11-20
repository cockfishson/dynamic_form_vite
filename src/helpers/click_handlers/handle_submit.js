export const handleEventSubmit = async ({
  id = null,
  data,
  apiFunction,
  handleNavigation,
  setLoading = null,
}) => {
  if (setLoading) setLoading(true);
  const formattedData = {
    ...data,
    date:
      data.date instanceof Date
        ? data.date.toISOString().substring(0, 10)
        : data.date,
  };

  try {
    if (id) {
      await apiFunction(id, formattedData);
    } else {
      await apiFunction(formattedData);
    }
    handleNavigation("/");
  } catch (error) {
    console.error("Event submission failed - ", error);
  } finally {
    if (setLoading) setLoading(false);
  }
};
