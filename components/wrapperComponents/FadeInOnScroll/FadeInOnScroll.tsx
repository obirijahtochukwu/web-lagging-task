// 'use client';

import React, { ReactNode } from "react";
import styles from "./styles.module.css";
// import { useInView } from 'react-intersection-observer'

const FadeInOnScroll = ({
  children,
  width,
  viewThreshold = 0.65,
  className = "",
}: {
  children: ReactNode;
  width?: string;
  viewThreshold?: number;
  className?: string;
}) => {
  // const { ref, inView } = useInView({
  //     threshold: viewThreshold,
  //     triggerOnce: true,
  // });

  // FOR THE CLASS PART
  // ${inView ? styles.in__View : ''}

  return (
    <div
      // ref={ref}
      className={`
                ${styles.section__Wrap} 
                ${className}
            `}
      style={{
        width,
      }}
    >
      {children}
    </div>
  );
};

export default FadeInOnScroll;
