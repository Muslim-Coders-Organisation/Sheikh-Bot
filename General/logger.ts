import moment from 'moment';
import chalk from 'chalk';
import { appendFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
type level = "info" | "warn" | "error" | "fatal" | "critical";
const log = (level: level, service: string, message: string) => {
    let color = chalk.white
    if (level === "error") {
        color = chalk.redBright
    } else if (level === "warn") {
        color = chalk.yellowBright
    } else if (level === "fatal") {
        color = chalk.magentaBright
    } else if (level === "info") {
        color = chalk.cyanBright
    } else if (level === "critical") {
        color = chalk.magentaBright
    }
    process.stdout.write(`${moment().format('HH:mm:ss') + "." + moment().millisecond()} ${service}/${color(level)} ${message}\n`);
}

const clearLog = () => {
    process.stdout.write('\x1Bc');
}

const errorLog = (err: Error | unknown, kill?: boolean) => {
    process.stdout.write(String(err) + '\n')
    writeFileSync(__dirname + '/../error-latest.log', err.stack)
    if (kill) {
        process.exit(1);
    }
} 



export default log;
export { clearLog, errorLog }
