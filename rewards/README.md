Problem Statement:-

A retailer offers a rewards program to its customers, awarding points based on each recorded purchase. 
 
A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent between $50 and $100 in each transaction.
(e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).
 
Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total.


Solution:-

1) For mocking the customer data, mockData.js file is created in constants folder.
2) For Simulating API call, api.js file is created which resolves the promise in 2 seconds.
3) In components folder, HomeComponent.js file is created which renders the table of customer along with points.
4) For calculating the total and monthly points, utility function is created in calculatePoints.js file.
5) There are comments in each file describing the functionality of each functions.