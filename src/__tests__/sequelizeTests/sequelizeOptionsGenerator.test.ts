import { Op } from 'sequelize';
import OrmOptionsGenerator from '../../index';

const { sequelizeFindOptionsGenerator } = OrmOptionsGenerator;

test('Test #1: Query contain simple filter', () => {
  const query = {
    filter: {
      id: 5,
      name: 'Mohamed',
    },
  };
  const output = sequelizeFindOptionsGenerator(query);
  const expected = { where: { id: 5, name: 'Mohamed' }, order: [] };
  expect(output).toEqual(expected);
});

test('Test #2: Query contain simple order', () => {
  const query = {
    order: { id: 'desc' },
  };
  const output = sequelizeFindOptionsGenerator(query);
  const expected = { order: [['id', 'desc']], where: {} };
  expect(output).toEqual(expected);
});

test('Test #3: Query contain filter with symbols', () => {
  const query = {
    filter: {
      id: {
        lte: 4,
      },
    },
  };
  const output = sequelizeFindOptionsGenerator(query);
  const expected = { order: [], where: { id: { [Op.lte]: 4 } } };
  expect(output).toEqual(expected);
});

test('Test #4: Query contain and in main object of filter (and contains array)', () => {
  const query = {
    filter: {
      and: [
        {
          id: 4,
        },
      ],
    },
  };
  const output = sequelizeFindOptionsGenerator(query);
  const expected = { order: [], where: { [Op.and]: [{ id: 4 }] } };
  expect(output).toEqual(expected);
});

test('Test #5: Query contain and in main object of filter (and object)', () => {
  const query = {
    filter: {
      and: {
        id: 4,
      },
    },
  };
  const output = sequelizeFindOptionsGenerator(query);
  const expected = { order: [], where: { [Op.and]: { id: 4 } } };
  expect(output).toEqual(expected);
});

test('Test #6: Query contain "and" in deep object of filter', () => {
  const query = {
    filter: {
      id: {
        lte: 5,
        and: [{ id: 4 }],
      },
    },
  };
  const output = sequelizeFindOptionsGenerator(query);
  const expected = { order: [], where: { id: { [Op.lte]: 5, [Op.and]: [{ id: 4 }] } } };
  expect(output).toEqual(expected);
});

test('Test #8: Filter and order in one query', () => {
  const query = {
    filter: {
      id: {
        lte: 5,
        and: [{ id: 4 }],
      },
    },
    order: { id: 'desc', name: 'asc' },
  };
  const output = sequelizeFindOptionsGenerator(query);
  const expected = {
    where: { id: { [Op.lte]: 5, [Op.and]: [{ id: 4 }] } },
    order: [
      ['id', 'desc'],
      ['name', 'asc'],
    ],
  };
  expect(output).toEqual(expected);
});

test('Test #9: Query contain order with UPPERCASE', () => {
  const query = {
    order: { id: 'DESC' },
  };
  const output = sequelizeFindOptionsGenerator(query);
  const expected = { order: [['id', 'DESC']], where: {} };
  expect(output).toEqual(expected);
});
