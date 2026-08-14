import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper'
import { isIpfsUrl, normalizeImages } from '@/utils/helper'

const ImageSlider = ({ images }) => {
  const slides = normalizeImages(images)

  if (slides.length === 0) {
    return (
      <div className="flex h-52 w-96 items-center justify-center rounded-t-2xl bg-gray-100 text-sm text-gray-500">
        No images available
      </div>
    )
  }

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={false}
      modules={[Autoplay, Pagination, Navigation]}
      className="w-96 h-52 rounded-t-2xl overflow-hidden"
    >
      {slides.map((url, i) => (
        <SwiperSlide key={i}>
          <SlideImage src={url} alt={'image slide ' + i} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

const SlideImage = ({ src, alt }) => {
  if (isIpfsUrl(src)) {
    return (
      <div className="relative h-full w-full">
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      </div>
    )
  }

  return (
    <div className="relative h-full w-full">
      <Image src={src} alt={alt} fill style={{ objectFit: 'cover' }} sizes="384px" />
    </div>
  )
}

export default ImageSlider
