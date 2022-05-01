const options = {
  folderPath: './Logger/',
  dateBasedFileNaming: true,
  fileNamePrefix: 'debug_',
  fileNameExtension: '.log',
  dateFormat: 'YYYY_MM_D',
  timeFormat: 'h:mm:ss A',
}

const log = require('node-file-logger');
log.SetUserOptions(options);

/**
 * @param {require("../../utils/client")} client 
 */

module.exports = (client, info) => {
  log.Debug(String(info))
}