// Keep image paths relative so the site works from a folder, a local preview,
// or a hosted subdirectory (not only from a domain root).
const photos = [
  "photo-01.jpg", "photo-02.jpg", "photo-03.jpg",
  "photo-04.jpg", "photo-05.jpg", "photo-06.jpg",
  "photo-07.jpg", "photo-08.jpg", "photo-09.jpg"
];
const button = document.getElementById('giftButton');
const burst = document.getElementById('photoBurst');
const message = document.getElementById('surpriseMessage');
let opened = false;
if (button) {
  button.addEventListener('click', () => {
    if (opened) return;
    opened = true;
    button.classList.add('opened');
    button.setAttribute('aria-label', 'Surprise opened');
    message.classList.add('show');
    photos.forEach((src, index) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Anniversary memory ${index + 1}`;
      img.loading = 'eager';
      img.decoding = 'async';
      img.className = 'burst-photo';
      img.style.zIndex = String(5 + index);
      burst.appendChild(img);
      const angle = (index / photos.length) * Math.PI * 2 - Math.PI / 2;
      const radiusX = Math.min(window.innerWidth * .36, 390);
      const radiusY = Math.min(window.innerHeight * .30, 240);
      const x = Math.cos(angle) * radiusX;
      const y = Math.sin(angle) * radiusY;
      const rotation = (index % 2 ? 1 : -1) * (8 + index * 2);
      requestAnimationFrame(() => {
        img.classList.add('fly');
        img.style.setProperty('--x', `${x}px`);
        img.style.setProperty('--y', `${y}px`);
        img.style.setProperty('--r', `${rotation}deg`);
        img.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotation}deg) scale(1)`;
      });
    });
    button.querySelector('.tap-hint').textContent = 'Your memories are here ♡';
  });
}
