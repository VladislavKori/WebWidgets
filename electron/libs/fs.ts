import fs from "node:fs";

const functionsForRendrer = {
  name: "fs",
  functions: {
    readFile: (args: { path: string }) => fs.readFileSync(args.path, "utf-8"),
    writeFile: (args: { path: string, data: string }) => fs.writeFileSync(args.path, args.data),
    rm: (args: { path: string }) => fs.rmSync(args.path, { recursive: true, force: false }),
    exists: (args: { path: string }) => fs.existsSync(args.path),
    mkdir: (args: { path: string }) => fs.mkdirSync(args.path),
    readdir: (args: { path: string }) => fs.readdirSync(args.path),
  },
};

export default functionsForRendrer;
