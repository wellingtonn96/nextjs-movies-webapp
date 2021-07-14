import { NextApiRequest, NextApiResponse } from "next"
import { args } from '../../configs/api'

export default async function handler(request: NextApiRequest, response: NextApiResponse<any>) {
  const results = await fetch(`
    ${args.base_url}/trending/all/week?api_key=${args.api_key}&language=pt-BR
  `)

  const json = await results.json()

  return response.status(200).json({
    list: json.results
  })
}