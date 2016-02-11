define(["require", "exports", "./book", "./student", "./school-library"], function (require, exports, book_1, student_1, school_library_1) {
    function init() {
        var ryu = new student_1.Student("Ryu", 19, "Aerospace Engineer");
        var ken = new student_1.Student("Ken", 19, "Mechanical Engineer");
        var chunLi = new student_1.Student("Chun-Li", 16, "Street Fighter");
        var students = [ryu, ken, chunLi];
        var book1 = new book_1.Book("The Hitchhiker's Guide to the Galaxy");
        var book2 = new book_1.Book("Facebook for Dummies");
        var book3 = new book_1.Book("Peña nieto bible");
        var library = new school_library_1.SchoolLibrary();
        library.lendBook(ryu, book2);
        library.lendBook(chunLi, book3, book1);
        for (var _i = 0; _i < students.length; _i++) {
            var student = students[_i];
            printStudents(student);
        }
    }
    exports.init = init;
    function printStudents(student) {
        var p = document.createElement("p");
        p.textContent = student.toString();
        document.body.appendChild(p);
    }
});
//# sourceMappingURL=app.js.map