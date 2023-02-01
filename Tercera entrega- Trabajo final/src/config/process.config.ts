import minimist from "minimist";

const optionalArgsObject = {
  alias: {
    m: "modo",
  },
  default: {
    m: "fork",
  },
};

export const args = minimist(process.argv.slice(2), optionalArgsObject);
