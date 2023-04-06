// ## 题目
// 一个二叉搜索树，求其中的第 K 小的节点的值。

// ## 实现思路
// - 前序遍历：root -> left -> right
// - 中序遍历：left -> root -> right
// - 后序遍历：left -> right -> root

// 根据 BST 的特点，中序遍历的结果，正好是按照从小到大排序的结果。<br>
// 所以，中序遍历，求数组的 `arr[k]` 即可。

// ## 代码
export function getKth(root, k) {
  const res = [];
  helper(root, res);
  return res[k - 1];
}

function helper(node, res) {
  if (!node) return;
  helper(node.left, res);
  res.push(node.value);
  helper(node.right, res);
}

export const root = {
  value: 5,
  left: {
    value: 3,
    left: {
      value: 2,
      left: null,
      right: null,
    },
    right: {
      value: 4,
      left: null,
      right: null,
    },
  },
  right: {
    value: 7,
    left: {
      value: 6,
      left: null,
      right: null,
    },
    right: {
      value: 8,
      left: null,
      right: null,
    },
  },
};
