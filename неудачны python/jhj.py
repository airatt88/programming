def fib_dp(n)
    dp[0]*(n+1)
    dp[0]=0, dp[1]=0, 1
    for i range(2, n+1):
    dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]  
    print(fib_dp(10)) 



