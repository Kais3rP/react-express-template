/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

/**
 * Create an object composed of the picked object properties even if the props are not its own
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const _pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

module.exports = { pick, _pick };
