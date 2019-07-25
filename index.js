'use strict';

// YOU KNOW WHAT TO DO //


/**
 * identity: Designed return the given value .
 * 
 * @param {Any datatype} value: The value to return.
 */
function identity(value) {
    return value;
}


/**
 * typeOF: Designed return the type of the given value.
 * 
 * @param {Any datatype} value: The value to examine and return the type of.
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
 * the array.
 */
function first(array, number) {
    var newArray = []; // the storage array for the first values
    var length = array.length; // variable storing the length of the array
    if (typeOf(array) !== 'array') { // if the argument passed for array is not an array, return an empty array
        return newArray;
    }
    else if (number === undefined || typeOf(number) !== 'number') { // otherwise if the number is not given or is not a number only return the last element
        return array[0];
    }
    else {
        if (number > length) { // if the bnumber given is greater than the length make it equal to the length
            number = length; // this is so the following loop does not go out of bounds
        }
        for (var i = 0; i < number; i++) { // loops through the array pushing each value up to the new array 
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
 * array (to keep in proper order).
 */
function last(array, number) {
    var newArray = []; // the storage array for the last values
    var length = array.length; // variable storing the length of the array
    if (typeOf(array) !== 'array') { // if the argument passed for array is not an array, return an empty array
        return newArray;
    }
    else if (number === undefined || typeOf(number) !== 'number') { // otherwise if the number is not given or is not a number only return the last element
        return array[length - 1];
    }
    else {
        if (number > length) { // if the bnumber given is greater than the length make it equal to the length
            number = length; // this is so the following loop does not go out of bounds
        }
        for (var i = length - number; i < length; i++) { // loops through the array starting at the length minues the total number
            newArray.push(array[i]); // pushing each following value into the new array
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
 */
function indexOf(array, value) {
    for (var i = 0; i < array.length; i++) { // loops through the whole array
        if (array[i] === value) { // if the array at the given index is the same as the value return the index
            return i;
        }
    }
    return -1;
}


/**
 * contains: Designed to loop over an Array and return if the given value
 * appears in the array.
 * 
 * @param {Array} array: The Array over which to iterate.
 * @param {Any datatype} value: The value for which to return true if it
 * appears in the array.
 */
function contains(array, value) {
    var checker = false; // initializes the checker to false
    for (var i = 0; i < array.length; i++) {
        // loops through the whole array
        checker = array[i] === value ? true : checker;
        // if the value is in the array the checker will flip to true otherwise it will stay the same
    }
    return checker;
}



/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} func: The Function to be applied to each value in the 
 * collection
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
 */
function unique(array) {
    var newArray = []; // the new array to be filled with unique elements
    each(array, function(element, index, array) { // use of the higher order loop
        if (indexOf(array, element) === index) { //the function to perform on each element of the array
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
 */
function filter(array, func) {
    var newArr = []; // the new array to be filled with elements that resolve to true
    each(array, function(element, index, array) { // higher order loop
        if (func(element, index, array)) { // if the function performed on the current element returns true add it
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
 */
function reject(array, func) {
    var newArr = []; // the new array to be filled with elements that resolve to false
    each(array, function(element, index, array) { // higher order loop
        if (!func(element, index, array)) { // if the function performed on the current element returns flase add it
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
 */
function partition(array, func) {
    var newTrue = filter(array, function(element, index, array) { // saves the filtered (true) values
        return func(element, index, array); // directly passes the given function to the filter
    });
    var newFalse = reject(array, function(element, index, array) { // saves the rejected (false) values
        return func(element, index, array); // directly passes the given function to the reject
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
 */
function map(collection, func) {
    var newArr = []; // the storage array
    each(collection, function(element, index, collection) { // the higher order loop
        newArr.push(func(element, index, collection)); // push each element returned by the given function
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
 */
function pluck(array, property) {
    var newArr = map(array, function(element, index, array) {
        return element[property]; // the function passed to map saying I want to return the value of each element at property key
    });
    return newArr;
}


/**
 * every: Designed to loop over a collection, Array or Object, and return true
 * if every element returns true when passed to the func Function.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} func: The Function to be applied to each value in the 
 * collection
 */
function every(collection, func) {
    var bool = true; // boolean meant as a toggle (if a single one is false the whole thing returns false)
    each(collection, function(element, index, collection) { // higher order loop with function filled with if else cases
        if (func === undefined) { // if no function is passed the collection's values should evaluate to true or false
            if (element === false) {
                bool = false; // flips the toggle
            }
        }
        else {
            if (func(element, index, collection) === false) { // evaluates the function given the element
                bool = false; // flips the toggle
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
 */
function some(collection, func) {
    var bool = false; // boolean meant as a toggle (if a single one is true the whole thing returns true) 
    each(collection, function(element, index, collection) { // higher order loop with function filled with if else cases
        if (func === undefined) { // if no function is passed the collection's values should evaluate to true or false
            if (element === true) {
                bool = true; // flips the toggle
            }
        }
        else {
            if (func(element, index, collection) === true) { // evaluates the function given the element
                bool = true; // flips the toggle
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
 */
function reduce(array, func, seed) {
    var previousResult; // initializing the storage variable
    if (seed !== undefined) { // if the seed is given
        previousResult = seed; // assigns the seed to the storage variable as a starting value 
        each(array, function(element, index, array) { // performs the function on each element of the array
            previousResult = func(previousResult, element, index); // stores the result of the function back into the storage variable
        });
    }
    else if (seed === undefined) { // if the seed is not given
        previousResult = array[0]; // assigns the first value of the array to the storage variable
        each(array.slice(1), function(element, index, array) { // slightly modified from the section above due to using the first value as a seed
            previousResult = func(previousResult, element, index + 1); // must start the loop at the second index so slice and index + 1
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
 */
function extend(object, ...objArray) {
    each(objArray, function(element, index, array) { // loops through rest parameter objArray as an array performing another loop
        each(element, function(value, key, obj) { // second loop going through each key in the object at each index of the array
            object[key] = value; // assigns the new key value pair to the first object
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