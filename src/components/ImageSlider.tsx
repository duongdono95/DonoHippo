'use client';
import { Box, Fade, IconButton, Zoom } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type SwiperType from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
interface Props {
  urls: string[];
  size?: number;
}

const ImageSlider = ({ urls, size }: Props) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (urls.length ?? 0) - 1,
  });
  const [isHover, setIsHover] = useState(false);
  useEffect(() => {
    swiper?.on('slideChange', ({ activeIndex }) => {
      setActiveIndex(activeIndex);
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (urls.length ?? 0) - 1,
      });
    });
  }, [swiper, urls]);
  return (
    <Box
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      sx={{ position: 'relative', display: 'flex', justifyContent: 'center', width: size ? `${size}px` : '250px' }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          zIndex: 2,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            swiper?.slidePrev();
          }}
        >
          {!slideConfig.isBeginning && isHover && (
            <Fade timeout={500} in={isHover}>
              <Box
                sx={{
                  width: '30px',
                  height: '30px',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  border: '2px solid var(--white07)',
                }}
              >
                <ChevronLeft color="white" />
              </Box>
            </Fade>
          )}
        </IconButton>
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            swiper?.slideNext();
          }}
        >
          {!slideConfig.isEnd && isHover && (
            <Fade timeout={500} in={isHover}>
              <Box
                sx={{
                  width: '30px',
                  height: '30px',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  border: '2px solid var(--white07)',
                }}
              >
                <ChevronRight color="white" />
              </Box>
            </Fade>
          )}
        </IconButton>
      </Box>
      <Swiper
        onSwiper={(swiper) => setSwiper(swiper)}
        // spaceBetween={'50px'}
        slidesPerView={1}
        modules={[Pagination]}
      >
        {urls.map((url, i) => (
          <SwiperSlide key={i}>
            <Box
              sx={{
                width: size ? `${size}px` : '250px',
                height: size ? `${size}px` : '250px',
                position: 'relative',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <Image fill loading="eager" src={url} alt="Product Image" />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ImageSlider;
