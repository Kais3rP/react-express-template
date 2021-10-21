import { useEffect } from 'react'
import { useRefreshTokensMutation } from '../services'
import { checkAccessTokenTime, isRefreshTokenValid } from '../utils'

export const useRefreshTokensPolling = () => {
  // MANAGE REFRESH TOKENS INTERVAL
  const [
    refreshTokens,
    { data: refreshData, status, error: refreshError },
  ] = useRefreshTokensMutation()
  useEffect(() => {
    // return if there is no refresh token saved, or if it has expired
    if (!isRefreshTokenValid()) return
    let interval
    const expireTime = checkAccessTokenTime()
    console.log('EXPIRE TIME', expireTime)
    // ISSUE NEW TOKENS EVERY 30 MINUTES
    if (expireTime <= 0) {
      refreshTokens()
      interval = setInterval(refreshTokens, 30 * 60 * 1000)
    } else {
      setTimeout(() => {
        refreshTokens()
        interval = setInterval(refreshTokens, 30 * 60 * 1000)
      }, expireTime)
    }

    return () => clearInterval(interval)
  }, [])
}
