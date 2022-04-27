// import path from 'path'
import { app, Tray, Menu, BrowserWindow } from 'electron'
import { SkyeApp } from '~/SkyeApp'
import { Application } from '~/main/Application'

const path = require('path')

export class MainApplication {

    public static start(root: string) {
        const application = new MainApplication(root)
        return application
    }

    private window: BrowserWindow | null = null
    private tray: Tray | null = null

    private mainRoot: string = ''
    private rendererRoot: string = ''
    private staticRoot: string = ''

    constructor(root: string) {
        this.mainRoot = path.join(root, 'main')
        this.rendererRoot = path.join(root, 'renderer')
        this.staticRoot = path.join(root, '..', 'static')

        this.tray = new Tray(path.join(this.staticRoot, 'icon.png'))
        this.tray.setToolTip('Electron Skye Browser')
        this.tray.setContextMenu(Menu.buildFromTemplate([
            { label: 'Open', click: () => this.openWindow() },
            { label: 'Open Skye', click: () => this.openSkye() },
            { label: 'Close', click: () => app.exit(0) /*app.quit()*/ },
        ]))

        this.openWindow()

        SkyeApp.init()
    }

    public openWindow() {
        if (this.window) {
            return this.window.show()
        }

        this.window = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(this.mainRoot, 'preload.js')
            },
            icon: path.join(this.staticRoot, 'icon2.png')
        })

        this.window.loadFile(path.join(this.rendererRoot, 'index.html'))

        this.window.on('close', e => {
            this.window = null
        })
    }

    public openSkye() {
        Application.getInstance().windows.open()
    }
}
