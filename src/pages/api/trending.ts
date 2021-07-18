import { NextApiRequest, NextApiResponse } from "next"
import { args } from '../../configs/api'

interface IMovies {
  list: any[]
  page: number
  total_pages: number
}

export default async function handler(request: NextApiRequest, response: NextApiResponse<any>) {
  try {
    const { query } = request
  
    const res = await fetch(`
      ${args.base_url}/trending/all/week?api_key=${args.api_key}&language=pt-BR&page=${query.page}
    `)
  
    const { results, page, total_pages } = await res.json()
  
    const data: IMovies = {
      list: results,
      page,
      total_pages,
    }
    
    return response.status(200).json(data)  
  } catch (error) {
    return response.status(404).json({ err: error.message })
  }
}