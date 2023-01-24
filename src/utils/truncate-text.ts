export const truncText = (text: string) => {
  const truncatedText = text
    ? text.substring(0, 5) +
      "..." +
      text.substring(text.length - 4, text.length)
    : "";
  return truncatedText;
};
