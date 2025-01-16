"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";
import { genderImgsInfo } from "./utils";

const GenderImagesWrap = () => {
  const [activeImg, setActiveImg] = useState<number>(1);

  return (
    <>
      <section className={"flex gap-[4%]"}>
        {genderImgsInfo.map((genderItem) => {
          return (
            <Link
              style={{ transition: "0.2s" }}
              className={`
                            ${styles.banner__Wrap}
                            ${activeImg === genderItem.id ? styles.main : ""}
                        `}
              href={genderItem.location}
              onMouseEnter={() => setActiveImg(genderItem.id)}
              onMouseLeave={() => setActiveImg(1)}
              key={genderItem.id}
            >
              <img
                src={genderItem.imageUrl}
                alt={`${genderItem.title} hero illustration`}
                className={`${styles.banner__Image} mx-8`}
                // priority
              />

              <div className={styles.mask}>
                <p className={styles.banner__Text}>{genderItem.title}</p>
              </div>
            </Link>
          );
        })}
      </section>
    </>
  );
};

export default GenderImagesWrap;
