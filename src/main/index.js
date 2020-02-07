'use strict'

import { app, BrowserWindow, Tray, ipcMain, Notification, dialog, autoUpdater } from 'electron'
import shell from 'shelljs'
import path from 'path'
import ps from 'portscanner'
import fs from 'fs'
import '../renderer/store'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

app.dock.hide()

let tray
let window
let mainWindow
const server = 'https://hazel.mgenglder.now.sh'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`
console.log('feed url ', feed)
// autoUpdater.setFeedURL(feed)
const assetsDirectory = path.join(__dirname, 'assets')
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createTray () {
  tray = new Tray(path.join(assetsDirectory, 'cloudTemplate.png'))
  tray.setToolTip('FCS Toolbox')
  tray.setHighlightMode('selection')
  tray.on('right-click', toggleWindow)
  tray.on('double-click', toggleWindow)
  tray.on('click', function (event) {
    toggleWindow()
    // Show devtools when command clicked
    if (mainWindow.isVisible() && process.defaultApp && event.metaKey) {
      window.openDevTools({ mode: 'detach' })
    }
  })
}
const getWindowPosition = () => {
  const windowBounds = mainWindow.getBounds()
  const trayBounds = tray.getBounds()

  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 4)

  return { x: x, y: y }
}

const showWindow = () => {
  const position = getWindowPosition()
  mainWindow.setPosition(position.x, position.y, false)
  mainWindow.show()
  mainWindow.focus()
  mainWindow.openDevTools({ mode: 'detach' })
}

function toggleWindow () {
  if (mainWindow.isVisible()) {
    mainWindow.hide()
  } else {
    showWindow()
  }
}

function createWindow () {
  createTray()
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 450,
    width: 300,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true
  })

  mainWindow.loadURL(winURL)
  mainWindow.openDevTools({ mode: 'detach' })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts, (response) => {
    if (response === 0) autoUpdater.quitAndInstall()
  })
})

autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})

ipcMain.on('openApp', (event, appName) => {
  let newWindow = new BrowserWindow({
    height: 800,
    width: 800,
    show: true,
    frame: true,
    fullscreenable: true,
    resizable: true
  })
  newWindow.loadURL('http://localhost:9080/#' + appName)
})

ipcMain.on('ping', (event, arg) => {
  event.sender.send('pingBack', 'I got your ping')
})

ipcMain.on('serviceStatusChange', (event, service, status) => {
  console.log('services status changed!! ', service, ' ', status)
  let myNotification = new Notification({
    title: service + ' has changed it\'s status',
    body: 'it is now ' + status
  })
  for (let x = 0; x < 10; x++) {
    myNotification.close()
  }
  for (let x = 0; x < 10; x++) {
    myNotification.show()
  }
})

ipcMain.on('allFolderConfigurations', (event) => {
  let userConfiguration = readConfigurationFile()
  event.sender.send('allFolderConfigurations', userConfiguration)
})

ipcMain.on('updateFolderConfigurations', (event, userConfiguration) => {
  createUpdateConfigurationFile(userConfiguration)
})

ipcMain.on('selectFcsDirectory', (event) => {
  event.sender.send('fcsDirectory', dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  }))
})

ipcMain.on('selectFcsWebDirectory', (event) => {
  event.sender.send('fcsWebDirectory', dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  }))
})

ipcMain.on('selectFcsUiDirectory', (event) => {
  event.sender.send('fcsUiDirectory', dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  }))
})

ipcMain.on('launchFcs', (event, serviceToStart, environment) => {
  console.log('launching fcs!' + ' ' + serviceToStart + ' in ' + environment)
  let { fcs } = readConfigurationFile()
  shell.exec(`bash ${fcs}/${serviceToStart}/launch.sh ${environment}`, function (code, stdout, stderror) {
    console.log('output... ' + serviceToStart)
    console.log('code... ' + code)
    console.log(stdout)
  })
})

ipcMain.on('launchFcsWeb', (event, environment) => {
  console.log('launching fcs web! in ' + environment)
  let { fcsWeb } = readConfigurationFile()
  shell.exec(`cd ${fcsWeb} && npm run local-dev`, function (code, stdout, stderror) {
    console.log('code... ' + code)
    console.log(stdout)
  })
})

ipcMain.on('launchExternal', (event, externalName) => {
  console.log('launching ' + externalName)
  let { fcs } = readConfigurationFile()
  shell.exec(`bash ${fcs}/local-services/dbUp.sh`, function (code, stdout, stderror) {
    console.log('code... ' + code)
    console.log(stdout)
  })
})

setInterval(() => {
  let portsForServices = [
    '8080',
    '8081',
    '8082',
    '8083',
    '8084',
    '8085',
    '8086',
    '8087'
  ]
  let servicesEvent = 'allRunningServicesResponse'

  let portsForExternals = [
    '8088',
    '8089',
    '8090',
    '8091',
    '8092'
  ]
  let externalsEvent = 'allRunningExternalsResponse'
  checkIfPortsOpenAndEmit(portsForServices, servicesEvent)
  checkIfPortsOpenAndEmit(portsForExternals, externalsEvent)
}, 300)

// function parseDataFile (filePath, defaults) {
//   try {
//     return JSON.parse(fs.readFileSync(filepPath))
//   } catch (error) {
//     return {
//       default: true
//     }
//   }
// }

function readConfigurationFile () {
  let pathToFile = app.getPath('appData') + '/FCSToolbar/configuration.json'
  try {
    let userConfiguration = fs.readFileSync(pathToFile)
    return JSON.parse(userConfiguration)
  } catch (err) {
    createUpdateConfigurationFile()
    let userConfiguration = fs.readFileSync(pathToFile)
    return JSON.parse(userConfiguration)
  }
}

function createUpdateConfigurationFile (userConfiguration = { name: '', folderLocations: { fcs: '', fcsWeb: '', fcsUi: '' } }) {
  let pathToStorage = app.getPath('appData') + '/FCSToolbar'
  let pathToFile = pathToStorage + '/configuration.json'

  if (!fs.existsSync(pathToStorage)) {
    fs.mkdirSync(pathToStorage)
  }

  let configurationString = JSON.stringify(userConfiguration)
  try {
    fs.writeFileSync(pathToFile, configurationString, 'utf8')
  } catch (err) {
    throw err
  }
}

function checkIfPortsOpenAndEmitOld (portsArray, servicesEvent) {
  let activePortMapping = {}
  let promiseArray = []
  portsArray.forEach((port) => {
    promiseArray.push(ps.checkPortStatus(port, '127.0.0.1'))
  })

  Promise.all(promiseArray)
    .then((values) => {
      values.map((value, index) => {
        let currentPort = portsArray[index]
        activePortMapping[currentPort] = value
      })
      mainWindow.webContents.send(servicesEvent, activePortMapping)
    })
    .catch((e) => {
      console.log(e, 'catastrophic failure')
    })
}

function checkIfPortsOpenAndEmit (portsArray, servicesEvent) {
  let activePortMapping = {}
  let promiseArray = []
  portsArray.forEach((port) => {
    promiseArray.push(ps.checkPortStatus(port, '127.0.0.1'))
  })

  Promise.all(promiseArray)
    .then((values) => {
      values.map((value, index) => {
        let currentPortStatus
        let currentPort = portsArray[index]
        switch (value) {
          case 'open':
            console.log('something was started: ', currentPort)
            currentPortStatus = 'started'
            break
          case 'closed':
            currentPortStatus = 'stopped'
            break
          default:
            currentPortStatus = 'stopped'
            break
        }

        activePortMapping[currentPort] = currentPortStatus
      })
      mainWindow.webContents.send(servicesEvent, activePortMapping)
    })
    .catch((e) => {
      console.log(e, 'catastrophic failure')
    })

  setInterval(() => {
    autoUpdater.checkForUpdates()
  }, 600)
}
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
