const removeDoublicates = arr => 
  arr
    .sort()
    .filter((element, index) => (element !== arr[index - 1]));

module.exports = removeDoublicates