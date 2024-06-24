/**
 *
 * @param {customer data} data
 * @returns object of calculated points customer wise
 */
export const getCustomerDataWithCalculatedPoints = (userData) => {
  let customerPoints = {};
  const threeMonthsData = userData.filter((transactions) => {
    return new Date().getMonth() +
      1 -
      (new Date(transactions.transactionDate).getMonth() + 1) <
      3
      ? true
      : false;
  });
  threeMonthsData.forEach((user) => {
    const { userId, userName, transactionDate, transactionAmount } = user;

    const month = new Date(transactionDate).getMonth() + 1; // get month of the transaction.

    // if customer userId if not present in object then create one
    if (!customerPoints[userId]) {
      customerPoints[userId] = {
        userName,
        totalAmount: 0,
        monthlyPoints: {},
        totalPoints: 0,
        monthlyAmount: {},
      };
    }

    // else modify the customer data accordingly
    customerPoints[userId].totalAmount += transactionAmount;
    const points = calculateTotalPoints(transactionAmount);
    customerPoints[userId].totalPoints += points;
    customerPoints[userId].monthlyPoints[month] =
      (customerPoints[userId].monthlyPoints[month] || 0) + points;
    customerPoints[userId].monthlyAmount[month] = transactionAmount;
  });
  return customerPoints;
};

/**
 *
 * @param {transactionAmount spent by customer} transactionAmount
 * @returns total points based on logic
 */
const calculateTotalPoints = (transactionAmount) => {
  let totalPoints = 0;
  if (transactionAmount > 100) {
    totalPoints += (transactionAmount - 100) * 2;
    transactionAmount = 100;
  }
  if (transactionAmount > 50) {
    totalPoints += (transactionAmount - 50) * 1;
  }
  if (transactionAmount < 0) {
    totalPoints += 0;
  }

  return totalPoints;
};
