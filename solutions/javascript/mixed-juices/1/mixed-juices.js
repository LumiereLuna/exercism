// @ts-check
//
// The line above enables type checking for this file. Various IDEs interpret
// the @ts-check directive. It will give you helpful autocompletion when
// implementing this exercise.

/**
 * Determines how long it takes to prepare a certain juice.
 *
 * @param {string} name
 * @returns {number} time in minutes
 */
export function timeToMixJuice(name) {
  let result = 2.5;
  switch (name) {
    case "Pure Strawberry Joy":
      result = 0.5;
      break;

    case "Energizer":
    case "Green Garden":
      result = 1.5;
      break;

    case "Tropical Island":
      result = 3;
      break;

    case "All or Nothing":
      result = 5;
      break;
  }
  return result;
}

/**
 * Calculates the number of limes that need to be cut
 * to reach a certain supply.
 *
 * @param {number} wedgesNeeded
 * @param {string[]} limes
 * @returns {number} number of limes cut
 */
export function limesToCut(wedgesNeeded, limes) {
  let tally = 0;
  let i = 0;
  while (tally < wedgesNeeded && i < limes.length) {
    switch (limes[i]) {
      case "small":
        tally += 6;
        break;

      case "medium":
        tally += 8;
        break;

      case "large":
        tally += 10;
        break;
    }
    i++;
  }
  return i;
}

/**
 * Determines which juices still need to be prepared after the end of the shift.
 *
 * @param {number} timeLeft
 * @param {string[]} orders
 * @returns {string[]} remaining orders after the time is up
 */
export function remainingOrders(timeLeft, orders) {
  let i = 0;
  let val = timeToMixJuice(orders[i]);
  while (timeLeft > val && i < orders.length) {
    timeLeft -= val;
    i++;
    val = timeToMixJuice(orders[i]);
  }
  return orders.slice(i + 1);
}
