# Typescript 101
This repo is a quick introduction to typescript.

# Contents
- [References](#references)
- [Install Typescript](#install-typescript)
- [Using Typescript Compiler](#using-typescript-compiler)
  - [tsconfig.json](#tsconfigjson)
- [Smarter Control Flow Analysis](#smarter-control-flow-analysis)
  - [Unreachable Code](#unreachable-code)
  - [Unused labels](#unused-labels)
  - [Implicit Returns](#implicit-returns)
  - [Case clause fall-throughs](#case-clause-fall-throughs)
- [Typescript Types](#typescript-types)
  - [Basic Type Examples](#basic-type-examples)
  - [Union types](#union-types)
  - [Intersection types](#intersection-types)
  - [String Literal Types](#string-literal-types)
- [Classes](#classes)
  - [Inheritance](#inheritance)
  - [Public / Private Modifiers](#public--private-modifiers)
  - [Accessors (Getters/Setters)](#accessors-getterssetters)
  - [Static Properties](#static-properties)
  - [Abstract classes and methods](#abstract-classes-and-methods)
- [Interfaces](#interfaces)
  - [Class Types](#class-types)
  - [Object Types](#object-types)
  - [Function types](#function-types)
  - [Fluent Interfaces](#fluent-interfaces)
  - [Decorators](#decorators)
- [Modules](#modules)
  - [Internal Modules](#internal-modules)
  - [External Modules](#external-modules)
    - [Using AMD (RequireJS)](#using-amd-requirejs)
  - [Module Augmentation](#module-augmentation)
  - [Concatenate AMD and System modules with --outFile](#concatenate-amd-and-system-modules-with---outfile)
- [Typescript ES6/7 features support](#typescript-es67-features-support)

# References
* Handbook - http://www.typescriptlang.org/Handbook
* Wiki - https://github.com/Microsoft/TypeScript/wiki
* TypeScript Deep Dive - https://basarat.gitbooks.io/typescript/content/index.html

# Install Typescript
```
npm install typescript -g
```

# Using Typescript Compiler
```
//simple
tsc test.ts

// watch changes
tsc test.ts -w

// change output filename
tsc myfile.ts myoutput.js
```

## tsconfig.json

The presence of a `tsconfig.json` file in a directory indicates that the directory is the root of a TypeScript project. The `tsconfig.json` file specifies the root files and the compiler options required to compile the project. 
> Just run `tsc` and it will look for `tsconfig.json` in the current as well as all parent folders till it finds it.

```json
{
  "compilerOptions": {
    "module": "amd",
    "sourceMap": true,
    "target": "ES5",
    "outDir": "dist",
    "rootDir": "src"
  },
  "files": [
    "app.ts",
    "books.ts"
  ]
}
```

```json
{
  "exclude": [
    "node_modules",
    "test"
  ]
}
```

The `"compilerOptions"` property can be omitted, in which case the compiler's defaults are used. See the full list of supported [Compiler Options](https://github.com/Microsoft/TypeScript/wiki/Compiler-Options)

If no `"files"` property is present in a `tsconfig.json`, the compiler defaults to including all TypeScript (*.ts or *.tsx) files in the containing directory and subdirectories. When a `"files"` property is present, only the specified files are included.

If the `"exclude"` property is specified, the compiler includes all TypeScript (*.ts or *.tsx) files in the containing directory and subdirectories except for those files or folders that are excluded.

The `"files"` property cannot be used in conjunction with the `"exclude"` property.

Compiler options specified on the command line override those specified in the `tsconfig.json` file.

# Smarter Control Flow Analysis

It is common for complex logic that results in many branching code paths to produce hard to find bugs. TypeScript 1.8 delivers better control flow analysis to help you catch these at compile time.

## Unreachable Code

JavaScript’s automatic semicolon insertion is fairly useful, but it can also lead to unwanted results at times. You can toggle this feature off with the `--allowUnreachableCode` flag.

```javascript
function importantData() {
    return          // Automatic semicolon insertion triggered with newline
    {
        x: "thing"  // Error: Unreachable code detected.
    }
}
```

## Unused labels

These are turned on by default; use `--allowUnusedLabels` to stop reporting these errors.

```javascript
loop: while (x > 0) {  // Error: Unused label.
    x++;
}
```

## Implicit Returns
In JavaScript, reaching the end of a function with no return statement results in implicitly returning **undefined**. Sometimes this is the intended behavior, but often times it can be a red flag for gaps in complex logic. Unlike unreachable code, this check is **off** by default. To get the added safety, just add the `--noImplicitReturns` flag.

## Case clause fall-throughs

This check is turned **off** by default, and can be enabled using `--noFallthroughCasesInSwitch`.

```javascript
switch (x % 2) {
    case 0: // Error: Fallthrough case in switch.
        console.log("even");

    case 1:
        console.log("odd");
        break;
}
```


# Typescript Types
* Number
* String
* Boolean
* Array
* Enum

## Basic Type Examples
```javascript
// x and y are number types
// function sum doesn't return anything
function sum(x: number, y: number): void{
    console.log(x+y);
}

sum("1", 1) // compile-time error

let codeName = "Solid Snake" // string type inference

let arr: string[]; // or -- arr: Array<string>

enum colors {red, green, blue}; // colors.green --> 1

// type aliases
type StrNum = string|number; // Union Types

// sn can be string or number
let sn: StrNum;
sn = 123;
sn = '123';
```

## Union types
A union type `A` | `B` represents an entity that is either of type `A` or type `B`.

```javascript
interface RunOptions {
   program: string;
   commandline: string[]|string|(() => string);
}

var opts: RunOptions = /* ... */;
opts.commandline = '-hello world'; // OK
opts.commandline = ['-hello', 'world']; // OK
opts.commandline = [42]; // Error, number is not string or string[]
```

## Intersection types
An intersection type `A` & `B` represents an entity that is both of type `A` and type `B`.

```javascript
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U> {};
    for (let id in first) {
        result[id] = first[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            result[id] = second[id];
        }
    }
    return result;
}

var x = extend({ a: "hello" }, { b: 42 });
var s = x.a;
var n = x.b;
```

```javascript
interface A { a: string }
interface B { b: string }
interface C { c: string }

var abc: A & B & C;
abc.a = "hello";
abc.b = "hello";
abc.c = "hello";
```

## String Literal Types

It is very common for JavaScript libraries to consume a string as a configuration parameter, and usually in such cases you want to restrict the possible strings to a certain set.

Starting with TypeScript 1.8, strings in a type position will become string literal types. Only exact string matches are assignable to string literal types, and like any other type, they can be used in union types as well.

```javascript
interface AnimationOptions {
    deltaX: number;
    deltaY: number;
    easing: "ease-in" | "ease-out" | "ease-in-out";
}

// Error: Type '"out"' is not assignable to type '"ease-in" | "ease-out" | "ease-in-out"'
new UIElement().animate({ deltaX: 100, deltaY: 100, easing: "out" });
```

# Classes
* Classes are object blueprints

```javascript
class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    sayHi(){
        return `Hello, I'm ${this.name}`;
    }
}

var person = new Person("Peter Parker");
console.log(person.sayHi());
```

## Inheritance
* Child classes inherit all method and properties

```javascript
class DeadPool extends Person{
    sayHi(){
        return `${super.sayHi()}, and I'm awesome!`;
    }
}

let dp = new DeadPool("Piscina de la muerte");

alert(dp.sayHi());
```

## Public / Private Modifiers
* Class properties are public by default
* Private properties cannot be accessed externally

```javascript
class Person{
    public name;
    private _secret;

    constructor(name, secret){
        this.name = name;
        this._secret = secret;
    }
}

let person = new Person("Bruce Wayne", "I'm Batman!");
console.log(person.name); // Bruce Wayne
console.log(person._secret); // compile-time error
```

## Accessors (Getters/Setters)

* Let you define special functions for accessing or setting a variable

```javascript
class Person{
    public name;
    private _secret;

    constructor(name, secret){
        this.name = name;
        this.secret = secret; // setter
    }

    get secret(){
        return this._secret;
    }

    set secret(secret){
        this._secret = secret;
    }
}

let person = new Person("Bruce Wayne", "I'm Batman!");
console.log(person.name); // Bruce Wayne
console.log(person.secret); // I'm Batman
```

## Static Properties
* Static properties belong to the class itself, and not an instance

```javascript
class Shape{
    static count = 0;

    constructor(){
        Shape.count++;
    }
}

let circle = new Shape();
let triangle = new Shape();

console.log(Shape.count); // 2
```

## Abstract classes and methods
An abstract class is allowed to have methods with no implementation, and cannot be constructed.

```javascript
abstract class Base {
    abstract getThing(): string;
    getOtherThing() { return 'hello'; }
}

let x = new Base(); // Error, 'Base' is abstract

// Error, must either be 'abstract' or implement concrete 'getThing'
class Derived1 extends Base { }

class Derived2 extends Base {
    getThing() { return 'hello'; }
    foo() {
        super.getThing();// Error: cannot invoke abstract members through 'super'
    }
}

var x = new Derived2(); // OK
var y: Base = new Derived2(); // Also OK
y.getThing(); // OK
y.getOtherThing(); // OK
```


# Interfaces
* Creates a contract for code

## Class Types
```javascript
interface IAnimal{
    name: string;
    color?: string; // optional property
    makeSound(): string;
}

class Dog implements IAnimal{
    name: string;

    constructor(name){
        this.name = name;
    }

    makeSound(){
        return "Woof!"
    }
}
```

## Object Types
```javascript
interface ILocation{
    x: number;
    y: number;
    z: number;
}

let location1 : ILocation = {x:1, y:2, z:3 };
let location2 : ILocation = {x:1 }; // Error. Missing {y, z}
let location3 : ILocation = {x:1, y:2, z:3, v: true }; // Error. ILocation has no property {v}
```

## Function types
```javascript
interface IGreet{
    (name: string): string;
}

let greetings: IGreet = (n: string): string => `Say Hello to ${n}`

console.log(greetings("BlackJack"));
```

## Fluent Interfaces
* A fluent interface is an implementation of an object oriented API that aims to provide more readable code.

```javascript
class BasicCalculator {
    public constructor(protected value: number = 0) { }

    public currentValue(): number {
        return this.value;
    }

    public add(operand: number) {
        this.value += operand;
        return this;
    }

    public subtract(operand: number) {
        this.value -= operand;
        return this;
    }

    public multiply(operand: number) {
        this.value *= operand;
        return this;
    }

    public divide(operand: number) {
        this.value /= operand;
        return this;
    }
}

let calc = new BasicCalculator(2)
    .multiply(5)
    .add(1)
    .currentValue();

console.log(calc); // 11
```

## Decorators
A decorator is an expression that evaluates to a`function` that takes the `target`, `name`, and `property` descriptor as _arguments_ and optionally returns a property descriptor to install on the target object.

> As for `typescript 1.7`, experimental support for decorators is a feature that is subject to change in a future releases. Specify '--experimentalDecorators' to remove warnings.

```javascript
// Decorators readonly and enumerable(false) will be applied
// to the property method before it is installed on class C.
// This allows the decorator to change the implementation,
// and in this case, augment the descriptor to be
// writable: false and enumerable: false.

class C {
    @readonly
    @enumerable(false)
    method() { }
}

function readonly(target, key, descriptor) {
    descriptor.writable = false;
}

function enumerable(value) {
    return function (target, key, descriptor) {
        descriptor.enumerable = value;
    }
}
```

# Modules
* Convenient way of sharing code between files

## Internal Modules
* No need to _import_ them
* If modules are in separate files, you need to reference them with ```/// <reference path="path/to/file.ts">``` and load the js files in the proper sequence, based on dependencies.

```javascript
namespace App.Math{
    export function add(a,b){
        return a+b;
    }
}

let sum = App.Math.add(5,12);

console.log(sum);
```

## External Modules
If you want to use external modules, you have to decide which module system to use and then compile your sources using the **--module** compiler flag. Possible values are **_amd_**, **_commonjs_**, **umd** and **system**.

You don’t have to use the module keyword in external modules, as the files name and path will create the namespace.

### Using AMD (RequireJS)
```html
<!--index.html-->
<script data-main="main" src="Scripts/require.js" type="text/javascript"></script>
```

```javascript
// main.ts
require.config({
    baseUrl : "."
}); 

require(["bootstrapper"], (bootstrap) => {
    bootstrap.run();
});
```

```javascript
// bootstrapper.ts
import * as ds from "dataservice";

export function run() {
    let service = new ds.DataService();
    console.log(service);
}
```

```javascript
/// dataservice.ts
export interface IDataService {
    msg: string;
    getMessage(): string;
};

export class DataService implements IDataService {
    msg = 'Data from API Call';
    getMessage() { return this.msg; }
}
```

## Module Augmentation

With module augmentation, users have the ability to extend existing modules such that consumers can specify if they want to import the whole module or just a subset. This can be accomplished by simply adding an ambient module declaration and extending any existing types.

```javascript
// scale.ts
export class Scale {
    weightOnEarth(mass) {}
}
// advancedScale.ts
import { Scale } from "./scale" ;

// create augmentation for Scale
declare module "./scale" {
    // Augment Core class via interface merging
    interface Scale {
        weightOnMoon(mass); // not everyone needs moon weight
    }
}
Scale.prototype.advancedMethod = /* insert implementation */;

```

```javascript
// consumer.ts
import { Scale } from "./scale";
import "./advancedScale";

let scale: Scale;
scale.weightOnMoon(10);  // ok
```

## Concatenate AMD and System modules with --outFile

Specifying `--outFile` in conjunction with `--module` amd or `--module` system will concatenate all modules in the compilation into a single output file containing multiple module closures.

A module name will be computed for each module based on its relative location to `rootDir`.

```javascript
// file src/a.ts
import * as B from "./lib/b";
export function createA() {
    return B.createB();
}
```

```javascript
// file src/lib/b.ts
export function createB() {
    return { };
}
```

Results in:

```javascript
define("lib/b", ["require", "exports"], function (require, exports) {
    "use strict";
    function createB() {
        return {};
    }
    exports.createB = createB;
});
define("a", ["require", "exports", "lib/b"], function (require, exports, B) {
    "use strict";
    function createA() {
        return B.createB();
    }
    exports.createA = createA;
});
```

# Typescript ES6/7 features support
> Support for ES5 transpile with `Typescript 1.7` compiler

| Feature | Information | Support |
|---|:-:|:-:|
| Exponentiation operator  | [`** / **=`](https://github.com/rwaldron/exponentiation-operator)  | YES |
| Arrows | [`=>`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) | YES |
| Classes | [`class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) | YES |
| Enhanced Object Properties | [`{x, y}`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer) | YES |
| Template Strings | [`${this.value}`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/template_strings) | YES |
| Destructuring assignment |  [`[a, b] = [1, 2]`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) | YES |
| Spread Operator | [`[...iterable]`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Spread_operator) | YES |
| Rest Operator | [`function(a,b, ...args){}`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/rest_parameters) | YES |
| Default parameters | [`function(a, b = 1){}`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/default_parameters) | YES |
| let / const | [`let`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/let) / [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) | YES |
| for...of | [`for (variable of iterable){}`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/for...of) | YES |
| Symbols | [`Symbol([description])`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol) | NO |
| Iterators | [`Symbol.iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators) | NO |
| Generators | [`function* (){ yield /*...*/ }`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) | NO* |
| Modules | [`import`](https://developer.mozilla.org/en/docs/web/javascript/reference/statements/import) / [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) | YES |
| Map/Set | [`new Map([iterable])`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map) / [`new Set(iterable)`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Set) | NO |
| WeakMap/WeakSet | [`new WeakMap([iterable])`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) / [` new WeakSet([iterable])`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) | NO |
| Promises | [`new Promise((resolve, reject) => {})`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) | [NO](https://www.npmjs.com/package/es6-promise) |
| Proxy/Reflection | [`new Proxy(target, handler)`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Proxy) / [`Reflect`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect) | NO |
| Decorators | [`@decorator`](https://github.com/wycats/javascript-decorators) | YES ** |

> * `*` support when targeting ES6.
> *  `**` experimental