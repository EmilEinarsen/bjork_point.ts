export const altMod = (a:number,b:number) => a - (b * Math.floor(a/b))

export const altTrunc = (n: number, nDec: number) => Math.trunc(n*(10**nDec))/(10**nDec)

export const altRandom = (a: number, b: number = 0) => Math.floor(Math.random()*(b-a+1)+a)

export function compose <T extends any[], R>(
	...fns: [...((a: R) => R)[], (...args: T) => R]
) {
	const lastFn = fns.pop() as (...args: T) => R
	const restFns = fns as ((a: R) => R)[]
	const piped = restFns.reduceRight((pre, next) => (v: R) => next(pre(v)), v => v)
	return (...args: T) => piped(lastFn(...args))
}