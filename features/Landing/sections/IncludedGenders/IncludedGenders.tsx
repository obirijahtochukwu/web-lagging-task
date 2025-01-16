import React from "react";
import styles from "./styles.module.css";
import GenderImagesWrap from "../../components/GenderImagesWrap/GenderImagesWrap";
import FadeInOnScroll from "@/components/wrapperComponents/FadeInOnScroll/FadeInOnScroll";

const IncludedGenders = () => {
  return (
    <>
      <section className={styles.content__Wrap}>
        <>
          <h2 className={styles.header}>
            <span>Martial arts for men, women, and kids</span>
            <span className={styles.sub__Header}>
              where strength, confidence, and growth begin!
            </span>
          </h2>
        </>

        <>
          <GenderImagesWrap />
        </>
      </section>
    </>
  );
};

export default IncludedGenders;
