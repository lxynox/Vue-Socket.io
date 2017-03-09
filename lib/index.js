import Socket from 'socket.io-client'

export default {

	install(Vue, connection, opts) {
		// Mockey-patch socket
		let socket
		if (connection !== null && typeof connection === 'object') {
			socket = connection
		} else {
			/* eslint-disable new-cap */
			socket = Socket(connection || '', opts)
		}
		Vue.prototype.$socket = socket

		// Life-cycle hooks
		const addListeners = function () {
			const config = this.$options.sockets
			for (const evt of Object.keys(config)) {
				this.$socket.on(evt, config[evt].bind(this))
			}
		}
		const removeListeners = function () {
			const config = this.$options.sockets
			for (const evt of Object.keys(config)) {
				this.$socket.off(evt, config[evt].bind(this))
			}
		}

		// Mixins
		Vue.mixin({
			created: addListeners,
			beforeDestroy: removeListeners
		})
	}

}
