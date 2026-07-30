
export type Chapter = {
    id?: string
    series_id: string,
    chapter_number: number,
    chapter_url: string,
    chapter_images: Images[]
}

export type Images = {
    page_number: number,
    image: string
}