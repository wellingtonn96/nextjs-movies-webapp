import { NextApiRequest, NextApiResponse } from "next"
import { args } from '../../configs/api'

interface IMovies {
  list: any[]
  page: number
  total_pages: number
}


// no navegador você consegue acessar a api em http://localhost:3000/api/trending?page=1
// já que no next a pasta é o recurso e o arquivo é o endpoint
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
    const message = error instanceof Error ? error.message : String(error);
    return response.status(404).json({ err: message });
  }
}