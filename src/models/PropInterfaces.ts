export interface Link {
    linkText: string,
    pathName: string
}

export interface Service {
    image: string,
    alt: string,
    heading: string,
    text: string,
    pathName: string
}

export interface FaqItem {
    id:number,
    question: string,
    answer: string
}

export interface Image {
    image: string,
    alt: string
}