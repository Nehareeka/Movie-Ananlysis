export interface IMovie {
    Title: string;
    Director: string;
    Actor1: string;
    Actor2: string;
    Genres?: string;
    Language: string;
    Country: string;
    Rating: string;
    Budget: number;
    Year: number;
    Plot_keywords?: string;
    Imdb: string;
}

export class Movie implements IMovie {
    constructor(public Title: string,
        public Director: string,
        public Actor1: string,
        public Actor2: string,
        public Language: string,
        public Country: string,
        public Rating: string,
        public Genres: string,
        public Budget: number,
        public Year: number,
        public Imdb: string
    ) {
        this.Title =  Title;
        this.Director = Director;
        this.Actor1 =  Actor1;
        this.Actor2 = Actor2;
        this.Language =  Language;
        this.Country = Country;
        this.Rating =  Rating;
        this.Genres =  Genres;
        this.Budget = <number>Budget;
        this.Year = <number>Year;
        this.Imdb = Imdb;
    }
}
