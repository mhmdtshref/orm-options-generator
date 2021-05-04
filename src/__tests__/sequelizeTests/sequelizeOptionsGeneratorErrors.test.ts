import { orderValues } from '../../sequelize/constants';
import OrmOptionsGenerator from '../../index';

const { sequelizeFindOptionsGenerator } = OrmOptionsGenerator;


test('Test #1: Query contain filter with array', () => {
    try {
        const query = {
            filter: [{
                id: { x: 1 },
            },]
        };
        sequelizeFindOptionsGenerator(query);
    } catch (error) {
        const output = error.message;
        const expected = 'Filter could not be array';
        expect(output).toEqual(expected);
    }
});

test('Test #2: Query contain operator contans an object (supposed to be a value)', () => {
    try {
        const query = {
            filter: {
                id: { lte: { id: 5 } },
            }
        };
        sequelizeFindOptionsGenerator(query);
    } catch (error) {
        const output = error.message;
        const expected = 'Filter properties could not be an objects';
        expect(output).toEqual(expected);
    }
});

test('Test #3: Query contain filter as value', () => {
    try {
        const query = {
            filter: 3,
        };
        sequelizeFindOptionsGenerator(query);
    } catch (error) {
        const output = error.message;
        const expected = 'Filter should be type of object';
        expect(output).toEqual(expected);
    }
});

test('Test #4: Query contain order as value', () => {
    try {
        const query = {
            order: 4,
        };
        sequelizeFindOptionsGenerator(query);
    } catch (error) {
        const output = error.message;
        const expected = 'Order should be type of object';
        expect(output).toEqual(expected);
    }
});

test('Test #5: Query contain order with array', () => {
    try {
        const query = {
            order: [['id', 'desc']],
        };
        sequelizeFindOptionsGenerator(query);
    } catch (error) {
        const output = error.message;
        const expected = 'Order should be type of object';
        expect(output).toEqual(expected);
    }
});

test('Test #6: Query contain order with object, but with bad value', () => {
    try {
        const query = {
            order: { id: 'd' },
        };
        sequelizeFindOptionsGenerator(query);
    } catch (error) {
        const output = error.message;
        const expected = `Order value should be string in values: ${orderValues.join(', ')}`;
        expect(output).toEqual(expected);
    }
});

test('Test #7: Query contain order with object, but prop value is object', () => {
    try {
        const query = {
            order: { id: { desc: 'order' } },
        };
        sequelizeFindOptionsGenerator(query);
    } catch (error) {
        const output = error.message;
        const expected = `Order value should be string in values: ${orderValues.join(', ')}`;
        expect(output).toEqual(expected);
    }
});

test('Test #7: Query contain order with object, but prop value is array', () => {
    try {
        const query = {
            order: { id: ['desc', 'order'] },
        };
        sequelizeFindOptionsGenerator(query);
    } catch (error) {
        const output = error.message;
        const expected = `Order value should be string in values: ${orderValues.join(', ')}`;
        expect(output).toEqual(expected);
    }
});
