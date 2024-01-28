import fs from "node:fs";

const functionsForRendrer = {
  name: "fs",
  functions: {
    readFile: (args: { path: string }) => fs.readFileSync(args.path, "utf-8"),
  },
};

export default functionsForRendrer;
