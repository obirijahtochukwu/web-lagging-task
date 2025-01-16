import React from "react";
import styles from "./styles.module.css";
import FadeInOnScroll from "@/components/wrapperComponents/FadeInOnScroll/FadeInOnScroll";

const HeroimgsWrap = () => {
  return (
    <>
      <FadeInOnScroll width="100%" viewThreshold={0.1}>
        <section className={styles.content__Wrap}>
          <img
            className={`${styles.img__Content} ${styles.i_1}`}
            alt="hero"
            src={"../../../../assets/heros/boxing.webp"}
            width={0}
            height={0}
          />

          <img
            className={`${styles.img__Content} ${styles.i_2}`}
            alt="hero"
            src={"../../../../assets/heros/Muay-Thai.webp"}
            width={0}
            height={0}
          />

          <img
            className={`${styles.img__Content} ${styles.i_main}`}
            alt="hero"
            src={"../../../../assets/heros/karate.webp"}
            width={0}
            height={0}
          />

          <img
            className={`${styles.img__Content} ${styles.i_3}`}
            alt="hero"
            src={"../../../../assets/heros/Wrestling.webp"}
            width={0}
            height={0}
          />

          <img
            className={`${styles.img__Content} ${styles.i_4}`}
            alt="hero"
            src={"../../../../assets/heros/sambo.webp"}
            width={0}
            height={0}
          />
        </section>
      </FadeInOnScroll>
    </>
  );
};

export default HeroimgsWrap;
