const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT || 3000;

// Initialize Next.js
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Rooms state in memory
const rooms = new Map();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("join-room", ({ roomId, userName }) => {
      socket.join(roomId);

      if (!rooms.has(roomId)) {
        rooms.set(roomId, {
          users: new Map(),
          revealed: false,
        });
      }

      const room = rooms.get(roomId);
      room.users.set(socket.id, {
        id: socket.id,
        name: userName,
        vote: null,
      });

      // Update everyone in the room
      io.to(roomId).emit("room-update", {
        users: Array.from(room.users.values()),
        revealed: room.revealed,
      });

      console.log(`${userName} joined room ${roomId}`);
    });

    socket.on("vote", ({ roomId, vote }) => {
      const room = rooms.get(roomId);
      if (room && room.users.has(socket.id)) {
        const user = room.users.get(socket.id);
        // Toggle vote if same value, or set new
        user.vote = user.vote === vote ? null : vote;
        
        io.to(roomId).emit("room-update", {
          users: Array.from(room.users.values()),
          revealed: room.revealed,
        });
      }
    });

    socket.on("reveal-votes", (roomId) => {
      const room = rooms.get(roomId);
      if (room) {
        room.revealed = true;
        io.to(roomId).emit("room-update", {
          users: Array.from(room.users.values()),
          revealed: room.revealed,
        });
      }
    });

    socket.on("new-round", (roomId) => {
      const room = rooms.get(roomId);
      if (room) {
        room.revealed = false;
        // Reset all votes
        for (const user of room.users.values()) {
          user.vote = null;
        }
        io.to(roomId).emit("room-update", {
          users: Array.from(room.users.values()),
          revealed: room.revealed,
        });
      }
    });

    socket.on("disconnecting", () => {
      socket.rooms.forEach((roomId) => {
        const room = rooms.get(roomId);
        if (room && room.users.has(socket.id)) {
          room.users.delete(socket.id);
          
          if (room.users.size === 0) {
            // Keep room for a while or delete
            // rooms.delete(roomId);
          } else {
            io.to(roomId).emit("room-update", {
              users: Array.from(room.users.values()),
              revealed: room.revealed,
            });
          }
        }
      });
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
