import {Student} from "./student";
import {Book} from "./book"

export class SchoolLibrary{
    lendBook(student: Student, ...book: Book[]){
        student.addBook(...book);
    }
}