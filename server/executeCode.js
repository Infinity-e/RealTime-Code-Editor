import fs from "fs";
import { exec } from "child_process";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const tempDir = path.resolve("server/temp_files"); // Ensure the correct path

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true }); // Create temp_files folder if not exists
}

export function executeCode(language, code, callback) {
    const fileName = `${uuidv4()}.${language === "python" ? "py" : "js"}`;
    const filePath = path.join(tempDir, fileName);

    try {
        fs.writeFileSync(filePath, code); // Write the code to a temp file

        const command = language === "python" ? `python "${filePath}"` : `node "${filePath}"`;

        exec(command, (error, stdout, stderr) => {
            callback(error ? `Error: ${stderr || error.message}` : stdout);
            fs.unlinkSync(filePath); // Delete temp file after execution
        });
    } catch (err) {
        callback(`File Write Error: ${err.message}`);
    }
}
