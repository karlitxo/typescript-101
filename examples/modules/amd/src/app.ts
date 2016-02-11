import {Book} from "./book";
import {Student} from "./student";
import {SchoolLibrary} from "./school-library";

export function init(){
    let ryu =new Student("Ryu", 19, "Aerospace Engineer");
    let ken =new Student("Ken", 19, "Mechanical Engineer");
    let chunLi = new Student("Chun-Li", 16, "Street Fighter");

    let students = [ryu, ken, chunLi];

    let book1 = new Book("The Hitchhiker's Guide to the Galaxy");
    let book2 = new Book("Facebook for Dummies");
    let book3 = new Book("Peña nieto bible");

    let library = new  SchoolLibrary();

    library.lendBook(ryu, book2);
    library.lendBook(chunLi, book3, book1);

    for(let student of students){
        printStudents(student);
    }

}

function printStudents(student: Student): void{
    let p = document.createElement("p");
    p.textContent = student.toString();
    document.body.appendChild(p);
}