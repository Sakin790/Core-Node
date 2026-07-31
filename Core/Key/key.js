import readline from "node:readline"

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on("keypress", (str, key) => {
    console.log(`You pressed: ${str}`);

    // Exit on Ctrl+C
    if (key.ctrl && key.name === "c") {
        process.exit();
    }
});

console.log("Press any key...");
