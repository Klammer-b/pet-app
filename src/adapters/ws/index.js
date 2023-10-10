const { WebSocketServer } = require('ws');
const jwt = require('jsonwebtoken');
const usersService = require('../../services/users');
const { JWT_SECRET } = require('../../constants/env');

const wss = new WebSocketServer({ port: 8080 }, () => {
  console.log('Web socket server is running on 8080');
});

const rooms = {};

const join = (room, ws) => {
  rooms[room].push(ws);
};

const broadcast = (room, message) => {
  rooms[room].forEach((member) => member.send(message));
};

const leave = (room, user) => {
  rooms[room] = rooms[room].filter((member) => member !== ws);
  broadcast(
    room,
    JSON.stringify({
      text: `${user.name} left chat!`,
    }),
  );
};

wss.on('connection', async (ws, req) => {
  const { auth: token } = req.headers;

  if (!token) {
    ws.send('You should provide a token!');
    ws.close();
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    ws.send('Token is broken');
    ws.close();
    return;
  }

  const user = await usersService.findById(payload.sub);

  if (user.role === 'admin') {
    ws.send(
      JSON.stringify({
        meta: 'connected',
        text: `User ${user.name} joined!`,
      }),
    );

    ws.on('message', (rawData) => {
      const { room, meta, ...rest } = JSON.parse(rawData);
      if (meta === 'join') {
        join(room, ws);
      } else if (meta === 'chat') {
        broadcast(room, rawData.toString());
      } else if (meta === 'leave') {
        leave(room, user);
      }
    });
  } else if (user.role === 'guest') {
    const roomId = `chat-${user._id}`;
    rooms[roomId] ? rooms[roomId].push(ws) : (rooms[roomId] = [ws]);

    ws.send(
      JSON.stringify({
        meta: 'connected',
        room: roomId,
        text: `User ${user.name} joined!`,
      }),
    );

    ws.on('message', (rawData) => {
      const { room, meta, ...rest } = JSON.parse(rawData);

      if (meta === 'chat') {
        broadcast(room, rawData.toString());
      } else if (meta === 'leave') {
        leave(room, user);
      }
    });

    ws.on('close', () => {
      broadcast(roomId, JSON.stringify({ text: 'Guest is left!' }));
      delete rooms[roomId];
    });
  }

  ws.on('error', console.error);
});
