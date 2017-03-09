import Socket from 'socket.io-client'

export default {

    install(Vue, connection, store) {
      if(!connection) {
        throw new Error("[socket.io] cannot locate connection")
      }

      // mockey patch socket
      let socket
      if (typeof connection === 'string') {
        socket = Socket(connection)
      } else {
        socket = connection
      }
      Vue.prototype.$socket = socket

      // mixins
      Vue.mixin({
        created() {
          const sockets = this.$options['sockets']
          for (const evt of Object.keys(sockets)) {
            const handler = sockets[evt]
            this.$socket.on(evt, data => {
              if (store && store._mutations[`__socket__${evt}`]) {
                store.commit(`__socket__${evt}`, data)
              }
              handler(data)
            })
          }
        }
      })
    }

}
