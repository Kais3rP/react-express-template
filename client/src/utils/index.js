export const convertFormdataEntriesToObject = (form) => {
  const entries = [...new FormData(form).entries()]
  const res = {}
  for (const e of entries) res[e[0]] = e[1]
  return res
}

export const retrieveAccessToken = () => {
  const token = localStorage.getItem('access-token')
  console.log('RETRIEVING ACCESS TOKEN FROM LOCAL STORAGE', token)
  return token
}

export const retrieveRefreshToken = () => {
  const token = localStorage.getItem('refresh-token')
  console.log('RETRIEVING REFRESH TOKEN FROM LOCAL STORAGE', token)
  return token
}

export const saveTokens = (tokens) => {
  console.log('SAVING TOKENS', tokens)
  localStorage.setItem('access-token', tokens.access.token)
  localStorage.setItem('access-token-expires', tokens.access.expires)
  localStorage.setItem('refresh-token', tokens.refresh.token)
  localStorage.setItem('refresh-token-expires', tokens.refresh.expires)
}

export const checkAccessTokenTime = () => {
  try {
    const expires = localStorage.getItem('access-token-expires')
    const timeDiff = new Date(expires) - new Date()
    return timeDiff
  } catch (e) {
    console.error('Authenticate')
  }
}

export const isRefreshTokenValid = () => {
  const expires = localStorage.getItem('refresh-token-expires')
  const timeDiff = new Date(expires) - new Date()

  return !(!expires || timeDiff <= 0)
}

export const wipeTokensFromStorage = () => {
  localStorage.removeItem('access-token')
  localStorage.removeItem('access-token-expires')
  localStorage.removeItem('refresh-token')
  localStorage.removeItem('refresh-token-expires')
}
