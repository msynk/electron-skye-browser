import { app } from 'electron'
import { MainApplication } from "./main/MainApplication"

let application: MainApplication = null

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs
app.whenReady().then(() => {
  application = MainApplication.start(__dirname)

  app.on('activate', () => {
    // On macOS create/show the window when the dock icon is clicked:
    application.openWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly:
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit()
// })

// preventing the default behavior of electron
// that quits the app when all windows are closed:
app.on('window-all-closed', (e: any) => e.preventDefault())