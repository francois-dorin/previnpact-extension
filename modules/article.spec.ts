import * as fs from "fs";
import { getArticle } from "./article.js";
import * as exp from "constants";

const fileContent = fs.readFileSync('scripts/article.spec.data');

describe('article information', () => {
    let container: Element;

    beforeEach(() => {
        container = document.createElement("div");
        container.innerHTML = fileContent.toString();
    })

    it('should get title', () => {
        const article = getArticle(container);
        expect(article.title).toBe('Next.ink : venez tester notre nouveau site en bêta !');
    })

    it('should get subtitle', () => {
        const article = getArticle(container);
        expect(article.subtitle).toBe('Avec déjà de gros changements… ');
    })

    it('should get author name', () => {
        const article = getArticle(container);
        expect(article.authors[0].name).toBe('Sébastien Gavois');
    })

    it('should get author image', () => {
        const article = getArticle(container);
        expect(article.authors[0].imageUrl).toBe('https://cdn.next.ink/inpactv7/data-next/images/auteurs/seb.jpg');
    })

    it('should get categorie name', () => {
        const article = getArticle(container);
        expect(article.categories[0].name).toBe('Next');
    })

    it('should get categorie id', () => {
        const article = getArticle(container);
        expect(article.categories[0].id).toBe(13);
    })

    it('should get publicationTime', () => {
        const article = getArticle(container);
        expect(article.publishedAt).toBe('il y a 1 semaine');
    })

    it('should get article imageUrl', () => {
        const article = getArticle(container);
        expect(article.imageUrl).toBe('https://cdn.next.ink/inpactv7/data-next/images/bd/wide-linked-media/12894.jpg');
    })

    it('should get article content', () => {
        const article = getArticle(container);
        expect(article.content).toContain('Autant la ligne éditoriale et l’équipe ne changent pas');        
    })
})