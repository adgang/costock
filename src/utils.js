function redisKey(prefix, id) {
  if (!prefix || !id) {
    throw "Prefix or id is null prefix:" + prefix + " id:" + id;
  }
  return prefix + ":" + id;
}

module.exports = { redisKey };
