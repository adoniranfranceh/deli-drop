export function parseJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function persistLocalStorage(key, value) {
  const plain = JSON.parse(JSON.stringify(value))
  localStorage.setItem(key, JSON.stringify(plain))
}
