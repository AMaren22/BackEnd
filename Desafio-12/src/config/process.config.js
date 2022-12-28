import minimist from "minimist";

const optionalArgsObject = {
    alias: {
        p: "puerto",
    },
    default: {
        p: 8080
    }
}

//VER QUE ONDA PORQUE NO ANDAN LOS ARGS CON NODEMON
export const args = minimist(process.argv.slice(2), optionalArgsObject)