export const replaceWithHypens = (textInput) => {
  return textInput.replace('(', '').replace(')', '').replace(/_|\s/g, '-');
};
