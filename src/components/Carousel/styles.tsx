import tw, { styled, css, theme } from 'twin.macro'

const CarouselWrapper = styled.div(() => [
  tw`h-full w-full`,
  css`
    .swiper {
        ${tw`w-full h-full`}
      }
      
      .swiper-slide {
        ${tw`text-center text-[18px] bg-white flex items-center justify-center `}
      }
      
      .swiper-slide img {
        ${tw`block w-full h-full object-cover object-left`}
      }
    `
])

export { CarouselWrapper }