/* eslint-disable jest/no-conditional-expect */

const starkbank = require('starkbank');
const { DateTime } = require('luxon');
const utility = require('../modules/utility');
const authentication = require('../modules/authentication');
const transaction = require('../modules/transaction');

starkbank.user = authentication.getUser('sandbox', utility.ID, utility.KEY);

// Test valid invoice
test('Should be a valid invoice', async () => {
  const invoice = await transaction.issueInvoices([{
    name: 'Unit Test Invoice',
    taxId: '499.757.650-68',
    amount: 1,
    due: utility.getRelativeISOTime(1, 0, 0),
    expiration: 3600,
    tags: ['unit-test'],
  }]);
  expect(invoice[0].status).toBe('created');
});

// Test invalid invoice tax ID
test('Should be an invalid invoice tax ID', async () => {
  try {
    return await transaction.issueInvoices([{
      name: 'Unit Test Invoice',
      taxId: '123.456.789-10',
      amount: 1,
      due: utility.getRelativeISOTime(1, 0, 0),
      expiration: 3600,
      tags: ['unit-test'],
    }]);
  } catch (e) {
    expect(e.errors[0].code).toBe('invalidTaxId');
  }
  return expect.assertions(1);
});

// Test invalid invoice due date
test('Should be an invalid invoice due date', async () => {
  try {
    return await transaction.issueInvoices([{
      name: 'Unit Test Invoice',
      taxId: '499.757.650-68',
      amount: 1,
      due: utility.getRelativeISOTime(-1, 0, 0),
      expiration: 3600,
      tags: ['unit-test'],
    }]);
  } catch (e) {
    expect(e.errors[0].code).toBe('invalidDate');
  }
  return expect.assertions(1);
});

// // Test invalid invoice amount
test('Should be an invalid invoice amount', async () => {
  try {
    return await transaction.issueInvoices([{
      name: 'Unit Test Invoice',
      taxId: '499.757.650-68',
      amount: -1,
      due: utility.getRelativeISOTime(-1, 0, 0),
      expiration: 3600,
      tags: ['unit-test'],
    }]);
  } catch (e) {
    expect(e.errors[0].code).toBe('invalidAmount');
  }
  return expect.assertions(1);
});

// Test valid transfer
test('Should be a valid transfer', async () => {
  const transfer = await transaction.issueTransfers([
    {
      amount: 1,
      name: 'Stark Bank S.A.',
      taxId: '20.018.183/0001-80',
      bankCode: '20018183',
      branchCode: '0001',
      accountNumber: '6341320293482496',
      accountType: 'payment',
      externalId: DateTime.now().setZone('utc').toISO().slice(0, 19)
        .replaceAll(':', '-'),
      tags: ['unit-test'],
    },
  ]);
  expect(transfer[0].status).toBe('created');
});

// Test invalid transfer taxId
test('Should be an invalid transfer tax id', async () => {
  try {
    return await transaction.issueTransfers([
      {
        amount: 1,
        name: 'Stark Bank S.A.',
        taxId: '12.345.678/1234-56',
        bankCode: '20018183',
        branchCode: '0001',
        accountNumber: '6341320293482496',
        accountType: 'payment',
        externalId: DateTime.now().setZone('utc').toISO().slice(0, 19)
          .replaceAll(':', '-'),
        tags: ['unit-test'],
      },
    ]);
  } catch (e) {
    expect(e.errors[0].code).toBe('invalidTaxId');
  }
  return expect.assertions(1);
});

// Test invalid transfer taxId
test('Should be an invalid transfer amount', async () => {
  try {
    return await transaction.issueTransfers([
      {
        amount: -1,
        name: 'Stark Bank S.A.',
        taxId: '20.018.183/0001-80',
        bankCode: '20018183',
        branchCode: '0001',
        accountNumber: '6341320293482496',
        accountType: 'payment',
        externalId: DateTime.now().setZone('utc').toISO().slice(0, 19)
          .replaceAll(':', '-'),
        tags: ['unit-test'],
      },
    ]);
  } catch (e) {
    expect(e.errors[0].code).toBe('invalidAmount');
  }
  return expect.assertions(1);
});

// Test invalid transfer account type
test('Should be an invalid transfer account type', async () => {
  try {
    return await transaction.issueTransfers([
      {
        amount: -1,
        name: 'Stark Bank S.A.',
        taxId: '20.018.183/0001-80',
        bankCode: '20018183',
        branchCode: '0001',
        accountNumber: '6341320293482496',
        accountType: 'invalid',
        externalId: DateTime.now().setZone('utc').toISO().slice(0, 19)
          .replaceAll(':', '-'),
        tags: ['unit-test'],
      },
    ]);
  } catch (e) {
    expect(e.errors[0].code).toBe('invalidAccountType');
  }
  return expect.assertions(1);
});
