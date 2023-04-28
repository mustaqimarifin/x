import supabase from 'lib/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await supabase.from('pageviews').select('*');

  const total = data?.reduce((acc, row) => acc + row.view_count, 0);
  console.log('DATA', total);
  return res.status(200).json({
    total
  });
}
