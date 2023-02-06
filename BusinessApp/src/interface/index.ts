
export interface TaskItem {
  id: string;
  title: string;
  description: string;
  status: string;
  time: any;
  date: any;
  createAt: any;
}

export interface GetNewParams {
  country: string;
  category: string;
  page: number;
  pageSize: number;
}

export interface NewItem {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  title: string;
  url: string;
  urlToImage: string;
  source: {
    id: any;
    name: string;
  };
}
