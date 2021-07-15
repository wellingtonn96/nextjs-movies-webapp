// https://api.themoviedb.org/3/movie/460465?api_key=2da3d8be687c892f18efb0676c3811ba&language=pt-BR

import { NextApiRequest, NextApiResponse } from "next";
import { args } from '../../../configs/api'

export default async function handler(request: NextApiRequest, response: NextApiResponse<any>) {
  const { id } = request.query
  const results = await fetch(`${args.base_url}/movie/${id}?api_key=${args.api_key}&language=pt-BR`)

  const movie = await results.json()

  return response.status(200).json({
    movie,
  })
}