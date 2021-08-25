import { altMod, altRandom, altTrunc, compose } from "./utils"

declare interface Point {
	x: number
	y: number
}

type Method = (...args: MethodParams) => P
type MethodParams =
	| [p: Partial<Point>]
	| [a: StaticParam]
	| [x: number, y: number]
	| [n?: number]

type StaticMethod = (arg0: StaticParam, arg1: StaticParam, ...args: StaticParam[]) => P
type StaticParam =  
	| Partial<Point>
	| [x?: number, y?: number] 
	| number

type StaticParamEnd<T> =  
	| [a: [x?: number, y?: number], b: T]
	| [a: Partial<Point>, b: T]
	| [a: number, b: T]


/**
	# P
	A Typescript 2D point class with methods for common point operations

	P's constructor and various methods, static and instance, allows for overloading.
	Points can be provided as:
	- One number ( a: number ): Gets assigned to x and y. a->x,y
	- Two numbers ( a: number, b: number ): The first argument gets assigned to x and the second to y. a->x & b->y
	- Array ([ x: number, y: number ]): The argument gets assigned to x and the second to y. el0->x & el1->y
	- Obj ({ x: number, y: number }): Each corresponding key is assigned. x->x & y->y
	However, overloading varies between methods, with some methods being restricted to their functionality.

	For a better explanation/understanding, check out the individual methods descriptions.
 */
export default class P {
	#x: number = 0
	#y: number = 0
	#previous: Point = { x: 0,y: 0 }
	
	constructor(...args: MethodParams) { this.set(...args) }

/* 
* Getters & Setters
*/
	/** The value of x */
	get x() { return this.#x }
	/** 
	 * Sets the value of x 
	 * @expects number
	 */
	set x(value) { this.set([value]) }

	/** The value of y */
	get y() { return this.#y }
	/**
	 * Sets the value of y
	 * @expects number
	 */
	set y(value) { this.set([,value]) }
	
	/** The value of x and y as an object */
	get value() { return this.toObject() }
	/**
	 * Sets the x and y coordinates by an object
	 * @expects { x: number, y: number }
	 */
	set value(value) { this.set(value) }

	/** The previous point, before latest change */
	get previous() { return this.#previous }

	/** 
	 * Sets the coordinates
	 */
	set(...[a, b]: MethodParams) {
		return this.#assign(
			Array.isArray(a) ? [a[0], a[1]]
			: typeof a === 'object' ? [a.x, a.y]
			: typeof a === 'number' && b === undefined ? [a, a ]
			: [a ?? this.x, b ?? this.y]
		)
	}

/*
* 	Methods for streamlining functionality. 
* 	Primarily deals with the verity of argument types.
* 	Consequently, reduce bugs, ease development and improved readability.
*/
	/** 
	 * Handles all assignments to x and y. Therefore, allowing previous to stand correct 
	 */
	#assign = ([x, y]: [x?: number, y?: number]) => {
		this.#previous = this.value
		x !== undefined && (this.#x = x)
		y !== undefined && (this.#y = y)
		return this
	}

	/** 
	 * Executes a function on both x and y 
	 */
	#ops = (func: (a: number) => number): [number, number] => [func(this.x), func(this.y)]

	/** 
	 * Composite of [**#assign**] and [**#ops**] 
	 */
	#asgOps = (func: (a: number) => number): this => this.#assign(this.#ops(func))

	/** 
	 * Executes a function on both x and y, that takes two numbers as parameter.
	 * The parameter being x resp. y, and second being a resp. b 
	 */
	#ABObs = <T>(
		func: (a: number,b?: number) => T,
		x?: number, 
		y?: number,
	): [T, T] => [func(this.x, x), func(this.y, y)]
	
	/**
	 * Guard for operations with MethodParams as the parameter.
	 * Delegates in accordance with type and to [**#ABObs**]
	 */
	#guardedOps = <T>(
		func: (a: number, b?: number) => T, 
		...[a,b]: MethodParams
	): [T, T] | undefined => 
		typeof a === 'object' ? Array.isArray(a) ? this.#ABObs<T>(func, ...a) : this.#ABObs<T>(func, a.x, a.y)
		: typeof a === 'number' ? b === undefined ? this.#ABObs<T>(func, a, a) : this.#ABObs<T>(func, a, b)
		: undefined

	/**
	 * Guarded arithmetic assignment ops.
	 * A composite of [**#assign**] and [**#guardedOps**]
	 */
	#arithOps = (
		func: (a: number, b?: number) => number,
		...args: MethodParams
	) => this.#assign(this.#guardedOps(func, ...args) ?? [this.x, this.y])

	/**
	 * Guarded boolean ops.
	 * A composite of [**#guardedOps**]
	 */
	#checkOps = (
		func: (a: number, b: number) => boolean,
		...args: MethodParams
	) => this.#guardedOps((a, b) => b !== undefined && func(a, b), ...args) ?? [ false ]

/* 
*	General Arithmetic Operations 
*/
	/** 
	 * Adds a coordinate to the current
	 */
	add: Method = (...args) => this.#arithOps((a, b = 0) => a + b, ...args)

	/** 
	 * Subtracts a coordinate to the current
	 */
	sub: Method = (...args) => this.#arithOps((a, b = 0) => a - b, ...args)

	/**
	 * Multiplies a coordinate to the current
	 */
	mult: Method = (...args) => this.#arithOps((a, b = 1) => a * b, ...args)

	/**
	 * Divides a coordinate to the current
	 */
	div: Method = (...args) => this.#arithOps((a, b = 1) => a / b, ...args)

	/**
	 * Modulus a coordinate to the current
	 */
	mod: Method = (...args) => this.#arithOps((a, b = a) => altMod(a,b), ...args)

	/**
	 * Powers a coordinate to the current
	 */
	pow: Method = (...args) => this.#arithOps((a, b = 1) => a ** b,...args)


	/**
	 * Instantiates P with the first coordinate/parameter and adds by the remaining parameters
	 */
	static add: StaticMethod = (...[init, ...args]) => args.reduce<P>((p, arg) => p.add(arg), new P(init))

	/**
	 * Instantiates P with the first coordinate/parameter and subtracts by the remaining parameters
	 */
	static sub: StaticMethod = (...[init, ...args]) => args.reduce<P>((p, arg) => p.sub(arg), new P(init))

	/**
	 * Instantiates P with the first coordinate/parameter and multiplies by the remaining parameters
	 */
	static mult: StaticMethod = (...[init, ...args]) => args.reduce<P>((p, arg) => p.mult(arg), new P(init))

	/**
	 * Instantiates P with the first coordinate/parameter and divides by the remaining parameters
	 */
	static div: StaticMethod = (...[init, ...args]) => args.reduce<P>((p, arg) => p.div(arg), new P(init))

	/**
	 * Instantiates P with the first coordinate/parameter and modulus by the remaining parameters
	 */
	static mod: StaticMethod = (...[init, ...args]) => args.reduce<P>((p, arg) => p.mod(arg), new P(init))

	/**
	 * Instantiates P with the first coordinate/parameter and powers by the remaining parameters
	 */
	static pow: StaticMethod = (...[init, ...args]) => args.reduce<P>((p, arg) => p.pow(arg), new P(init))

/* 
*	Util Arithmetic Operations 
*/
	/** 
	 * Sets each coordinate to the nearest integer, greater or equal to it
	 */
	ceil = () => this.#asgOps(Math.ceil)

	/** 
	 * Sets each coordinate to the nearest rounded integer 
	 */
	round = () => this.#asgOps(Math.round)

	/** 
	 * Sets each coordinate to the nearest integer, less or equal to it
	 */
	floor = () => this.#asgOps(Math.floor)

	/** 
	 * Sets each coordinate to a float, by removing the fractional digits bellow the provided number.
	 * If no argument is provided, defaults to no fractional digits (integer)
	 */
	trunc = (numOfDec: number = 0) => this.#asgOps(a => altTrunc(a, numOfDec))


/* 
*	Pow 
*/
	/** 
	 * Sets each coordinate to the square of the current
	 */
	sq = () => this.#asgOps(a => a ** 2)

	/** 
	 * Sets each coordinate to the square root of the current
	 */
	sqrt = () => this.#asgOps(a => a ** (1 / 2))

	/** 
	 * Sets each coordinate to the cube of the current
	 */
	cb = () => this.#asgOps(a => a ** 3)

	/** 
	 * Sets each coordinate to the cube root of the current
	 */
	cbrt = () => this.#asgOps(a => a ** (1 / 3))

	/** 
	 * Sets each coordinate to the absolute of the current
	 */
	abs = () => this.#asgOps(Math.abs)

	/** 
	 * Sets each coordinate to the inverse of the current
	 */
	inverse = () => this.pow(-1)


/* 
*	Boolean 
*/
	/** 
	 * Executes a function that takes two number as its parameters, on both coordinates.
	 * The first supplied parameter is the current coordinates and the second the provided 
	 */
	check = (
		func: (a: number, b: number) => boolean, 
		...args: MethodParams
	) => this.#checkOps(func, ...args)

	/** 
	 * Checks if *both* coordinates equals the provided parameters
	 */
	is = (...args: MethodParams) => this.#checkOps((a, b) => a === b, ...args).every(el => el)

	/** 
	 * Checks if *either* coordinate equals the provided parameters
	 */
	has = (...args: MethodParams) => this.#checkOps((a, b) => a === b, ...args).some(el => el)

	/** 
	 * Checks if the distance between two points is within a tolerance
	 */
	isClose = (...[arg, tolerance]: StaticParamEnd<number>) => this.getDistanceSq(arg) < (tolerance ** 2)

	/** 
	 * Checks if *both* coordinates are equal to zero
	 */
	isZero = () => !this.x && !this.y

	/** 
	 * Checks if *either* coordinate are equal to zero
	 */
	hasZero = () => !this.x || !this.y


/* 
*	Value 
*/
	/**
	 * Returns a string representation of the coordinates
	 */
	toString = () => `{x: ${this.x}, y: ${this.y}}`

	/**
	 * Returns an array representation of the coordinates
	 */
	toArray = () => [ this.x, this.y ]

	/**
	 * Returns an object representation of the coordinates
	 */
	toObject = () => ({ x: this.x, y: this.y })


/* 
* 	Utils 
*/
	/** 
	 * Returns a copy of this
	 */
	clone = () => new P(this.x, this.y)

	/**
	 * Sets the coordinates to 0
	 */
	zero = () => this.set(0)

	/**
	 * Sets the coordinates to 1
	 */
	one = () => this.set(1)

	/**
	 * Returns the sum of x and y
	 */
	getSum = () => this.x + this.y

	/**
	 * Returns distance of x and y, squared
	 */
	getDistanceSq = (...args: MethodParams) => this.clone().sub(...args).sq().getSum()

	/**
	 * Returns distance of x and y
	 */
	getDistance = (...args: MethodParams) => compose(Math.sqrt, this.getDistanceSq)(...args)

	/** 
	 * Adds a coordinate (the first parameter) to the current, then multiplies it by the next arguments
	 */
	mix = (...[arg, ...args]: [StaticParam, ...MethodParams]) => this.add(arg).mult(...args)
	
	/**
	 * Set each coordinates to a random integer, between two numbers.
	 * If only one number is provided, defaults to between 0 and the number
	 */
	random = (...args: [a: number, b?: number]) => this.#arithOps(altRandom, args)

	/**
	 * Generates random point, with each coordinate being a random integer between two numbers
	 * If only one number is provided, defaults to between 0 and the number
	 */
	static random = (...args: [a: number, b?: number]) => new P(altRandom(...args), altRandom(...args))

	/**
	 * Return a point with the smallest x and y of the supplied arguments
	 */
	static min: StaticMethod = (...args) => new P(Math.min(...args.map(arg => new P(arg).x)), Math.min(...args.map(arg => new P(arg).y)))

	/**
	 * Return a point with the largest x and y of the supplied arguments
	 */
	static max: StaticMethod = (...args) => new P(Math.max(...args.map(arg => new P(arg).x)), Math.max(...args.map(arg => new P(arg).y)))

	/**
	 * Calls a defined callback function on each coordinate, and returns an array that contains the results.
	 */
	map = <T>(callback: (value: number, index: number, array: number[]) => T) => this.toArray().map(callback)

	/**
	 * Calls a defined callback function on each coordinate
	 */
	forEach = <T>(callback: (value: number, index: number, array: number[]) => T): P => (this.toArray().forEach(callback), this)
}