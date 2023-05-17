import { Plugin, Button, NoteType, Controller } from "./plugin";

class MyPlugin extends Plugin {
  enable() {
    let button = {
      icon: "assignment",
      tooltip: "Memo",
      onClick: this.openMemo,
    } as Button;
    this.addRibbonBtn(button);
  }

  disable() {
    this.controller.layout.closePage("memo");
  }

  /**
   * Create Memo in database and its actual file in disk
   * @returns success
   */
  async createMemo(): Promise<boolean> {
    try {
      let folder = this.controller.path.join(
        await this.getStoragePath(),
        "memo"
      );
      if (!this.controller.fs.existsSync(folder))
        this.controller.fs.mkdirSync(folder);
      let memoPath = this.controller.path.join(folder, "memo.md");

      let memo = {
        _id: "memo", // id in pouchdb for finding
        _rev: "", // rev in pouch for version keep
        dataType: "note", // research helper will open note page
        type: NoteType.MARKDOWN, // will open markdown note page
        label: "Memo", // label on the window tab
        path: memoPath, // markdown file path (use absolute path)
      };
      await this.controller.db.put(memo); // put into database
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async openMemo() {
    // If memo exists (create it if not), then open the page for it.
    // No need to worry about save/load,
    // since the path is in the note object,
    // the note page will take care of the .md file
    try {
      await this.controller.db.get("memo");
    } catch (error) {
      await this.createMemo();
    }
    this.controller.layout.openPage("memo");
  }
}

export default MyPlugin;
