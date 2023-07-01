import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper";
import KeyboardImage from "../../assets/keyboard.jpg";
import MouseImage from "../../assets/mouse.jpg";
import LaptopImage from "../../assets/laptop.jpg";
import MousePadImage from "../../assets/mouse-pad.jpg";
import HeadphonesImage from "../../assets/headphones.jpg";
import "swiper/scss";
import "swiper/scss/effect-fade";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import styles from "./styles.module.scss";

const HorizontalScrollBar = () => {
  return (
    <section>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className={styles.swiper}
      >
        <SwiperSlide className={styles.swiperSlide}>
          <img src={KeyboardImage} alt="" />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <img src={MouseImage} alt="" />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <img src={LaptopImage} alt="" />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <img src={MousePadImage} alt="" />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <img src={HeadphonesImage} alt="" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default HorizontalScrollBar;
