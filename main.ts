interface Button {
  icon: string;
  onClick: () => void;
}
interface View {
  mount: (parent: HTMLElement) => void;
}

class MyPlugin {
  buttons: Button[] = [];
  views: View[] = [];

  init() {
    let button = {
      icon: "books",
      onClick: () => {
        console.log("btn cliced");
      },
    } as Button;
    let view = {
      mount: (parent: HTMLElement) => {
        if (!parent) return;

        let h1 = document.createElement("h1");
        h1.innerHTML = "H1";
        h1.onclick = (e: MouseEvent) => {
          console.log("h1 clicked");
        };

        let h2 = document.createElement("h2");
        h2.innerHTML = "H2";
        h2.onclick = (e: MouseEvent) => {
          console.log("h2 clicked");
        };

        parent.append(h1, h2);
      },
    } as View;
    this.registerButton(button);

    this.registerLeftMenuView(view);
  }

  registerButton(btn: Button) {
    this.buttons.push(btn);
  }

  registerLeftMenuView(view: View) {
    this.views.push(view);
  }
}

export default MyPlugin;
