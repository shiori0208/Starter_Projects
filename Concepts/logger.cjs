const fs = require('fs');
const os = require('os'); 

const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(message) {
        this.emit('message', {message}); 
    }
}

const logger = new Logger();
const logFile = './eventlog.txt'; 

const logToFile = (event) => {
    const logMessage = `${new Date().toISOString()} : 
    ${event.message} \n`; 
    fs.appendFileSync(logFile, logMessage); 

}

//event name should be same for emitter and listener to communicate

logger.on('message', logToFile); 

setInterval(() => {
    const memoryUsage = (os.freemem() / os.totalmem()) * 100;
    logger.log(`Current mem usage: ${memoryUsage.toFixed(2)}`);
}, 3000); 

logger.log('App started');
logger.log('App event occured');
