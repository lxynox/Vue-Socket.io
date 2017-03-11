var assert = require('assert')

var io = require('socket.io')
var conn = require('socket.io-client')('http://localhost:3000')
var Vue = require('vue')
var VueSocketio = require('../dist').default

Vue.use(VueSocketio, conn)

describe('[socket.io-client plugin for vue]', function () {
	var vm

	before(function (done) {
		io.listen(3000)
			.on('connection', client => {
				client.on('ask', msg => {
					assert.equal(msg.question, 'QUESTION')
					client.emit('reply', {answer: 'ANSWER'})
				})

				client.on('test custom handler', () => {
					client.emit('custom', {foo: 'foo'})
				})

				done()
			})
	})

	beforeEach(function () {
		vm = new Vue({template: '<div></div>'}).$mount()
	})

	it('should be able to proxy client socket', done => {
		vm.$socket.emit('ask', {question: 'QUESTION'})
		vm.$socket.on('reply', data => {
			assert.equal(data.answer, 'ANSWER')
			vm.$destroy()
			done()
		})
	})

	it('should be able to register custom handler', done => {
		vm = new Vue({
			template: '<div></div>',
			sockets: {
				custom(data) {
					assert.equal(data.foo, 'foo')
					done()
				}
			}
		}).$mount()
		vm.$socket.emit('test custom handler', null)
	})

	it('should be able to detach custom handler once destroyed', () => {
		//
	})
})
