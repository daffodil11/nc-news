const { expect } = require('chai');
const { formatDate, makeRefObj, formatComments } = require('../db/utils/utils');

describe('formatDate', () => {
  const arr = [
    {
      title: 'abc',
      topic: 'cats',
      author: 'butter_bridge',
      body: 'kitties',
      created_at: 1289396514171,
      votes: 100
    },
    {
      title: 'def',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'definitely',
      created_at: 1289996514171,
      votes: 0
    }
  ];
  it('returns an array of new objects and does not mutate the original objects', () => {
    const testArr = [{ ...arr[0] }, { ...arr[1] }];
    expect(formatDate(arr)).to.not.equal(arr);
    expect(arr).to.deep.equal(testArr);
  });
  it('does not change properties other than created_at', () => {
    const expected = { ...arr[0] };
    delete expected.created_at;
    let { created_at, ...actual } = formatDate(arr)[0];
    expect(actual).to.deep.equal(expected);
  });
  it('converts the value of created_at into a Date object', () => {
    expect(formatDate(arr)[0].created_at instanceof Date).to.be.true;
  });
});

describe('makeRefObj', () => {
  it('returns an object and does not mutate the input array', () => {
    const arr = [
      {
        title: 'abc',
        article_id: 1
      }
    ];
    const testArr = [{ ...arr[0] }];
    expect(makeRefObj(arr)).to.be.an('object');
    expect(arr).to.deep.equal(testArr);
  });
});

describe('formatComments', () => {});
