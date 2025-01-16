import apiBaseUrl from "./config"
import { makeAxiosGetRequest, makeGetRequest } from "./functions";

class BlogService {
    private getBlogEndpoint(endpoint: string) {
        return `${apiBaseUrl}/content/blogs/${endpoint.length < 1 ? '' : endpoint + '/'}`;
    }

    async getAllBlogs () {
        try {
            const fetchedBlogs = await makeGetRequest(`${this.getBlogEndpoint('')}`);
            return fetchedBlogs;
        } catch (error) {
            throw error;
        }
    }

    async getSingleBlog (blogStr: string): Promise<IBlog> {
        try {
            const blogRes = await makeAxiosGetRequest(`${this.getBlogEndpoint(blogStr)}`)
            return blogRes as IBlog;
        } catch (error) {
            throw error;
        }
    }
}

export {
    BlogService,
}