import { ipcRenderer } from "electron";

const desktopCapturer = {
    getSources: (opts: any) => ipcRenderer.invoke("screenshare-get-sources", opts)
};

export const screenPicker = async (): Promise<string> => {
  const sources: Electron.DesktopCapturerSource[] = await desktopCapturer.getSources({
    types: ["screen", "window"]
  });

  return `
  <div class="screenshare-main">
    <ul class="screenshare-list">
      ${
        sources.map(
          (source) =>
          `
          <li class="screenshare-source">
          <button class="screenshare-source-selection screenshare-action-button" data-id="${source.id}" title="${source.name}">
            <img class="screenshare-source-image" src="${source.thumbnail.toDataURL()}" />
            <span class="screenshare-source-name">${source.name}</span>
          </button>
          </li>
          `
        ).join("")
      }
    </ul>
    <div class="screenshare-actionbar screenshare-action-button">
      <button class="screenshare-cancel" data-id="screenshare-cancel" title"cancel">Cancel</button>
    </div>
  </div>
  `
}

export const screenshareScript = `
window.navigator.mediaDevices.getDisplayMedia = () => new Promise(async (resolve, reject) => {
  try {
    const selectionElem = document.createElement('div');
    selectionElem.classList = ['discordbsd-screenshare'];
    selectionElem.innerHTML = await window.discordbsd.screenPicker();
    document.body.appendChild(selectionElem);
    document
      .querySelectorAll('.screenshare-action-button')
      .forEach((button) => {
        button.addEventListener('click', async () => {
          try {
            const id = button.getAttribute('data-id');
            if (id === 'screenshare-cancel') {
              reject(new Error('Cancelled by user'));
            } else {
              const stream = await window.navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                  mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: id,
                  },
                },
              });
              resolve(stream);
            }
          } catch (err) {
            reject(err);
          } finally {
            selectionElem.remove();
          }
        });
      });
  } catch (err) {
    reject(err);
  }
});
`
