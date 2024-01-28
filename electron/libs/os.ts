import os from "node:os";

const functionsForRendrer = {
  name: "os",
  functions: {
    arch: () => os.arch(),
    constants: () => os.constants,
    cpus: () => os.cpus(),
    freemem: () => os.freemem(),
    homedir: () => os.homedir(),
    hostname: () => os.hostname(),
    machine: () => os.machine(),
    release: () => os.release(),
    totalmem: () => os.totalmem(),
    type: () => os.type(),
    uptime: () => os.uptime(),
    userInfo: () => os.userInfo(),
    version: () => os.version(),
  },
};

export default functionsForRendrer;
