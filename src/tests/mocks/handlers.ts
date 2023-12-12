import { HttpResponse, http } from 'msw'
import dataJson from '../../../public/data.json'
import { IFileData } from '../../types'

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers = [
  http.get('./data.json', () => {
    return HttpResponse.json(dataJson as IFileData, { status: 200 })
  })
]