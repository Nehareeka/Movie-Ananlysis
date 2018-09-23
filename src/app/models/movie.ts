export interface IMovie {
    Title: string;
    Director: string;
    Actor_1: string;
    Actor_2: string;
    Genres?: string;
    Language: string;
    Country: string;
    Content_rating: string;
    Budget: number;
    Year: number;
    Plot_keywords?: string;
    Imdb: string;
}

export class Movie implements IMovie {
    constructor(public Title: string,
        public Director: string,
        public Actor_1: string,
        public Actor_2: string,
        public Language: string,
        public Country: string,
        public Content_rating: string,
        public Genres: string,
        public Budget: number,
        public Year: number,
        public Imdb: string
    ) {
        this.Title =  Title;
        this.Director = Director;
        this.Actor_1 =  Actor_1;
        this.Actor_2 = Actor_2;
        this.Language =  Language;
        this.Country = Country;
        this.Content_rating =  Content_rating;
        this.Genres =  Genres;
        this.Budget = <number>Budget;
        this.Year = <number>Year;
        this.Imdb = Imdb;
    }
}
