import type { PluginMessageEvent } from "./model";

penpot.ui.open("Planpot - Generate your plannings!", `?theme=${penpot.theme}`);

penpot.on("themechange", (theme) => {
  sendMessage({ type: "theme", content: theme });
});

function sendMessage(message: PluginMessageEvent) {
  penpot.ui.sendMessage(message);
}

penpot.ui.onMessage<{ type: string; data: any }>((message) => {
  console.log(message);
  if (message.type === "generate") {
    const text = penpot.createText("Hello world!");

    if (text) {
      text.x = penpot.viewport.center.x;
      text.y = penpot.viewport.center.y;

      penpot.selection = [text];
    }
  }
});
