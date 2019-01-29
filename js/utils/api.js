import axios from 'axios'

export default async function (options = {}) {
  const {
    path, method, headers, payload, timeout,
  } = options
  try {
    const response = await axios({
      url: path,
      timeout,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(payload),
    })
    return { status: response.status, payload: response.data }
  } catch (e) {
    return { error: e }
  }
}
