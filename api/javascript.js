
const { unlinkSync, writeFileSync } = require("fs");
const { nanoid } = require("nanoid");
const { spawn } = require("child_process");

const code = "console.log('Hello from code executor')";

let fileName = `./api/${nanoid(9)}.js`;

writeFileSync(fileName, code);

let file = spawn(`node`, [fileName]).stdout.on("data", data => console.log(data.toString()));