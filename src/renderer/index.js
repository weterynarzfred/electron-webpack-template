import { shell, ipcRenderer } from 'electron';
import $ from 'cash-dom';
import './index.scss';

ipcRenderer.send('test', 'A');

ipcRenderer.on('test_2', (event, message) => {
  console.log(message);
});

$('body').on('click', 'a', event => {
  event.preventDefault();
  shell.openExternal(event.target.href);
});

console.log('renderer');
