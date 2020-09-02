import PropTypes from 'prop-types';
import React, {useState} from 'react';
import Gallery from 'react-grid-gallery';

BGGallery.propTypes = {
  IMAGES: PropTypes.arrayOf(
      PropTypes.shape({
          src: PropTypes.string.isRequired,
          thumbnail: PropTypes.string.isRequired,
          srcset: PropTypes.array,
          caption: PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.element
          ]),
          thumbnailWidth: PropTypes.number.isRequired,
          thumbnailHeight: PropTypes.number.isRequired,
          isSelected: PropTypes.bool
      })
  ).isRequired
};

export default function BGGallery({IMAGES, setBgImage}) {
    const [images, setImages] = useState(IMAGES)

    const onSelectImage = (index, image) => {
        var imgs = images.slice();
        var img = imgs[index]
        imgs.forEach(img => {
          img.isSelected = false
        });
        if(img.hasOwnProperty("isSelected"))
            img.isSelected = !image.isSelected;
        else
            img.isSelected = true;
        setImages(imgs)
        setBgImage(img['src'])
    }

    return (
        <div style={{
            display: "block",
            minHeight: "1px",
            width: "100%",
            border: "1px solid #ddd",
            overflow: "auto"}}>
          <Gallery
            images={images}
            onSelectImage={onSelectImage}
            onClickThumbnail={onSelectImage}/>
        </div>
    );
}

