const removeSpecialChars = (str) => str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

module.exports = removeSpecialChars;