// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cacheData from "memory-cache";
import { format, subDays } from 'date-fns'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  status: string;
  totalResults: number;
  articles: {
    title: string;
    description: string;
    url: string;
  };
  error?: string;
}



// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })
// }

// my API key 832090c50a0a45609b32a375f5f02c1a



// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
async function fetchWithCache(url: string, options: object, key: string) {
  const value = cacheData.get(url + key);
  if (value) {
      return value;
  } else {
      const hours = 0.25;
      const res = await fetch(url, options);
      const data = await res.json();
      cacheData.put(url + key, data, hours * 1000 * 60 * 60);
      return data;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  let response;
  const today = format(subDays(new Date(), 31), 'yyyy-M-d');

  response = await fetchWithCache(`https://newsapi.org/v2/everything?q=tesla&from=${today}&sortBy=publishedAt&apiKey=832090c50a0a45609b32a375f5f02c1a`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }, 'latest headlines');

    if (response && response.status != 'error') {
      res.status(200).json(response)
    } else {
    res.status(500).json(response)
  }
}