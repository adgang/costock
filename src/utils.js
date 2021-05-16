function redisKey(prefix, id) {
  if (!prefix || !id) {
    throw "Prefix or id is null prefix:" + prefix + " id:" + id;
  }
  return prefix + ":" + id;
}

function flattenObj(ob) {
  // The object which contains the
  // final result
  let result = {};

  // loop through the object "ob"
  for (const i in ob) {
    // We check the type of the i using
    // typeof() function and recursively
    // call the function again
    if (typeof ob[i] === "object") {
      const temp = flattenObj(ob[i]);
      for (const j in temp) {
        // Store temp in result
        result[i + "." + j] = temp[j];
      }
    }

    // Else store ob[i] in result directly
    else {
      result[i] = ob[i];
    }
  }
  return result;
}

module.exports = { redisKey, flattenObj };
