import service from '@/services/Request'

describe('Request Service', () => {

  it ('should return an axios instance', () => {
    expect(service.get).toBeTruthy()
    expect(service.post).toBeTruthy()
    expect(service.request).toBeTruthy()
  })

})
