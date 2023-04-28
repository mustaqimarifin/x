import supabase from 'lib/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Call our stored procedure with the page_slug set by the request params slug
    await supabase.rpc('increment_page_view', {
      page_slug: req.query.slug as string
    });
    return res.status(200).json({
      message: `Successfully incremented page: ${req.query.slug}`
    });
  }

  if (req.method === 'GET') {
    // Query the pages table in the database where slug equals the request params slug.
    const { data } = await supabase
      .from('pageviews')
      .select('view_count')
      .eq('slug', req.query.slug);

    if (data) {
      const views = !data.length ? 0 : Number(data[0].view_count);

      return res.status(200).json({
        total: views || null
      });
    }
  }

  return res.status(400).json({
    message: 'Unsupported Request'
  });
}
