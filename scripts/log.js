const log = require("electron-log");// 修改日志记录的格式

log.transports.file.level = 'info'
log.transports.file.maxSize = 5 * 1024 * 1024
log.transports.file.format =
  "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {text}";
log.transports.console.format =
  "[{h}:{i}:{s}.{ms}] [{level} {processType}] › {text}";

global.logger = log;

