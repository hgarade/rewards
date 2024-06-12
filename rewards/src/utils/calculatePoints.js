/**
 *
 * @param {customer data} data
 * @returns object of calculated points customer wise
 */
export const getCustomerDataWithCalculatedPoints = (data) => {
  const customerPoints = {};

  data.forEach((element) => {
    const { id, name, date, amount } = element;
    const month = new Date(date).toLocaleString("default", { month: "long" }); // get month of the transaction.

    // if customer id if not present in object then create one
    if (!customerPoints[id]) {
      customerPoints[id] = {
        name,
        totalAmount: 0,
        monthlyPoints: {},
        totalPoints: 0,
      };
    }

    // else modify the customer data accordingly
    customerPoints[id].totalAmount += amount;
    const points = calculateTotalPoints(amount);
    customerPoints[id].totalPoints += points;
    customerPoints[id].monthlyPoints[month] =
      (customerPoints[id].monthlyPoints[month] || 0) + points;
  });

  return customerPoints;
};

/**
 *
 * @param {amount spent by customer} amount
 * @returns total points based on logic
 */
const calculateTotalPoints = (amount) => {
  let totalPoints = 0;
  if (amount > 100) {
    totalPoints += (amount - 100) * 2;
    amount = 100;
  }
  if (amount > 50) {
    totalPoints += (amount - 50) * 1;
  }

  return totalPoints;
};
