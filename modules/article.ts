export interface IAuthor {
    name?: string;
    imageUrl?: string;
}

export interface ICategory {
    id?: number;
    name?: string;
}

export interface IArticle {
    title?: string;
    subtitle?: string;
    authors?: IAuthor[],
    categories?: ICategory[],
    publishedAt?: string;
    imageUrl?: string;
    content?: string;
}

export const getArticle = (node: Element): IArticle => {
    const titleElement = node.querySelector('.article-header > h1');
    const subtitleElement = node.querySelector('.article-header > h2');
    const authors = node.querySelector('.author');
    const category = node.querySelector('.public_categories > span')
    const publishedAt = node.querySelector('.time-post');
    const articleImage = node.querySelector('.thumbnail img.wp-post-image');
    const content = node.querySelector('.article-content');

    let article: IArticle = {
        title: titleElement.innerHTML,
        subtitle: subtitleElement.innerHTML,
        authors: [{
            name: authors.querySelector('p').innerHTML,
            imageUrl: authors.querySelector('img').getAttribute('src')
        }],
        categories: [
            {
                id: parseInt(category.getAttribute('data-id')),
                name: category.textContent,                
            }
        ],
        publishedAt: publishedAt.innerHTML,
        imageUrl: articleImage.getAttribute('src'),
        content: content.innerHTML
    };
    
    return article;
}