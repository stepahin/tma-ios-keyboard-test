import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import '../App.css'

interface EmblaCarouselProps {
  slides: string[];
}

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({ slides }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' })

  return (
    <div className="embla" ref={emblaRef} style={{ height: '100%', width: '100%' }}>
      <div className="embla__container">
        {slides.map((slide, index) => (
          <div className="embla__slide" key={index}>
            <div className="embla__slide__wrapper">
              <img 
                src={slide} 
                alt={`Slide ${index + 1}`} 
                className="embla__slide__img" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmblaCarousel
