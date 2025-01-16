"use server";

import React from "react";
import styles from "./styles.module.css";
import HeroImagesWrap from "../../components/HeroImagesWrap/HeroImagesWrap";
import CategorySearchBar from "../../../../components/CategorySearchBar/CategorySearchBar";
import Image from "next/image";
// import HeroBannerSubtitle from '../../components/HeroBannerSubtitle/HeroBannerSubtitle';

const HeroBanner = () => {
  return (
    <section className={styles.hero__Wrap}>
      <section className={styles.hero__Content__Wrap}>
        <section className={styles.header__Content}>
          <h1 className={styles.header}>
            Discover & Book martial arts classes near you!
          </h1>

          {/* <HeroBannerSubtitle /> */}
        </section>

        <CategorySearchBar />

        <img
          className={`${styles.img__Content} ${styles.i_1}`}
          alt="hero"
          src={"./assets/heros/taekwondo.webp"}
          width={0}
          height={0}
        />

        <img
          className={`${styles.img__Content} ${styles.i_2}`}
          alt="hero"
          src={"./assets/heros/judo.webp"}
          width={0}
          height={0}
        />
      </section>

      <HeroImagesWrap />
    </section>
  );
};

export default HeroBanner;
