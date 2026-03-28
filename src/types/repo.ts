export interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  created_at: string;
  languages: Record<string, number>;
}
