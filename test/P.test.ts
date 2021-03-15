import P from '../P'

describe('class P', () => {

	describe('Constructor & set', () => {
		expect(new P(10,33).value).toMatchObject({x:10,y:33})
		expect(new P(99,0).value).toMatchObject({x:99,y:0})
		expect(new P(0,3).value).toMatchObject({x:0,y:3})

		expect(new P(0).value).toMatchObject({x:0,y:0})
		expect(new P(5).value).toMatchObject({x:5,y:5})
		expect(new P(-5).value).toMatchObject({x:-5,y:-5})

		expect(new P({y:1}).value).toMatchObject({x:0,y:1})
		expect(new P({x:84}).value).toMatchObject({x:84,y:0})
		expect(new P({x:0}).value).toMatchObject({x:0,y:0})
		expect(new P({x:22,y:5}).value).toMatchObject({x:22,y:5})

		expect(new P([]).value).toMatchObject({x:0,y:0})
		expect(new P([1]).value).toMatchObject({x:1,y:0})
		expect(new P([,1]).value).toMatchObject({x:0,y:1})
		expect(new P([-1,8]).value).toMatchObject({x:-1,y:8})

		expect(new P().value).toMatchObject({x:0,y:0})
	})

	describe('Value', () => {
		describe('Getters', () => {
			it('value', () => {
				expect(new P(10,33).value).toMatchObject({x:10,y:33})
				expect(new P(99,0).value).toMatchObject({x:99,y:0})
				expect(new P(0,3).value).toMatchObject({x:0,y:3})
				expect(new P().value).toMatchObject({x:0,y:0})
				expect(new P({y:1}).value).toMatchObject({x:0,y:1})
				expect(new P({x:84}).value).toMatchObject({x:84,y:0})
				expect(new P({x:0}).value).toMatchObject({x:0,y:0})
				expect(new P({x:22,y:5}).value).toMatchObject({x:22,y:5})
				expect(new P({x:22,y:5}).value).toMatchObject({x:22,y:5})
			})
			it('x', () => {
				expect(new P(10,33).x).toStrictEqual(10)
			})
			it('y', () => {
				expect(new P(10,33).y).toStrictEqual(33)
			})
			it('previous', () => {
				const p = new P(10,33)
				p.value = {x:-4,y:8899}
				expect(p.value).toStrictEqual({x:-4,y:8899})
				expect(p.previous).toStrictEqual({x:10,y:33})
				expect(P.add([1,2],[2,-7],[2,-7],[2,-7],[2,-7],[2,-7],[2,-7]).previous).toMatchObject({x:11,y:-33})
			})
		})
		describe('Setters', () => {
			it('value', () => {
				const p = new P(10,33)
				p.value = {x:2,y:-89}
				expect(p.value).toMatchObject({x:2,y:-89})
			})
			it('x', () => {
				const p = new P(10,33)
				p.x = 5
				expect(p.value).toMatchObject({x:5,y:33})
			})
			it('y', () => {
				const p = new P(10,33)
				p.y = -49
				expect(p.value).toMatchObject({x:10,y:-49})
			})
		})

		describe('Methods', () => {
			it('toObject', () => {
				expect(new P(10,33).toObject()).toMatchObject({x:10,y:33})
				expect(new P(99,0).toObject()).toMatchObject({x:99,y:0})
				expect(new P(0,3).toObject()).toMatchObject({x:0,y:3})
		
				expect(new P(0).toObject()).toMatchObject({x:0,y:0})
				expect(new P(5).toObject()).toMatchObject({x:5,y:5})
				expect(new P(-5).toObject()).toMatchObject({x:-5,y:-5})
		
				expect(new P({y:1}).toObject()).toMatchObject({x:0,y:1})
				expect(new P({x:84}).toObject()).toMatchObject({x:84,y:0})
				expect(new P({x:0}).toObject()).toMatchObject({x:0,y:0})
				expect(new P({x:22,y:5}).toObject()).toMatchObject({x:22,y:5})
		
				expect(new P([]).toObject()).toMatchObject({x:0,y:0})
				expect(new P([1]).toObject()).toMatchObject({x:1,y:0})
				expect(new P([,1]).toObject()).toMatchObject({x:0,y:1})
				expect(new P([-1,8]).toObject()).toMatchObject({x:-1,y:8})
		
				expect(new P().toObject()).toMatchObject({x:0,y:0})
			})
			it('toArray', () => {
				expect(new P(10,33).toArray()).toMatchObject([10,33])
				expect(new P(99,0).toArray()).toMatchObject([99,0])
				expect(new P(0,3).toArray()).toMatchObject([0,3])
		
				expect(new P(0).toArray()).toMatchObject([0,0])
				expect(new P(5).toArray()).toMatchObject([5,5])
				expect(new P(-5).toArray()).toMatchObject([-5,-5])
		
				expect(new P({y:1}).toArray()).toMatchObject([0,1])
				expect(new P({x:84}).toArray()).toMatchObject([84,0])
				expect(new P({x:0}).toArray()).toMatchObject([0,0])
				expect(new P({x:22,y:5}).toArray()).toMatchObject([22,5])
		
				expect(new P([]).toArray()).toMatchObject([0,0])
				expect(new P([1]).toArray()).toMatchObject([1,0])
				expect(new P([,1]).toArray()).toMatchObject([0,1])
				expect(new P([-1,8]).toArray()).toMatchObject([-1,8])
		
				expect(new P().toArray()).toMatchObject([0,0])
			})
			it('toString', () => {
				expect(new P(10,33).toString()).toStrictEqual(`{x: 10, y: 33}`)
				expect(new P(99,0).toString()).toStrictEqual(`{x: 99, y: 0}`)
				expect(new P(0,3).toString()).toStrictEqual(`{x: 0, y: 3}`)
		
				expect(new P(0).toString()).toStrictEqual(`{x: 0, y: 0}`)
				expect(new P(5).toString()).toStrictEqual(`{x: 5, y: 5}`)
				expect(new P(-5).toString()).toStrictEqual(`{x: -5, y: -5}`)
		
				expect(new P({y:1}).toString()).toStrictEqual(`{x: 0, y: 1}`)
				expect(new P({x:84}).toString()).toStrictEqual(`{x: 84, y: 0}`)
				expect(new P({x:0}).toString()).toStrictEqual(`{x: 0, y: 0}`)
				expect(new P({x:22,y:5}).toString()).toStrictEqual(`{x: 22, y: 5}`)
		
				expect(new P([]).toString()).toStrictEqual(`{x: 0, y: 0}`)
				expect(new P([1]).toString()).toStrictEqual(`{x: 1, y: 0}`)
				expect(new P([,1]).toString()).toStrictEqual(`{x: 0, y: 1}`)
				expect(new P([-1,8]).toString()).toStrictEqual(`{x: -1, y: 8}`)
		
				expect(new P().toString()).toStrictEqual(`{x: 0, y: 0}`)
			})
		})
	})

	describe('Arithmetic methods', () => {
		describe('Addition, add', () => {
			let isWorking = false
			it('instance', () => {
				expect(new P(10,33).add(1).value).toMatchObject({x:11,y:34})
				expect(new P(10,33).add(-1).value).toMatchObject({x:9,y:32})
				expect(new P(10,33).add(-1, 10).value).toMatchObject({x:9,y:43})
				expect(new P(10,33).add({x:0,y:2}).value).toMatchObject({x:10,y:35})
				expect(new P(10,33).add({x:2}).value).toMatchObject({x:12,y:33})
				expect(new P(10,33).add([0,2]).value).toMatchObject({x:10,y:35})
				expect(new P(10,33).add([,2]).value).toMatchObject({x:10,y:35})
				expect(new P(10,33).add().value).toMatchObject({x:10,y:33})
				expect(new P(10,33).add([1]).value).toMatchObject({x:11,y:33})
				isWorking = true
			})
			it('static', () => {
				if(!isWorking) throw('Instance method failed')
				expect(P.add([1,2],[2,-7]).value).toMatchObject({x:3,y:-5})
				expect(P.add([1,2],[2,-7],[2,-7],[2,-7],[2,-7],[2,-7],[2,-7]).value).toMatchObject({x:13,y:-40})
			})
		})
		describe('Subtraction, sub', () => {
			let isWorking = false
			it('instance', () => {
				expect(new P(10,33).sub(1).value).toMatchObject({x:9,y:32})
				expect(new P(10,33).sub(-1).value).toMatchObject({x:11,y:34})
				expect(new P(10,33).sub(-1, 10).value).toMatchObject({x:11,y:23})
				expect(new P(10,33).sub({x:0,y:2}).value).toMatchObject({x:10,y:31})
				expect(new P(10,33).sub({y:2}).value).toMatchObject({x:10,y:31})
				expect(new P(10,33).sub([0,2]).value).toMatchObject({x:10,y:31})
				expect(new P(10,33).sub([,2]).value).toMatchObject({x:10,y:31})
				expect(new P(10,33).sub().value).toMatchObject({x:10,y:33})
				expect(new P(10,33).sub([1]).value).toMatchObject({x:9,y:33})
				isWorking = true
			})
			it('static', () => {
				if(!isWorking) throw('Instance method failed')
				expect(P.sub([1,2],[2,-7]).value).toMatchObject({x:-1,y:9})
				expect(P.sub([1,2],[2,-7],[2,-7],[2,-7],[2,-7],[2,-7],[2,-7]).value).toMatchObject({x:-11,y:44})
			})
		})

		describe('Multiplication, mult', () => {
			let isWorking = false
			it('instance', () => {
				expect(new P(10,33).mult(1).value).toMatchObject({x:10,y:33})
				expect(new P(10,33).mult(3).value).toMatchObject({x:30,y:99})
				expect(new P(10,33).mult(0).value).toMatchObject({x:0,y:0})
				expect(new P(10,33).mult(-1).value).toMatchObject({x:-10,y:-33})
				expect(new P(10,33).mult(-2, 10).value).toMatchObject({x:-20,y:330})
				expect(new P(10,33).mult({x:1/2,y:2}).value).toMatchObject({x:5,y:66})
				expect(new P(10,33).mult({x:1/2}).value).toMatchObject({x:5,y:33})
				expect(new P(10,33).mult([1/2,2]).value).toMatchObject({x:5,y:66})
				expect(new P(10,33).mult([1/2]).value).toMatchObject({x:5,y:33})
				expect(new P(10,33).mult([,1/2]).value).toMatchObject({x:10,y:16.5})
				expect(new P(10,33).mult().value).toMatchObject({x:10,y:33})
				expect(new P(10,33).mult([1]).value).toMatchObject({x:10,y:33})
				isWorking = true
			})
			it('static', () => {
				if(!isWorking) throw('Instance method failed')
				expect(P.mult([1,2],[2,-7]).value).toMatchObject({x:2,y:-14})
				expect(P.mult([1,2],[2,-7],[2,-7],[2,-7]).value).toMatchObject({x:8,y:-686})
			})
		})
		
		describe('Division, div', () => {
			let isWorking = false
			it('instance', () => {
				isWorking = true
				expect(new P(10,33).div(1).value).toMatchObject({x:10,y:33})
				expect(new P(10,33).div(3).value).toMatchObject({x:10/3,y:11})
				expect(new P(10,33).div(0,-0).value).toMatchObject({x:Infinity,y:-Infinity})
				expect(new P(10,33).div(-1).value).toMatchObject({x:-10,y:-33})
				expect(new P(10,33).div(-2, 10).value).toMatchObject({x:-5,y:3.3})
				expect(new P(10,33).div({x:1/2,y:2}).value).toMatchObject({x:20,y:16.5})
				expect(new P(10,33).div({x:1/2}).value).toMatchObject({x:20,y:33})
				expect(new P(10,33).div([1/2,2]).value).toMatchObject({x:20,y:16.5})
				expect(new P(10,33).div([1/2]).value).toMatchObject({x:20,y:33})
				expect(new P(10,33).div([,1/2]).value).toMatchObject({x:10,y:66})
				expect(new P(10,33).div().value).toMatchObject({x:10,y:33})
				expect(new P(10,33).div([2]).value).toMatchObject({x:5,y:33})
			})
			it('static', () => {
				if(!isWorking) throw('Instance method failed')
				expect(P.div([1,2],[2,-7]).value).toMatchObject({x:1/2,y:2/-7})
				expect(P.div([1,2],[2,-7],[2,-7],[2,-7]).value).toMatchObject({x:1/8,y:-2/343})
			})
		})

		describe('Modulus, mod', () => {
			let isWorking = false
			it('instance', () => {
				isWorking = true
				expect(new P(10,33).mod(1).value).toMatchObject({x:0,y:0})
				expect(new P(10,33).mod(3).value).toMatchObject({x:1,y:0})
				expect(new P(10,33).mod(0,-0).value).toMatchObject({x:NaN,y:NaN})
				expect(new P(5,-6).mod(3).value).toMatchObject({x:2,y:0})
				expect(new P(0,-1).mod(3).value).toMatchObject({x:0,y:2})
				expect(new P(0,-1).mod([3,2]).value).toMatchObject({x:0,y:1})
				expect(new P(0,-1).mod({x:3,y:2}).value).toMatchObject({x:0,y:1})
				expect(new P(0,-1).mod({y:2}).value).toMatchObject({x:NaN,y:1})
				expect(new P(1,-1).mod({y:2}).value).toMatchObject({x:0,y:1})
				expect(new P(10,33).mod([3]).value).toMatchObject({x:1,y:0})
				expect(new P(10,33).mod([,5]).value).toMatchObject({x:0,y:3})
				expect(new P(10,33).mod([]).value).toMatchObject({x:0,y:0})
				expect(new P(10,33).mod().value).toMatchObject({x:10,y:33})
			})
			it('static', () => {
				if(!isWorking) throw('Instance method failed')
				expect(P.mod([1,2],[2,-7]).value).toMatchObject({x:1,y:-5})
				expect(P.mod([1,2],[2,-7],[2,-7],[2,-7],[2,-7],[2,-7]).value).toMatchObject({x:1,y:-5})
			})
		})

		describe('Power, pow', () => {
			let isWorking = false
			it('instance', () => {
				isWorking = true
				expect(new P(10,33).pow(1).value).toMatchObject({x:10,y:33})
				expect(new P(10,33).pow(3).value).toMatchObject({x:1e3,y:35937})
				expect(new P(10,33).pow(0,-0).value).toMatchObject({x: 1,y:1})
				expect(new P(10,33).pow(-1).value).toMatchObject({x:1/10,y:1/33})
				expect(new P(10,0).pow(-2, 10).value).toMatchObject({x:1/100,y:0})
				expect(new P(9,33).pow({x:1/2,y:2}).value).toMatchObject({x:3,y:1089})
				expect(new P(9,33).pow({y:2}).value).toMatchObject({x:9,y:1089})
				expect(new P(9,33).pow([1/2,2]).value).toMatchObject({x:3,y:1089})
				expect(new P(10,33).pow([1,1])).toMatchObject({x:10,y:33})
				expect(new P(10,36).pow([,1/2])).toMatchObject({x:10,y:6})
				expect(new P(10,33).pow([])).toMatchObject({x:10,y:33})
				expect(new P(10,33).pow()).toMatchObject({x:10,y:33})
			})
			it('static', () => {
				if(!isWorking) throw('Instance method failed')
				expect(P.pow([1,2],[2,-2]).value).toMatchObject({x:1,y:1/4})
				expect(P.pow([1,2],[2,-2],[2,-2],[2,-2]).value).toMatchObject({x:1,y:1/(16*16)})
			})
		})

		describe('Utils', () => {
			it('ceil', () => {
				expect(new P(1.6,1.1).ceil().toArray()).toMatchObject([2,2])
			})
			it('round', () => {
				expect(new P(1.6,1.1).round().toArray()).toMatchObject([2,1])
			})
			it('floor', () => {
				expect(new P(1.6,1.1).floor().toArray()).toMatchObject([1,1])
			})
			it('trunc', () => {
				expect(new P(1.6,1.1).trunc().toArray()).toMatchObject([1,1])
				expect(new P(1.61,1.17).trunc(1).toArray()).toMatchObject([1.6,1.1])
				expect(new P(1.62357,1.1234).trunc(3).toArray()).toMatchObject([1.623,1.123])
			})
			it('sq', () => {
				expect(new P(2,3).sq().toArray()).toMatchObject([4,9])
			})
			it('sqrt', () => {
				expect(new P(4,9).sqrt().toArray()).toMatchObject([2,3])
			})
			it('cb', () => {
				expect(new P(2,3).cb().toArray()).toMatchObject([8,27])
			})
			it('cbrt', () => {
				expect(new P(8,27).cbrt().toArray()).toMatchObject([2,3])
			})
			it('abs', () => {
				expect(new P(-2,3).abs().toArray()).toMatchObject([2,3])
				expect(new P(-2).abs().toArray()).toMatchObject([2,2])
			})
			it('inverse', () => {
				expect(new P(2).inverse().toArray()).toMatchObject([1/2,1/2])
				expect(new P(-2).inverse().toArray()).toMatchObject([-1/2,-1/2])
				expect(new P(10,-66).inverse().toArray()).toMatchObject([1/10,-1/66])
				expect(new P(1/3).inverse().toArray()).toMatchObject([3,3])
				expect(new P(1/3,-4/7).inverse().toArray()).toMatchObject([3,-7/4])
			})
		})
	})

	describe('boolean methods', () => {
		it('is', () => {
			expect(new P(-46,9).is(45,9)).toBe(false)
			expect(new P(-46,9).is({x:4,y:-200})).toBe(false)
			expect(new P(-46,9).is(-46)).toBe(false)
			expect(new P(-46,9).is(-46,9)).toBe(true)
			expect(new P(-46,9).is({x:-46,y:9})).toBe(true)
			expect(new P(9,9).is(9)).toBe(true)
		})
		it('has', () => {
			expect(new P(-46,9).has(45,9)).toBe(true)
			expect(new P(-46,9).has({x:4,y:-200})).toBe(false)
			expect(new P(-46,9).has(-46)).toBe(true)
			expect(new P(-46,9).has(-46,9)).toBe(true)
			expect(new P(-46,9).has({x:-46,y:9})).toBe(true)
			expect(new P(9,9).has(9)).toBe(true)
		})
		it('isZero', () => {
			expect(new P(1,1).isZero()).toBe(false)
			expect(new P(1).isZero()).toBe(false)
			expect(new P([1]).isZero()).toBe(false)
			expect(new P([1,1]).isZero()).toBe(false)
			expect(new P({x:1}).isZero()).toBe(false)
			expect(new P({x:1,y:1}).isZero()).toBe(false)
			expect(new P().isZero()).toBe(true)
			expect(new P(0).isZero()).toBe(true)
			expect(new P(0,0).isZero()).toBe(true)
		})
		it('hasZero', () => {
			expect(new P(1,1).hasZero()).toBe(false)
			expect(new P(1).hasZero()).toBe(false)
			expect(new P([1]).hasZero()).toBe(true)
			expect(new P([1,1]).hasZero()).toBe(false)
			expect(new P({x:1}).hasZero()).toBe(true)
			expect(new P({x:1,y:1}).hasZero()).toBe(false)
			expect(new P().hasZero()).toBe(true)
			expect(new P(0).hasZero()).toBe(true)
			expect(new P(0,0).hasZero()).toBe(true)
		})
		it('isClose', () => {
			expect(new P(1,1).isClose([],1/2)).toBe(false)
			expect(new P(1,1).isClose([],5)).toBe(true)
		})
		it('check', () => {
			expect(new P(1,1).check((a,b)=>a>b,2)).toMatchObject([false,false])
			expect(new P(1/2,1).check((a,b)=>a<=b,1)).toMatchObject([true,true])
			expect(new P(1,1).check((a,b)=>a>b,[2])).toMatchObject([false,false])
			expect(new P(1/2,1).check((a,b)=>a<=b,[1,2])).toMatchObject([true,true])
			expect(new P(1/2,1).check((a,b)=>a<b,[,2])).toMatchObject([false,true])
			expect(new P(1,1).check((a,b)=>a>b,{x:2})).toMatchObject([false,false])
			expect(new P(1/2,1).check((a,b)=>a<=b,{x:1,y:2})).toMatchObject([true,true])
			expect(new P(1/2,1).check((a,b)=>a<b,{y:2})).toMatchObject([false,true])
			expect(new P(1/2,1).check((a,b)=>a<b)).toMatchObject([false])
			expect(new P(1/2,1).check((a,b)=>a<b,[])).toMatchObject([false,false])
		})
	})

	describe('utils methods', () => {
		it('clone', () => {
			const p = new P(6,8)
			const newP = p.clone()
			p.add(1)
			expect(p.value).not.toMatchObject(newP.value)
		})
		it('zero', () => {
			expect(new P(-19).zero().toArray()).toMatchObject([0,0])
			expect(new P(1289).zero().toArray()).toMatchObject([0,0])
			expect(new P([,20]).zero().toArray()).toMatchObject([0,0])
			expect(new P({x:-2}).zero().toArray()).toMatchObject([0,0])
		})
		it('one', () => {
			expect(new P(-19).one().toArray()).toMatchObject([1,1])
			expect(new P(1289).one().toArray()).toMatchObject([1,1])
			expect(new P([,20]).one().toArray()).toMatchObject([1,1])
			expect(new P({x:-2}).one().toArray()).toMatchObject([1,1])
		})
		it('getSum', () => {
			expect(new P(-19).getSum()).toStrictEqual(-38)
			expect(new P(1289).getSum()).toStrictEqual(1289*2)
			expect(new P([,20]).getSum()).toStrictEqual(20)
			expect(new P({x:-2}).getSum()).toStrictEqual(-2)
		})
		it('getDistance', () => {
			expect(new P(5).getDistance([5,4])).toStrictEqual(((5-5)**2+(5-4)**2)**(1/2))
			expect(new P({y:29}).getDistance([-2,4])).toStrictEqual(((0-(-2))**2+(29-4)**2)**(1/2))
		})
		it('getDistanceSq', () => {
			expect(new P(5).getDistanceSq([5,4])).toStrictEqual((5-5)**2+(5-4)**2)
			expect(new P({y:29}).getDistanceSq([-2,4])).toStrictEqual((0-(-2))**2+(29-4)**2)
		})
		it('mix', () => {
			expect(new P().mix([2,9],2,0).toArray()).toMatchObject([4,0])
			expect(new P([5,8]).mix([2,9],2,1/2).toArray()).toMatchObject([14,8.5])
		})
		describe('random', () => {
			it('Instance', () => {
				const arr = Array(1000).map(() => new P(2000,-2000).random(100))
				expect(arr).toHaveLength(1000)
				const result = arr.every(p=>(0<=p.x&&p.x<=100)&&(0<=p.y&&p.y<=100))
				expect(result).toBe(true)
			})
			it('Static', () => {
				const arr = Array(1000).map(() => P.random(-50,100))
				expect(arr).toHaveLength(1000)
				const result = arr.every(p=>(-50<=p.x&&p.x<=100)&&(-50<=p.y&&p.y<=100))
				expect(result).toBe(true)
			})
		})
		it('min', () => {
			expect(P.min(1,2,3,4,5,6,7).toArray()).toMatchObject([1,1])
			expect(P.min([29,2],[592,2],[,8],4,296,27,49,[237,2],2).toArray()).toMatchObject([0,2])
		})
		it('max', () => {
			expect(P.max(1,2,3,4,5,6,7).toArray()).toMatchObject([7,7])
			expect(P.max([29,2],[592,2],[,8],4,296,27,49,[237,2],2).toArray()).toMatchObject([592,296])
		})
		it('map', () => {
			expect(P.max(1,2,3,4,5,6,7).map((a)=>a*2)).toMatchObject([14,14])
			expect(P.max([29,2],[592,2],[,8],4,296,27,49,[237,2],2).map((a)=>a/2)).toMatchObject([296,148])
		})
		it('forEach', () => {
			const p = P.max(1,2,3,4,5,6,[7,2])
			expect(p.forEach((a)=>a===7&&p.mult(10)).toArray()).toMatchObject([70,60])
		})
	})
})

export {}