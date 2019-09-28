'use strict'

import { app, BrowserWindow, Tray, ipcMain } from 'electron'
import path from 'path'
import ps from 'portscanner'
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
const assetsDirectory = path.join(__dirname, 'assets')
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createTray () {
  tray = new Tray(path.join(assetsDirectory, 'cloudTemplate.png'))
  tray.on('right-click', toggleWindow)
  tray.on('double-click', toggleWindow)
  tray.on('click', function (event) {
    toggleWindow()
    // Show devtools when command clicked
    if (mainWindow.isVisible() && process.defaultApp && event.metaKey) {
      window.openDevTools({mode: 'detach'})
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

  return {x: x, y: y}
}

const showWindow = () => {
  const position = getWindowPosition()
  mainWindow.setPosition(position.x, position.y, false)
  mainWindow.show()
  mainWindow.focus()
  mainWindow.openDevTools({mode: 'detach'})
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
  mainWindow.openDevTools({mode: 'detach'})

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

ipcMain.on('ping', (event, arg) => {
  console.log(arg)
  event.sender.send('pingBack', 'I got your ping')
})

setInterval(() => {
  // console.log('Interval has been passed!!')
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

function checkIfPortsOpenAndEmit (portsArray, servicesEvent) {
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
