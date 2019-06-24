const { expect } = require('chai');
const { formatDate, makeRefObj, formatComments } = require('../db/utils/utils');

describe('formatDate', () => {
    it('returns an array of new objects and does not mutate the original objects', () => {
        const arr = [
            {
                title: 'abc',
                created_at: 1542284514171,
                votes: 100
            },
            {
                title: 'xyz',
                created_at: 1416140514171,
                votes: 15
            }
        ];
        const testArr = [
            {...arr[0]},
            {...arr[1]}
        ];
        expect(formatDate(arr)).to.not.equal(arr);
        expect(arr).to.deep.equal(testArr);
    });
    it('does not change properties other than created_at', () => {
        const arr = [{
            title: 'def',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'definitely',
            created_at: 1289996514171,
            votes: 0
        }];
        const expected = {...arr[0]};
        delete expected.created_at;
        let { created_at, ...actual } = formatDate(arr)[0];
        expect(actual).to.deep.equal(expected);
    });
    it('converts the value of created_at into a Date object', () => {
        const arr = [{
            title: 'def',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'definitely',
            created_at: 1289996514171,
            votes: 0
        }];
        expect(formatDate(arr)[0].created_at instanceof Date).to.be.true;
    });
});

describe('makeRefObj', () => {});

describe('formatComments', () => {});
