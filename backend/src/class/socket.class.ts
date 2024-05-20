import http from "http";
import { Server } from "socket.io";

export default class Socket {
    private static _instance: Socket;
    private static _io: Server;
    private static _clients: Map<string, any> = new Map();
    private static _nbClients: number = 0;

    private constructor(server: http.Server) {
        Socket._io = new Server(server);
        Socket._io.on("connection", (socket) => {
            console.log("New client connected");
            Socket._clients.set(socket.id, {});
            Socket._nbClients++;
            socket.on("disconnect", () => {
                console.log("Client disconnected");
                Socket._clients.delete(socket.id);
                Socket._nbClients--;
            });
        });
    }

    public static getInstance(server?: http.Server) {
        if (!Socket._instance) {
            Socket._instance = new Socket(server!);
        }
        return Socket._instance;
    }

    public get io() {
        return Socket._io;
    }
}