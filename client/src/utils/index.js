export const convertFormdataEntriesToObject = (form) => {
  const entries = [...new FormData(form).entries()]
  const res = {}
  for (const e of entries) res[e[0]] = e[1]
  return res
}
