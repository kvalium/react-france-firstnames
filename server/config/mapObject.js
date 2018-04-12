const mapObject = (keys, ...args) => {
  if(keys == null || !keys instanceof Array) 
    throw "undefined keys";
  let results = {};
  // map each args value to related key index
  keys.map((key, i) => {
    if(args[i]) results[key] = args[i]
  });

  return results;
}

// functions export
module.exports = {
  map: mapObject
};