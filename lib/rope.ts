/*
  Note: this file is in typescript, but you do not need to use typings if you don't want.

  The type annotations are just there in case they are helpful.
*/

export class Rope {
  text: string;
  size: number;
  left?: Rope;
  right?: Rope;

  constructor(text) {
    this.text = text;
    this.size = text.length
  }

  // Returns the character at a given index
  characterAt(position: number) {
    const leftSize = this.left?.totalSize() || 0
    if (position < leftSize) {
      return this.left.characterAt(position)
    }
    if (position < leftSize + this.size) {
      return this.text[position - leftSize]
    }
    return this.right.characterAt(position - (leftSize + this.size))
  }

  // prints contents including showing the hierarchy
  // it's not required for this function to work, it's just there to help with debugging
  // 
  // e.g. if the  root node has ABC, the left node has DEF, and the right node has GHI, 
  // the output will look like:
  // -DEF
  // ABC
  // -GHI
  toStringDebug(indentLevel: number = 0): string {
    const leftText = this.left ? this.left.toStringDebug(indentLevel + 1) : ''
    const rightText = this.right ? this.right.toStringDebug(indentLevel + 1) : ''
    return leftText +
      Array(indentLevel + 1).join('-') + this.text + '\n'
      + rightText
  }

  // just prints the stored text
  toString(): string {
    const leftText = this.left ? this.left.toString() : ''
    const rightText = this.right ? this.right.toString() : ''
    return leftText + this.text + rightText
  }

  // How long the text stored is in all of the children combined
  // This is the same as this.toString().length
  totalSize(): number {
    const leftText = this.left ? this.left.totalSize() : 0
    const rightText = this.right ? this.right.totalSize() : 0
    return leftText + this.text.length + rightText
  }

  // how deep the tree is (I.e. the maximum depth of children)
  height(): number {
    return 1 + Math.max(this.leftHeight(), this.rightHeight())
  }

  /*
    Whether the rope is balanced, i.e. whether any subtrees have branches
    which differ by more than one in height. 
  */
  isBalanced(): boolean {
    const leftBalanced = this.left ? this.left.isBalanced() : true
    const rightBalanced = this.right ? this.right.isBalanced() : true

    return leftBalanced && rightBalanced
      && Math.abs(this.leftHeight() - this.rightHeight()) < 2
  }

  leftHeight(): number {
    if (!this.left) return 0
    return this.left.height()
  }

  rightHeight(): number {
    if (!this.right) return 0
    return this.right.height()
  }

  // Helper method which converts the rope into an associative array
  // 
  // Only used for debugging, this has no functional purpose
  toMap(): MapRepresentation {
    const mapVersion: MapRepresentation = {
      text: this.text
    }
    if (this.right) mapVersion.right = this.right.toMap()
    if (this.left) mapVersion.left = this.left.toMap()
    return mapVersion
  }
}

type MapRepresentation = { text: string, left?: MapRepresentation, right?: MapRepresentation }
export function createRopeFromMap(map: MapRepresentation): Rope {
  const rope = new Rope(map.text)
  if (map.left) rope.left = createRopeFromMap(map.left)
  if (map.right) rope.right = createRopeFromMap(map.right)
  return rope;
}

export function prepend(rope: Rope, text: string): Rope {
  if (rope.left) {
    prepend(rope.left, text)
  } else {
    rope.left = new Rope(text)
  }
  return rope
}

export function append(rope: Rope, text: string): Rope {
  if (rope.right) {
    append(rope.right, text)
  } else {
    rope.right = new Rope(text)
  }
  return rope
}

// This is an internal API. You can implement it however you want. 
// (E.g. you can choose to mutate the input rope or not)
function splitAt(rope: Rope, position: number): { left: Rope, right: Rope } {
  // TODO
  return { left: undefined, right: undefined }
}

export function deleteRange(rope: Rope, start: number, end: number): Rope {
  // TODO
  return rope
}

export function insert(rope: Rope, text: string, location: number): Rope {
  // TODO
  return rope
}

export function rebalance(rope: Rope): Rope {
  // TODO
  return rope
}


/*
 Rotates a tree: used for rebalancing.

 Turns:
    b
  /  \
  a   c

  Into:
     c
    /
   b
  /
a   
*/
export function rotateLeft(rope: Rope): Rope {
  const newParent = rope.right
  const newLeft = rope
  newLeft.right = newParent.left
  newParent.left = newLeft
  return newParent
}

/*
 Rotates a tree: used for rebalancing.

 Turns:
    b
  /  \
  a   c

  Into:
     a
      \
       b
        \
         c 
*/
export function rotateRight(rope: Rope): Rope {
  const newParent = rope.left
  const newRight = rope
  newRight.left = newParent.right
  newParent.right = newRight
  return newParent
}