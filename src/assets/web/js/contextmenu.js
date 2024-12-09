(function() {
  const menu = document.createElement('div');
  menu.id = 'custom-context-menu';
  document.body.appendChild(menu);

  let activeImage = null

  document.addEventListener('contextmenu', (event) => {
    const target = event.target;
    const isImage = target.tagName === 'IMG' && target.className.startsWith('slide_');
    const isVideo = target.tagName === 'VIDEO' && target.className.startsWith('embedVideo_');

    if (isImage || isVideo) {
      event.preventDefault();
      if (activeImage) {
        activeImage.removeEventListener('click');
      }
      activeImage = target;

      target.addEventListener('click', () => {
        const menu = document.getElementById('custom-context-menu');
        if (menu) menu.style.display = 'none';
        activeImage = null;
      });

      const type = isImage ? 'img' : 'gif';
      showContextMenu(event.pageX, event.pageY, target, type);
    }
  });

  document.addEventListener('click', () => {
    const menu = document.getElementById('custom-context-menu');
    if (menu) menu.style.display = 'none';
    activeImage = null
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const menu = document.getElementById('custom-context-menu');
      if (menu) menu.style.display = 'none';
      activeImage = null
    }
  });

  function getUrlFromElement(element) {
    return element.parentElement.parentElement.parentElement.children[1].children[0].href
  }

  function showContextMenu(x, y, element, type) {
    const menu = document.getElementById('custom-context-menu');

    menu.innerHTML = '';

    const cdnurl = getUrlFromElement(element)

    const options = type === 'img'
      ? [
        { text: 'Copy Image', action: () => copyImage(cdnurl) },
        { text: 'Download Image', action: () => downloadImage(cdnurl) },
        { text: 'Copy Link', action: () => copyImageLink(cdnurl) },
        { text: 'Open Link', action: () => openImage(cdnurl) }
      ]
      : [
        { text: 'Copy Link', action: () => copyImageLink(cdnurl) },
        { text: 'Open Link', action: () => openImage(cdnurl) }
      ];

    options.forEach(({ text, action }) => {
      const option = document.createElement('div');
      option.className = 'menu-option';
      option.textContent = text;
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        action();
        menu.style.display = 'none';
      });
      menu.appendChild(option);
    });

    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
    menu.style.display = 'block';
  }

  async function copyImage(imageSrc) {
    try {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.src = imageSrc;

      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);

      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      if (!blob) {
        throw new Error('No se pudo convertir la imagen en un blob.');
      }

      const clipboardItem = new ClipboardItem({ 'image/png': blob });

      await navigator.clipboard.write([clipboardItem]);
      console.log('Imagen copiada al portapapeles');
    } catch (error) {
      console.error('Error copiando la imagen:', error);
    }
  }

  function copyImageLink(src) {
    navigator.clipboard.writeText(src).then(() => console.log('Imagen copiada.'));
  }

  async function downloadImage(imageSrc) {
    try {
      const result = await window.discordbsd.downloadFile(imageSrc);
      if (result.success) {
        console.log(`File downloaded and saved to: ${result.filePath}`);
      } else {
        console.error('Error downloading file:', result.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error in download process:', error);
    }
  }

  function openImage(src) {
    window.open(src, '_blank');
  }

  console.log('Context menu injected');
})();
