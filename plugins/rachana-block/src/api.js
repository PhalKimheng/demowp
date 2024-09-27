import apiFetch from "@wordpress/api-fetch";
import {cleansePostContent, formatDate, genId} from "./blockHelpers";

const fetchData = async (res, resourceType, idField, formatter) => {
    const resourceIds = [...new Set(res.map((post) => post[idField]))];

    const resourceData = await Promise.all(
        resourceIds.map(async (id) => {
            const resource = await apiFetch({ path: `/wp/v2/${resourceType}/${id}` });
            return { [id]: formatter(resource) };
        })
    );

    return Object.assign({}, ...resourceData);
};
export const fetchCategoriesList = async (setAttributes = null) => {
    const categories = await apiFetch({ path: '/wp/v2/categories' });
    const categoriesList = categories.map(({ name, id, link }) => ({
        label: name,
        value: id,
        link,
    }));
    if (setAttributes) {
        setAttributes({ categories: categoriesList });
    }
    return categoriesList;
};

export const fetchPosts = async (postCount, categoryId = null, setAttributes = null) => {
    let path;
    if (categoryId) {
        path = `/wp/v2/posts?order=desc&orderby=date&per_page=${postCount}&categories=${categoryId}`;
    } else {
        path = `/wp/v2/posts?order=desc&orderby=date&per_page=${postCount}`;
    }
    const res = await apiFetch({ path });
    const authors = await fetchData(res, 'users', 'author', (author) => `${author.name} (${author.slug})`);
    const categories = await fetchData(res, 'categories', 'categories', (category) => category);
    const processedPosts = res
        .map((post) => {
            const { cleanContent, imageLink } = cleansePostContent(post.content.rendered);
            return {
                ...post,
                author: authors[post.author],
                categories: post.categories.map((id) => categories[id]),
                cleanContent,
                imageLink,
                date: formatDate(post.date),
                link: post.link,
                key: genId,
            };
        })
        .filter((post) => post.imageLink)
        .slice(0, postCount);
    if (setAttributes) {
        setAttributes({posts: processedPosts, id: genId})
    }
    else {
        return { posts: processedPosts, id: genId };
    }
};

export const categoryValue = (value, categoriesList) => {
    const intCategoryId = parseInt(value, 10);
    const selectedCategory = categoriesList.find(category => category.value === intCategoryId);
    return {
        link: selectedCategory.link,
        label: selectedCategory.label,
        intCategoryId
    };
};

export const fetchPostsTitle = async (categoryId, setAttributes = null) => {
    try {
        let res;
        if (categoryId) {
            res = await apiFetch({ path: `/wp/v2/posts?order=desc&orderby=date&per_page=10&categories=${categoryId}` });
        } else {
            res = await apiFetch({ path: '/wp/v2/posts' });
        }

        const fetchedPosts = res.map(post => ({
            label: post.title.rendered,
            value: post.id,
        }));

        if (setAttributes) {
            setAttributes({ posts: fetchedPosts });
        } else {
            return fetchedPosts;
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};


export const fetchPostDataById = async ( postId, setAttributes = null) => {
    const path = `/wp/v2/posts/${postId}`;
    try {
        const selectedPost = await apiFetch({ path });
        const authors = await fetchData([selectedPost], 'users', 'author', (author) => `${author.name} (${author.slug})`);
        const categories = await fetchData([selectedPost], 'categories', 'categories', (category) => category);

        const { cleanContent, imageLink } = cleansePostContent(selectedPost.content.rendered);
        const postData = {
            content: cleanContent,
            imageLink: imageLink,
            date: formatDate(selectedPost.date),
            href: selectedPost.link,
            title: selectedPost.title.rendered,
            author: authors[selectedPost.author],
            categories: selectedPost.categories.map((id) => categories[id]),
        };
        if (setAttributes) {
            setAttributes({
                title: postData.title,
                imageUrl: postData.imageLink,
                lastUpdated: postData.date,
                href: postData.href,
                content: postData.content,
                author: postData.author,
                categories: postData.categories,
                date: formatDate(postData.date),
            });
        }
        else {
            return postData;
        }
    } catch (error) {
        return null;
    }
};