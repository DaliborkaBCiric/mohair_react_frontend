const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

async function request(path, options = {}) {
  const url = `${API_URL}${path}`

  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  })

  if (!response.ok) {
    throw new Error(`API greška: ${response.status}`)
  }

  return response.json()
}

export const api = {
  getProducts: () => request('/products'),
  getProduct: (slug) => request(`/products/${slug}`),
  getCategories: () => request('/categories'),
  sendContact: (payload) =>
    request('/contact', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
}