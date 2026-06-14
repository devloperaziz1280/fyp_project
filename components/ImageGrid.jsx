import { normalizeImages } from '@/utils/helper'

const ImageGrid = ({ first, second, third, forth, fifth }) => {
  const [primary, ...rest] = normalizeImages([first, second, third, forth, fifth])

  if (!primary) {
    return (
      <div className="mt-8 flex h-[32rem] items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
        No images available
      </div>
    )
  }

  const [secondImage, thirdImage, forthImage, fifthImage] = rest

  return (
    <div className="mt-8 h-[32rem] flex rounded-2xl overflow-hidden">
      <div className="md:w-1/2 w-full overflow-hidden">
        <img className="object-cover w-full h-full" src={primary} alt="Property main" />
      </div>
      <div className="w-1/2 md:flex hidden flex-wrap">
        {secondImage && (
          <img src={secondImage} className="object-cover w-1/2 h-64 pl-2 pb-1 pr-1" alt="Property 2" />
        )}
        {thirdImage && (
          <img src={thirdImage} alt="Property 3" className="object-cover w-1/2 h-64 pl-1 pb-1" />
        )}
        {forthImage && (
          <img src={forthImage} className="object-cover w-1/2 h-64 pt-1 pl-2 pr-1" alt="Property 4" />
        )}
        {fifthImage && (
          <img src={fifthImage} className="object-cover sm:w-2/5 md:w-1/2 h-64 pl-1 pt-1" alt="Property 5" />
        )}
      </div>
    </div>
  )
}

export default ImageGrid
