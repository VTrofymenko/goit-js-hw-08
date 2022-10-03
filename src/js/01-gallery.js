// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const gallery = document.querySelector('.gallery');

gallery.innerHTML = createGalleryMarkup(galleryItems);

function createGalleryMarkup(items) {
  return items
    .map(
      ({ preview, original, description }) => `
  <a class="gallery__item" href=${original}>
    <img
      class= "gallery__image"
      src= ${preview}
      alt= "${description}">
      
  </a>`,
    )
    .join('');
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
