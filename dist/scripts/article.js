export const getArticle = (node) => {
    const titleElement = node.querySelector('.article-header > h1');
    const subtitleElement = node.querySelector('.article-header > h2');
    const authors = node.querySelector('.author');
    const category = node.querySelector('.public_categories > span');
    const publishedAt = node.querySelector('.time-post');
    const articleImage = node.querySelector('.thumbnail img.wp-post-image');
    const content = node.querySelector('.article-content');
    let article = {
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
};
