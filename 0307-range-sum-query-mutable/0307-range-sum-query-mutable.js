/**
 * @param {number[]} nums
 */
var NumArray = function(nums) {
  const n = nums.length;
  this.nums = nums;
  this.st = Array(4 * n).fill(0);

  this.build(1, 0, n - 1);
};

NumArray.prototype.build = function(p, L, R) {
  if (L === R) {
    this.st[p] = this.nums[L]
    return;
  }

  const m = (L + R) >> 1;
  this.build(p*2, L, m);
  this.build(p*2+1, m+1, R);

  this.st[p] = this.st[p*2] + this.st[p*2+1];
}

NumArray.prototype.updatePoint = function(p, index, val, i, j) {
  // outside range
  if (index < i || j < index) {
      return;
  }

  if (i === j) {
    this.st[p] = val;
    return;
  }

  const m = (i + j) >> 1;
  this.updatePoint(p*2, index, val, i, m)
  this.updatePoint(p*2+1, index, val, m+1, j);
  this.st[p] = this.st[p*2] + this.st[p*2+1];
}

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function(index, val) {
    this.updatePoint(1, index, val, 0, this.nums.length - 1);
};

NumArray.prototype.rmq = function(p, L, R, i, j) {
  // outside query
  if (j < L || i > R) {
      return 0;
  }

  if (i >= L && j <= R) {
    return this.st[p];
  }

  const m = (i + j) >> 1;

  return this.rmq(p*2, L, R, i, m) + this.rmq(p*2+1, L, R, m+1, j);
}

/** 
 * @param {number} left 
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function(left, right) {
  return this.rmq(1, left, right, 0, this.nums.length - 1);
};

/** 
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(index,val)
 * var param_2 = obj.sumRange(left,right)
 */