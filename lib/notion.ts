import { NotionAPI } from 'notion-client';
import { ExtendedRecordMap } from 'notion-types';

//let previews = true;
const notion = new NotionAPI();

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
  const recordMap = await notion.getPage(pageId);

  return recordMap;
}
