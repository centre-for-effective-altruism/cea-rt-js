import {
  Rope, insert, append, prepend, rotateRight, deleteRange,
  createRopeFromMap, rebalance, rotateLeft
} from '../../lib/rope'

/* 
  These tests are here as a starting point, they are not comprehensive
*/
describe("rope basics", () => {
  test("constructor", () => expect(new Rope('test').toString()).toEqual('test'));
  test("append", () => expect(append(new Rope('test'), '123').toString()).toEqual('test123'));
  test("prepend", () => expect(prepend(new Rope('test'), '123').toString()).toEqual('123test'));
});

describe("insertion", () => {
  test("simple insertion", () => expect(insert(new Rope('test'), '123', 2).toString()).toEqual('te123st'));
  test("ending insertion", () => expect(insert(new Rope('test'), '123', 4).toString()).toEqual('test123'));
  test("beginning insertion", () => expect(insert(new Rope('test'), '123', 0).toString()).toEqual('123test'));
});

describe("deletion", () => {
  test("simple deletion", () => expect(deleteRange(new Rope('test'), 1, 3).toString()).toEqual('tt'));
  test("delete until end", () => expect(deleteRange(new Rope('test'), 2, 4).toString()).toEqual('te'));
  test("delete beginning", () => expect(deleteRange(new Rope('test'), 0, 2).toString()).toEqual('st'));
  test("delete then insert", () => expect(insert(deleteRange(new Rope('test'), 1, 3), 'abc', 2).toString()).toEqual('ttabc'));
});

describe('Extra Credit: tree is rebalanced', () => {
  expect(rotateLeft(createRopeFromMap({
    text: '3',
    left: { text: 'a' },
    right: { text: '5', left: { text: 'b' }, right: { text: '7', left: { text: 'c' }, right: { text: 'd' } } },
  }))).toEqual(createRopeFromMap({
    text: '5',
    left: {
      text: '3',
      left: { text: 'a' },
      right: { text: 'b' }
    },
    right: {
      text: '7',
      left: { text: 'c' },
      right: { text: 'd' }
    },
  }))

  expect(rotateRight(createRopeFromMap({
    text: '5',
    left: { text: '3', right: { text: 'b' }, left: { text: '2', left: { text: 'd' }, right: { text: 'c' } } },
    right: { text: 'a' },
  }))).toEqual(createRopeFromMap({
    text: '3',
    left: {
      text: '2',
      left: { text: 'd' },
      right: { text: 'c' }
    },
    right: {
      text: '5',
      left: { text: 'b' },
      right: { text: 'a' }
    },
  }))

  const balancedTree = createRopeFromMap({
    text: 'b',
    left: { text: 'a' },
    right: { text: 'c' }
  })

  test("left right imbalance", () => expect(rebalance(createRopeFromMap({
    text: 'c',
    left: { text: 'a', right: { text: 'b' } },
  }))).toEqual(balancedTree))
  test("left left imbalance", expect(rebalance(createRopeFromMap({
    text: 'c',
    left: { text: 'b', left: { text: 'a' } },
  }))).toEqual(balancedTree))
  test("right right imbalance", expect(rebalance(createRopeFromMap({
    text: 'a',
    right: { text: 'b', right: { text: 'c' } },
  }))).toEqual(balancedTree))
  test("right left imbalance", expect(rebalance(createRopeFromMap({
    text: 'a',
    right: { text: 'c', left: { text: 'b' } },
  }))).toEqual(balancedTree))
})