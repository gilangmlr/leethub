class Solution:
  def maxSumMinProduct(self, nums: List[int]) -> int:
    n = len(nums)
    st = []
    left = [0] * n
    right = [0] * n
    prefix_sum = [0] * (n + 1)

    for i in range(0, n, 1):
      while st and nums[i] <= nums[st[-1]]:
        st.pop()

      if len(st) > 0:
        left[i] = st[-1] + 1
      else:
        left[i] = 0

      st.append(i)

      prefix_sum[i + 1] = prefix_sum[i] + nums[i]

    st = []
    for i in range(n - 1, -1, -1):
      while st and nums[i] <= nums[st[-1]]:
        st.pop()

      if len(st) > 0:
        right[i] = st[-1] - 1
      else:
        right[i] = n - 1

      st.append(i)

    res = 0
    for i in range(0, n, 1):
      sum = prefix_sum[right[i] + 1] - prefix_sum[left[i]]
      res = max(res, nums[i] * sum)

    return res % 1_000_000_007
