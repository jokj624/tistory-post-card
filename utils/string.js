exports.truncate = (text, size) => {
  if (text.length > size) {
    return text.substring(0, size) + '...';
  }

  return text;
};
