import {
  insert, deleteRange,
  createRopeFromMap, rebalance
} from '../../lib/rope'

const createLeaf = (text) => createRopeFromMap({
  text,
  kind: 'leaf'
})

/* 
  These tests are here as a starting point, they are not comprehensive
*/
describe("rope basics", () => {
  test("leaf constructor", () => expect(createLeaf('test').toString()).toEqual('test'));
  test("leaf size", () => expect(createLeaf('test').size()).toEqual(4));
  
  const branch = createRopeFromMap({
    kind: 'branch',
    left: {
      left: {
        kind: 'leaf',
        text: 't'
      },
      right: {
        kind: 'leaf',
        text: 'e'
      },
      kind: 'branch'
    },
    right: {
      kind: 'branch',
      right: {
        kind: 'leaf',
        text: 'st'
      }
    }
  })
  test("branch constructor", () => expect(branch.toString()).toEqual('test'));
  test("branch size", () => expect(branch.size()).toEqual(4));
});

describe("insertion", () => {
  test("simple insertion", () => expect(insert(createLeaf('test'), '123', 2).toString()).toEqual('te123st'));
  test("ending insertion", () => expect(insert(createLeaf('test'), '123', 4).toString()).toEqual('test123'));
  test("beginning insertion", () => expect(insert(createLeaf('test'), '123', 0).toString()).toEqual('123test'));
});

describe("deletion", () => {
  test("simple deletion", () => expect(deleteRange(createLeaf('test'), 1, 3).toString()).toEqual('tt'));
  test("delete until end", () => expect(deleteRange(createLeaf('test'), 2, 4).toString()).toEqual('te'));
  test("delete beginning", () => expect(deleteRange(createLeaf('test'), 0, 2).toString()).toEqual('st'));
  test("delete then insert", () => expect(insert(deleteRange(createLeaf('test'), 1, 3), 'abc', 2).toString()).toEqual('ttabc'));
});

describe('Extra Credit: tree is rebalanced', () => {
  expect(rebalance(createRopeFromMap({
    kind: 'branch',
    left: { kind: 'leaf', text: 'a' },
    right: {
      kind: 'branch',
      left: { kind: 'leaf', text: 'b' },
      right: {
        kind: 'branch',
        left: { kind: 'leaf', text: 'c' },
        right: { kind: 'leaf', text: 'd' }
      }
    },
  }))).toEqual(createRopeFromMap({
    kind: 'branch',
    left: {
      kind: 'branch',
      left: { kind:'leaf',text: 'a' },
      right: { kind:'leaf',text: 'b' }
    },
    right: {
      kind: 'branch',
      left: { kind:'leaf',text: 'c' },
      right: { kind:'leaf',text: 'd' }
    },
  }))
})
