import path from "node:path";

const functionsForRendrer = {
  name: "path",
  functions: {
    basename: (args: { path: string; suffix?: string }) =>
      path.posix.basename(args.path, args.suffix),
    delimiter: () => path.delimiter,
    dirname: (args: { path: string }) => path.dirname(args.path),
    extname: (args: { path: string }) => path.extname(args.path),
    isAbsolute: (args: { path: string }) => path.isAbsolute(args.path),
    join: (args: { paths: Array<string> }) => path.join(...args.paths),
    normalize: (args: { path: string }) => path.normalize(args.path),
    parse: (args: { path: string }) => path.parse(args.path),
    relative: (args: { from: string; to: string }) =>
      path.relative(args.from, args.to),
    resolve: (args: { paths: Array<string> }) => path.resolve(...paths),
    sep: () => path.sep,
  },
};

export default functionsForRendrer;
