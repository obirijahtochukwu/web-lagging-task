import React from 'react'
import styles from './styles.module.css'
import SingleResultViewOption from './SingleResultViewOption';

const ResultsViewOption = ({
  options=[],
}: {
  options: {
    id: number;
    children: React.ReactNode;
  }[];
}) => {
  return <>
    <section className={styles.listing__View}>
      {
        React.Children.toArray(options.map(action => {
          return <SingleResultViewOption
            key={action.id}
            children={action.children}
          />
        }))
      }
    </section>
  </>
}

export default ResultsViewOption