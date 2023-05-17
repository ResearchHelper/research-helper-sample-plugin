import path from "path";
import fs from "fs";

export interface Settings {
  theme: "dark" | "light"; // dark by default
  language: "en_US" | "zh_CN"; // en_US by default
  storagePath: string; // select by user
  fontSize: string; // 16px by default
}

export interface AppState {
  _id: "appState";
  _rev: string;
  dataType: "appState";
  leftMenuSize: number;
  showLeftMenu: boolean; // is leftmenu expanded
  selectedFolderId: string;
  workingItemId: string;
  openedProjectIds: string[];
  settings: Settings;
}

export enum NoteType {
  MARKDOWN = "markdown",
  EXCALIDRAW = "excalidraw",
}

export interface Button {
  icon: string;
  tooltip: string;
  onClick: () => void;
}

export interface View {
  mount: (parent: HTMLElement) => void;
}

export interface LayoutController {
  openPage: (itemId: string) => void;
  closePage: (itemId: string) => void;
}

export interface Controller {
  layout: LayoutController;
  db: PouchDB.Database;
  path: typeof path;
  fs: typeof fs;
}

export class Plugin {
  ribbonBtns: Button[] = [];
  ribbonToggleBtns: Button[] = [];
  pdfMenuBtns: Button[] = [];
  pageView: View;
  leftMenuView: View;
  pdfMenuView: View;

  controller: Controller;

  constructor(controller: Controller) {
    this.controller = controller;
  }

  /**
   * Clears all data
   */
  init() {
    this.ribbonBtns = [];
    this.ribbonToggleBtns = [];
    this.pdfMenuBtns = [];
    this.pageView = {} as View;
    this.leftMenuView = {} as View;
    this.pdfMenuView = {} as View;
  }

  /**
   * Runs when plugin is enabled
   * Put all addXXBtn / addXXView here
   */
  enable() {
    throw new Error("enable() must be implemented");
  }

  /**
   * Runs when plugin is disabled
   */
  disable() {}

  async getStoragePath() {
    let appState = (await this.controller.db.get("appState")) as AppState;
    return appState.settings.storagePath;
  }

  /**
   * Add a button to ribbon
   * A page will be created when clicked
   * @param btn
   */
  addRibbonBtn(btn: Button) {
    this.ribbonBtns.push(btn);
  }

  /**
   * Add a toggle button to ribbon
   * LeftMenu will be toggled when clicked
   * @param btn
   */
  addRibbonToggleBtn(btn: Button) {
    this.ribbonToggleBtns.push(btn);
  }

  /**
   * Add a button to selection menu in PDF
   * @param btn
   */
  addPDFMenuBtn(btn: Button) {
    this.pdfMenuBtns.push(btn);
  }

  /**
   * Register view to LeftMenu
   * @param view
   */
  registerLeftMenuView(view: View) {
    this.leftMenuView = view;
  }

  /**
   * Register view to Page
   * @param view
   */
  registerPageView(view: View) {
    this.pageView = view;
  }

  /**
   * Register view to selection menu in PDF
   * @param view
   */
  registerPDFMenuView(view: View) {
    this.pdfMenuView = view;
  }

  /**
   * Add settings page
   */
  addSettings(view: View) {}
}
