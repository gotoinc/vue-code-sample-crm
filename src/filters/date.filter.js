import store from "../store";

export default (value, format = "date") => {
  const options = {};

  if (format.includes("date")) {
    (options.day = "2-digit"),
      (options.month = "long"),
      (options.year = "numeric");
  }
  if (format.includes("time")) {
    (options.hour = "2-digit"),
      (options.minute = "2-digit"),
      (options.second = "2-digit");
  }

  const locale = store.state.info.info.locale || "en";
  return Intl.DateTimeFormat(locale, options).format(new Date(value));
};
