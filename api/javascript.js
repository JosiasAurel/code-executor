
const { unlinkSync, writeFileSync } = require("fs");
const { nanoid } = require("nanoid");
const { spawn } = require("child_process");
const express = require("express");

// create new express app
const app = express();

app.use(express.json()); // make use of express JSON middleware


app.post("/api/javascript", async (req, res) => {
    let { codes } = req.body;

    let fileName = `./api/${nanoid(9)}.js`;

    writeFileSync(fileName, codes);

    let file = await spawn(`node`, [fileName]).stdout.on("data", data => {
        res.json({
            result: data.toString()
        });
        unlinkSync(fileName); // delete file
    });

});

module.exports = app;

app.listen(4000, () => console.log("Listening on port 4000"));