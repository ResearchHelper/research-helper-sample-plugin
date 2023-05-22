import { Plugin, Button, Page, SettingInput } from "research-helper";

class SimpleMemo extends Plugin {
  memoPath: string = "";

  constructor(params, controller) {
    super(params, controller);
    this.memoPath = this.controller.path.join(
      this.params.pluginPath,
      "memo.md"
    );
  }

  enable() {
    let button = {
      icon: "assignment",
      tooltip: "Memo",
      click: this.openMemo,
    } as Button;
    this.addRibbonBtn(button);

    let settingInput = this.getSettingValue("path");
    if (!settingInput)
      settingInput = {
        label: "path",
        description: "Path of memo.md",
        type: "input",
        inputType: "text",
        value: this.memoPath,
      } as SettingInput;
    else {
      this.memoPath = settingInput.value as string;
    }
    this.addSetting(settingInput);
  }

  disable() {
    this.controller.layout.closePage("memo");
  }

  openMemo() {
    // If memo exists (create it if not), then open the page for it.
    // No need to worry about save/load,
    // since the path is in the note object,
    // the note page will take care of the .md file
    let page = {
      id: "memo",
      label: "Memo",
      type: "NotePage",
      data: { notePath: this.memoPath },
    } as Page;
    this.openPage(page);
  }
}

export default SimpleMemo;
