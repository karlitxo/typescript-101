define(["require", "exports"], function (require, exports) {
    var Student = (function () {
        function Student(name, age, career) {
            this.name = name;
            this.age = age;
            this.books = [];
            this.name = name;
            this.age = age;
            this.career = career;
        }
        Student.prototype.addBook = function () {
            var books = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                books[_i - 0] = arguments[_i];
            }
            for (var _a = 0; _a < books.length; _a++) {
                var book = books[_a];
                this.books.push(book);
            }
        };
        Student.prototype.printBooks = function () {
            if (this.books.length > 0) {
                var books = [];
                for (var _i = 0, _a = this.books; _i < _a.length; _i++) {
                    var book = _a[_i];
                    books.push(book.title);
                }
                return books.join(",");
            }
        };
        Student.prototype.toString = function () {
            if (this.books.length > 0) {
                return this.name + " has this books: " + this.printBooks();
            }
        };
        return Student;
    })();
    exports.Student = Student;
});
//# sourceMappingURL=student.js.map