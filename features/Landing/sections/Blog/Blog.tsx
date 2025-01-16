'use client';

import React from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import Image from 'next/image'
import FadeInOnScroll from '@/components/wrapperComponents/FadeInOnScroll/FadeInOnScroll'
import { useAppContext } from '@/contexts/AppContext/AppContext';
import sampleImage1 from '../../../../assets/blogSamples/blog-1.webp';
import PageLoader from '@/components/loaders/PageLoader/PageLoader';
import { estimateReadingTime } from '@/helpers/helpers';


const maxArticleTitleLength = 40;

const Blog = () => {
    const { blogs, blogsLoading } = useAppContext();
    return <>
        <section className={styles.content__Wrap}>
            <FadeInOnScroll>
                <section className={styles.header__Row}>
                    <h2 className={styles.header}>Stories from our blog</h2>

                    {/* <Button 
                        label='read more'
                        useLink={true}
                        linkLocation={'/blog'}
                        style={{
                            border: '1px solid #000',
                            backgroundColor: 'transparent',
                            color: '#000'
                        }}
                    /> */}
                </section>
            </FadeInOnScroll>

            <FadeInOnScroll>
                {
                    blogsLoading ? <>
                        <PageLoader />
                    </>
                    :
                    <section className={styles.blog__Wrap}>
                        {
                            blogs.length < 1 ?
                                <p style={{ fontSize: '0.875rem' }}>No blogs yet</p>
                            :
                            React.Children.toArray(blogs.map(blog => {
                                return <Link
                                    href={`/blog/${blog.slug}`}
                                    className={styles.blog__Article}
                                    key={blog.id}
                                >
                                    <Image 
                                        alt={blog.title}
                                        src={sampleImage1}
                                        className={styles.article__Img}
                                        // priority
                                    />

                                    <div className={styles.mask}>
                                        <h3 className={`${styles.header} ${styles.article__Title}`}>
                                            {
                                                blog.title.length > maxArticleTitleLength ?
                                                    blog.title.slice(0, maxArticleTitleLength) + '...'
                                                :
                                                blog.title
                                            }
                                        </h3>

                                        <div className={styles.article__Footer}>
                                            {/* <p>{new Date(blog.created_at).toString().split(' ').slice(0, 4).join(' ')}</p>
                                            <p>.</p> */}
                                            <p>{estimateReadingTime(blog.content.length)} minute read</p>
                                        </div>
                                    </div>
                                </Link>
                            }))
                        }
                    </section>
                }
            </FadeInOnScroll>
        </section>
    </>
}

export default Blog