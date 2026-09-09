export interface FounderItem {
  name: string;
  title: string;
  bio: string;
  image: string;
  linkedinUrl?: string;
}

export interface LeaderItem {
  _key?: string;
  name: string;
  title: string;
  image: string;
  linkedinUrl?: string;
}

export interface AboutUsLeadershipData {
  leadersTag?: string;
  leaders?: LeaderItem[];
}

export interface AboutUsPageData {
  leadership?: AboutUsLeadershipData;
  leadersTag?: string;
  leaders?: LeaderItem[];
}
