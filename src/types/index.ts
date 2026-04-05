export interface Article {
  title: string
  preview: string
  content: string
}

export interface Video {
  title: string
  src: string
}

export type ArticlesData = Record<string, Article[]>
export type VideosData = Record<string, Video[]>
