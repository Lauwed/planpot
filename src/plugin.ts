import type { PluginMessageEvent } from './model';

penpot.ui.open('Planpot - Generate your plannings!', `?theme=${penpot.theme}`);

penpot.on('themechange', (theme) => {
  sendMessage({ type: 'theme', content: theme });
});

function sendMessage(message: PluginMessageEvent) {
  penpot.ui.sendMessage(message);
}
