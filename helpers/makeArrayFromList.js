const makeArrayFromList = list => list.replace(/(\r\n|\n|\r)/gm, ',').split(',');
module.exports = makeArrayFromList