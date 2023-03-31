import winston from 'winston'

const { createLogger, format, transports} = winston
const { combine, printf, timestamp, colorize} = format

const logConfiguration = {
    level: 'info',
    format: combine(
        timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        colorize(),
        printf((info) => `${info.level} || ${info.message} || ${info.timestamp}`)
    ),
    transports:[ 
        new transports.Console(),
         new transports.File({
            filename: './logs/error.log',
            level: 'error'
        }),
        new transports.File({
            filename: './logs/warn.log',
            level: 'warn'
        })
    ]
}



export const logger = createLogger(logConfiguration)
