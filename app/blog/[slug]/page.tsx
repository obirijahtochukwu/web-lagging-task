import Footer from '@/layouts/Footer/Footer';
import { BlogService } from '@/services/blogService';
import React from 'react'
import SingleBlogDetails from './details';

export async function generateMetadata(props: { params: PageParams }) {
    const { slug } = await props.params;
    if (!slug) return {
        title: "Untitled Blog",
    };

    const blogService = new BlogService();

    try {
        const res = await blogService.getSingleBlog(slug);
        return {
            title: `${res?.title} | Blogs`,
        }
    } catch (error) {
        return {
            title: "Untitled Blog",
        };
    }
}

const BlogDetail = async (props: { params: PageParams }) => {
    const { slug } = await props.params;
    
    return <>
        <SingleBlogDetails 
            slug={slug ?? ''}
        />

        <Footer />
    </>
}

export default BlogDetail