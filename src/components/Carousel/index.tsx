'use client'
import React from 'react'
import Image from 'next/image'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { CarouselWrapper } from './styles'

const Carousel = () => {
    return (
        <CarouselWrapper>
            <Swiper pagination={true} navigation={true} modules={[Pagination, Navigation]} className="mySwiper">
                <SwiperSlide>
                    <Image src="/carousels/introducing-chatgpt-and-whisper-apis.webp" width={2000} height={2000} alt="" />
                </SwiperSlide>
            </Swiper>
        </CarouselWrapper>
    )
}

export default Carousel
