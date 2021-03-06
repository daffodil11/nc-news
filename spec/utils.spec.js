const { expect } = require('chai');
const { formatDate, makeRefObj, formatComments, paginate } = require('../db/utils/utils');

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
  const arr = [
    {
      title: 'abc',
      article_id: 1
    }
  ];
  it('returns an object and does not mutate the input array', () => {
    const testArr = [{ ...arr[0] }];
    expect(makeRefObj(arr)).to.be.an('object');
    expect(arr).to.deep.equal(testArr);
  });
  it('returns an object containing a key-value pair of the values of title and article_id in the input object', () => {
    expect(makeRefObj(arr).abc).to.equal(1);
  });
  it('returns an object containing a key-value pair of the values of title and article_id in the input object', () => {
    const newObj = {
      title: 'def',
      article_id: 2
    };
    const arrCopy = [arr[0], newObj];
    expect(makeRefObj(arrCopy)).to.deep.equal({'abc': 1, 'def': 2});
  });
});

describe('formatComments', () => {
  const arr = [
    {
      body: 'abc',
      belongs_to: 'An article title',
      created_by: 'some user',
      votes: 10,
      created_at: 1448282163389
    },
    {
      body: 'def',
      belongs_to: 'Another article title',
      created_by: 'Outraged in Upper Dribbling',
      votes: 100,
      created_at: 1448382113389
    }
  ];
  const refObj = {'An article title': 12, 'Another article title': 3};
  it('returns a new array and does not mutate the original', () => {
    const testArr = [{ ...arr[0] }, { ...arr[1] }];
    expect(formatComments(arr, refObj)).to.not.equal(arr);
    expect(arr).to.deep.equal(testArr);
  });
  it('returns an array of objects with the property created_by changed to author', () => {
    expect(formatComments(arr, refObj)[0].author).to.equal(arr[0].created_by);
    expect(formatComments(arr, refObj)[1].author).to.equal(arr[1].created_by);
  });
  it('returns an array of objects with the property belongs_to changed to article_id and the value changed to the appropriate article_id', () => {
    expect(formatComments(arr, refObj)[0].article_id).to.equal(12);
    expect(formatComments(arr, refObj)[1].article_id).to.equal(3);
  });
  it('returns an array of objects with the property created_at converted to a Date object', () => {
    expect(formatComments(arr, refObj)[0].created_at).to.be.an.instanceof(Date);
    expect(formatComments(arr, refObj)[1].created_at).to.be.an.instanceof(Date);
  });
});

describe.only('paginate', () => {
  const arr = Array.from({length: 42}, (_, i) => ({ id: i + 1 }));
  it('returns a new array and does not mutate the original', () => {
    arrCopy = [...arr];
    expect(paginate(arr)).to.be.an('array');
    expect(paginate(arr)).to.not.equal(arr);
    expect(arr).to.deep.equal(arrCopy);
  });
  it('defaults to a limit of 10', () => {
    expect(paginate(arr).length).to.equal(10);
  });
  it('defaults to returning the first page', () => {
    expect(paginate(arr)[0].id).to.equal(1);
  });
  it('can change the limit as specified', () => {
    expect(paginate(arr, 3).length).to.equal(3);
  });
  it('can return a specified page', () => {
    expect(paginate(arr, 10, 2)[0].id).to.equal(11);
    expect(paginate(arr, 10, 5).length).to.equal(2);
  });
});