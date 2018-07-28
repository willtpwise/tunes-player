import axios from 'axios'
import axiosRetry from 'axios-retry'

const client = axios.create()

axiosRetry(client, {
  retries: 5,
  retryDelay: 1000
})

export default client
