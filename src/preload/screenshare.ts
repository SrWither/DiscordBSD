import { ipcRenderer } from "electron";

const desktopCapturer = {
  getSources: (opts: any) => ipcRenderer.invoke("screenshare-get-sources", opts)
};

export const screenPicker = async (): Promise<string> => {
  const sources: Electron.DesktopCapturerSource[] = await desktopCapturer.getSources({
    types: ["screen", "window"],
    thumbnailSize: { width: 800, height: 600 }
  });

  return `
  <div class="screenshare-main">
    <div class="screenshare-header">
      <h2 class="screenshare-title">Select a Screen to Share</h2>
    </div>
    <ul class="screenshare-lists">
      ${sources.map(
    (source) => `
          <li>
            <button data-id="${source.id}" title="${source.name}" class="screenshare-lists-screen screenshare-action-button">
              <img src="${source.thumbnail.toDataURL()}" alt="${source.name}" />
              <div>
                <span>${source.name}</span>
              </div>
            </button>
          </li>
          `
  ).join("")
    }
    </ul>
    <div class="screenshare-actionbar">
      <button data-id="screenshare-cancel" title="Cancel" class="screenshare-cancelbtn screenshare-action-button">Cancel</button>
    </div>
  </div>
`;

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
            console.log("ID: ", id);
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
