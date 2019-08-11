'use strict';

// YOU KNOW WHAT TO DO //


/**
 * identity: Designed return the given value .
 * 
 * @param {Any datatype} value: The value to return.
 * 
 * @return {Any datatype} The value passed as the parameter.
 */
function identity(value) {
    return value;
}


/**
 * typeOF: Designed return the type of the given value.
 * 
 * @param {Any datatype} value: The value to examine and return the type of.
 * 
 * @return {String} The type of value.
 */
function typeOf(value) {
    if (Array.isArray(value)) {
        return 'array';
    }
    else if (value === null) {
        return 'null';
    }
    else {
        return typeof value;
    }
}


/**
 * first: Designed to loop over an Array and return the first N number of
 * values in the collection.
 * 
 * @param {Array} array: The Array over which to iterate.
 * @param {Number} number: The number of values to take from the beginning of 
 * the array. If number is larger than array length it is defaulted to the length,
 * and if the number is not a number or undefined default it to 0.
 * 
 * @return  {Array} the first Number number of values in the array.
 */
function first(array, number) {
    var newArray = [];
    var length = array.length;
    if (typeOf(array) !== 'array') {
        return newArray;
    }
    else if (number === undefined || typeOf(number) !== 'number') {
        return array[0];
    }
    else {
        if (number > length) {
            number = length;
        }
        for (var i = 0; i < number; i++) {
            newArray.push(array[i]);
        }
        return newArray;
    }
}


/**
 * last: Designed to loop over an Array and return the last N number of values
 * in the collection.
 * 
 * @param {Array} array: The Array over which to iterate.
 * @param {Number} number: The number of values to take from the end of the
 * array (to keep in proper order). If number is larger than array length it is 
 * defaulted to the length, and if the number is not a number or undefined 
 * default it to the last element in the array.
 * 
 * @return {Array} The last Number number of values in the array.
 */
function last(array, number) {
    var newArray = [];
    var length = array.length;
    if (typeOf(array) !== 'array') {
        return newArray;
    }
    else if (number === undefined || typeOf(number) !== 'number') {
        return array[length - 1];
    }
    else {
        if (number > length) {
            number = length;
        }
        for (var i = length - number; i < length; i++) {
            newArray.push(array[i]);
        }
        return newArray;
    }
}


/**
 * indexOf: Designed to loop over an Array and return the index of the first
 * occurrence of the given value.
 * 
 * @param {Array} array: The Array over which to iterate.
 * @param {Any Datatype} value: The value for which to return the first index
 * at which it appears in the array.
 * 
 * @return {Number} The index of the first occurrence of value in the array.
 */
function indexOf(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return i;
        }
    }
    return -1;
}


/**
 * contains: Designed to loop over an Array and return true if the given value
 * appears in the array.
 * 
 * @param {Array} array: The Array over which to iterate.
 * @param {Any datatype} value: The value for which to return true if it
 * appears in the array.
 * 
 * @return {Boolean} A boolean indicating whether or not value is in the array.
 */
function contains(array, value) {
    var checker = false;
    for (var i = 0; i < array.length; i++) {
        checker = array[i] === value ? true : checker;
    }
    return checker;
}



/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} func: The Function to be applied to each value in the 
 * collection.
 */
function each(collection, func) {
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            func(collection[i], i, collection);
        }
    }
    else {
        for (var key in collection) {
            func(collection[key], key, collection);
        }
    }
}


/**
 * unique: Designed to loop over an Array and return the Array without
 * duplicate values.
 * 
 * @param {Array} array: The Array over which to iterate.
 * 
 * @return {Array} An array with without duplicate values.
 */
function unique(array) {
    var newArray = [];
    each(array, function(element, index, array) {
        if (indexOf(array, element) === index) {
            newArray.push(element);
        }
    });
    return newArray;
}


/**
 * filter: Designed to loop over an Array and returns the values for which the
 * given function returns true as an Array.
 * 
 * @param {Array} array: The Array over which to iterate.
 * @param {Function} func: The Function to be applied to each value in the 
 * collection.
 * 
 * @return {Array} An array with only values that pass the through the filter.
 */
function filter(array, func) {
    var newArr = [];
    each(array, function(element, index, array) {
        if (func(element, index, array)) {
            newArr.push(element);
        }
    });
    return newArr;
}


/**
 * reject: Designed to loop over an Array and returns the values for which the
 * given function returns false as an Array.
 * 
 * @param {Array} array: The Array over which to iterate.
 * @param {Function} func: The Function to be applied to each value in the 
 * collection.
 * 
 * @return {Array} An array with only values that didn't pass through the filter.
 */
function reject(array, func) {
    var newArr = [];
    each(array, function(element, index, array) {
        if (!func(element, index, array)) {
            newArr.push(element);
        }
    });
    return newArr;
}


/**
 * partition: Designed to loop over an Array and return an Array filled with
 * the results of both filter and reject as nested Arrays
 * 
 * @param {Array} array: The Array over which to iterate.
 * @param {Function} func: The Function to be applied to each value in the 
 * collection.
 * 
 * @return {Array} An array containing two sub arrays with the results of filter and reject in that order.
 */
function partition(array, func) {
    var newTrue = filter(array, function(element, index, array) {
        return func(element, index, array);
    });
    var newFalse = reject(array, function(element, index, array) {
        return func(element, index, array);
    });
    var newArr = [newTrue, newFalse];
    return newArr;
}


/**
 * map: Designed to loop over a collection, Array or Object, and applies the 
 * func Function to each value in the collection and save them to a new Array
 * to return.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} func: The Function to be applied to each value in the 
 * collection.
 * 
 * @return {Array} An array with the values from the collection modified by func.
 */
function map(collection, func) {
    var newArr = [];
    each(collection, function(element, index, collection) {
        newArr.push(func(element, index, collection));
    });
    return newArr;
}


/**
 * pluck: Designed to loop over an Array of Objects and return the property
 * value for each Object as an Array.
 * 
 * @param {Array} array: The collection over which to iterate.
 * @param {String} property: The property of the Objects for which to save the
 * values of.
 * 
 * @return {Array} An array with values with the property key from the array of objects.
 */
function pluck(array, property) {
    var newArr = map(array, function(element, index, array) {
        return element[property];
    });
    return newArr;
}


/**
 * every: Designed to loop over a collection, Array or Object, and return true
 * if every element returns true when passed to the func Function.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} func: The Function to be applied to each value in the 
 * collection.
 * 
 * @return {Boolean} A boolean indicating if every item in collection passes the func filter function.
 */
function every(collection, func) {
    var bool = true;
    each(collection, function(element, index, collection) {
        if (func === undefined) {
            if (element === false) {
                bool = false;
            }
        }
        else {
            if (func(element, index, collection) === false) {
                bool = false;
            }

        }
    });
    return bool;
}


/**
 * some: Designed to loop over a collection, Array or Object, and return true
 * if at least one element returns true when passed to the func Function.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} func: The Function to be applied to each value in the 
 * collection
 * 
 * @return {Boolean} A boolean indicating if at least one item in collection passes the func filter function.
 */
function some(collection, func) {
    var bool = false;
    each(collection, function(element, index, collection) {
        if (func === undefined) {
            if (element === true) {
                bool = true;
            }
        }
        else {
            if (func(element, index, collection) === true) {
                bool = true;
            }

        }
    });
    return bool;
}


/**
 * reduce: Designed to loop over an Array and perform the func Function on each
 * element combining into a single value using a seed initially if given or
 * the first value of the Array.
 * 
 * @param {Array} array: The collection over which to iterate.
 * @param {Function} func: The Function to be applied to each value in the 
 * collection.
 * @param {Any datatype} seed: The optional seed to start using the func
 * Function with.
 * 
 * @return {Any datatype} The value of array reduced with the func function.
 */
function reduce(array, func, seed) {
    var previousResult;
    if (seed !== undefined) {
        previousResult = seed;
        each(array, function(element, index, array) {
            previousResult = func(previousResult, element, index);
        });
    }
    else if (seed === undefined) {
        previousResult = array[0];
        each(array.slice(1), function(element, index, array) {
            previousResult = func(previousResult, element, index + 1);
        });
    }
    return previousResult;
}

/**
 * extend: Designed to loop over any number of Objects and add each key value
 * pair to an initial object.
 * 
 * @param {Object} object: The Object in which to add key value pairs.
 * @param {Array of Objects} ...objArray: The rest parameter filled with 
 * Objects and used as an array.
 * 
 * @return {Object} The original object with each key value pair added from the rest parameter.
 */
function extend(object, ...objArray) {
    each(objArray, function(element, index, array) {
        each(element, function(value, key, obj) {
            object[key] = value;
        });
    });
    return object;
}

module.exports.identity = identity;
module.exports.typeOf = typeOf;
module.exports.first = first;
module.exports.last = last;
module.exports.indexOf = indexOf;
module.exports.contains = contains;
module.exports.each = each;
module.exports.unique = unique;
module.exports.filter = filter;
module.exports.reject = reject;
module.exports.partition = partition;
module.exports.map = map;
module.exports.pluck = pluck;
module.exports.every = every;
module.exports.some = some;
module.exports.reduce = reduce;
module.exports.extend = extend;