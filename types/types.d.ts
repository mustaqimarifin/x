/** Document types */
export type Activity = {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: "Activity";
  date: IsoDateTimeString;
  /** MDX file body */
  body: MDX;
  slug: string;
  formattedDate: string;
};

export type IceBaths = {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: "IceBaths";
  data: IceBath[];
  /** Markdown file body */
  body: Markdown;
};

export type Job = {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: "Job";
  company: string;
  startDate: IsoDateTimeString;
  endDate?: IsoDateTimeString | undefined;
  title: string;
  location?: string | undefined;
  link: string;
  description?: string | undefined;
  logo?: string | undefined;
  timeline?: Event[] | undefined;
  clients?: string[] | undefined;
  tags?: string[] | undefined;
  currently?: string | undefined;
  /** MDX file body */
  body: MDX;
  slug: string;
};

export type Post = {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: "Post";
  title: string;
  description?: string | undefined;
  date: IsoDateTimeString;
  /** MDX file body */
  body: MDX;
  slug: string;
  formattedDate: string;
};

export type Recommendation = {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: "Recommendation";
  date: IsoDateTimeString;
  company: string;
  title: string;
  name: string;
  text: string;
  link: string;
  /** MDX file body */
  body: MDX;
  avatar: string;
};

/** Nested types */
export type Event = {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: "Event";
  heading: string;
  description?: string | undefined;
  date: IsoDateTimeString;
  link?: string | undefined;
};

export type IceBath = {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: "IceBath";
  date: IsoDateTimeString;
  /** Duration in seconds */
  duration: number;
  temp: number;
};

/** Helper types */

export type AllTypes = DocumentTypes | NestedTypes;
export type AllTypeNames = DocumentTypeNames | NestedTypeNames;

export type DocumentTypes = Activity | IceBaths | Job | Post | Recommendation;
export type DocumentTypeNames =
  | "Activity"
  | "IceBaths"
  | "Job"
  | "Post"
  | "Recommendation";

export type NestedTypes = Event | IceBath;
export type NestedTypeNames = "Event" | "IceBath";

export type DataExports = {
  allDocuments: DocumentTypes[];
  allActivities: Activity[];
  allJobs: Job[];
  allPosts: Post[];
  allRecommendations: Recommendation[];
  iceBath: IceBaths;
};

export interface ContentlayerGenTypes {
  documentTypes: DocumentTypes;
  documentTypeMap: DocumentTypeMap;
  documentTypeNames: DocumentTypeNames;
  nestedTypes: NestedTypes;
  nestedTypeMap: NestedTypeMap;
  nestedTypeNames: NestedTypeNames;
  allTypeNames: AllTypeNames;
  dataExports: DataExports;
}

declare global {
  interface ContentlayerGen extends ContentlayerGenTypes {}
}

export type DocumentTypeMap = {
  Activity: Activity;
  IceBaths: IceBaths;
  Job: Job;
  Post: Post;
  Recommendation: Recommendation;
};

export type NestedTypeMap = {
  Event: Event;
  IceBath: IceBath;
};
