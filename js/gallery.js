const images = [
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
      description: 'Hokkaido Flower',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
      description: 'Container Haulage Freight',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
      description: 'Aerial Beach View',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
      description: 'Flower Blooms',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
      description: 'Alpine Mountains',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
      description: 'Mountain Lake Sailing',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
      description: 'Alpine Spring Meadows',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
      description: 'Nature Landscape',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
      description: 'Lighthouse Coast Sea',
    },
  ];
  
  const gallery = document.querySelector(".gallery");
  
  const galleryMarkup = images.map(({ preview, original, description }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${original}">
          <img
            class="gallery-image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `).join("");
  
  gallery.innerHTML = galleryMarkup;
  
  gallery.addEventListener("click", onGalleryClick);
  
  let currentIndex = 0;
  
  function onGalleryClick(event) {
      event.preventDefault(); 
  
      if (event.target.nodeName !== "IMG") {
          return;
      }
  
      const clickedImage = event.target;
      const largeImageURL = clickedImage.dataset.source; 
      const description = clickedImage.alt; 
  
      const instance = basicLightbox.create(`
          <div class="modal-container">
              <button class="modal-btn prev">&#10094;</button>
              <img src="${largeImageURL}" width="800" height="600" class="modal-image">
              <button class="modal-btn next">&#10095;</button>
              <div class="modal-description">${description}</div>
          </div>
      `);
  
      instance.show();
  
      const imagesInModal = document.querySelectorAll('.gallery-item img');
      currentIndex = Array.from(imagesInModal).indexOf(clickedImage);
  
      const prevButton = instance.element().querySelector('.prev');
      const nextButton = instance.element().querySelector('.next');
  
      
      prevButton.addEventListener('click', () => {
          currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
          const newImage = imagesInModal[currentIndex];
          instance.element().querySelector('img').src = newImage.dataset.source;
          instance.element().querySelector('.modal-description').textContent = newImage.alt;
      });
  
     
      nextButton.addEventListener('click', () => {
          currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
          const newImage = imagesInModal[currentIndex];
          instance.element().querySelector('img').src = newImage.dataset.source;
          instance.element().querySelector('.modal-description').textContent = newImage.alt;
      });
  
      
      document.addEventListener('keydown', (event) => {
          if (event.key === 'Escape') {
              instance.close();
          }
      });
  }
  

