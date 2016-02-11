import {IPerson} from "./person"
import {Book} from "./book";

export class Student implements IPerson{
    career: string;
    books: Book[] = [];

    constructor(public name, public age, career){
        this.name = name;
        this.age = age;
        this.career = career;
    }

    addBook(...books: Book[]){
        for(let book of books){
            this.books.push(book);
        }
    }

    printBooks(): string|void{
        if(this.books.length > 0){
            let books: string[] = [];
            for(let book of this.books){
                books.push(book.title);
            }

            return books.join(",");
        }
    }

    toString(): string{
        if(this.books.length > 0){
            return `${this.name} has this books: ${this.printBooks()}`
        }
    }
}