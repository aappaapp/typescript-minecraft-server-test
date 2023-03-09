import { createServer, ServerOptions } from "minecraft-protocol";
import MinecraftData, { LoginPacket } from "minecraft-data";

let serverOptions: ServerOptions = {
    "online-mode": false,
    version: "1.19.2",
};

let server = createServer(serverOptions);

let minecraftData = MinecraftData(
    typeof serverOptions.version === "string" ? serverOptions.version : 0
);

const LOGIN_PACKET = minecraftData.loginPacket;

server.on("connection", (client) => {});

server.on("listening", () => {
    console.log("Listening for connection!");
});

server.on("login", (client) => {
    let loginPacket: LoginPacket = {
        ...LOGIN_PACKET,
        entityId: client.id,
        gameMode: 0,
        maxPlayers: 1,
    };
    client.write("login", loginPacket);

    client.write("position", {
        x: 0,
        y: 1.62,
        z: 0,
        yaw: 0,
        pitch: 0,
        flags: 0x00,
    });
    var msg = {
        translate: "chat.type.announcement",
        with: ["Server", "Hello, world!"],
    };
    client.write("chat", { message: JSON.stringify(msg), position: 0, sender: "0" });
});
