import { Server } from 'socket.io';


const socketIoHandler = (req: any, res: any) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server)

    io.on('connection', socket => {
      socket.broadcast.emit('user connect')

      socket.on('send message', (target) => {
        console.log(`Send message has occured, id :: ${target.clientId}, msg :: ${target.message}`)

        console.log(`Current socket is ${socket.id}, and from socket is ${target.clientId}`)
        socket.broadcast.emit('receive message', target.message);
      })

      socket.on('receive data', msg => {
        console.log(msg)
      })
    })

    res.socket.server.io = io
  } else {
    console.log('socket.io already running')
  }
  res.end()
}

export default socketIoHandler;