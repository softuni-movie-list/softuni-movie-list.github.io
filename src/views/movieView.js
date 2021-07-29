import { html } from 'https://unpkg.com/lit-html?module';

import * as movieService from '../services/movieService.js';
import { showNotification } from '../services/notificationService.js';

const ITEMS_PER_PAGE = 2;

const movieCardTemplate = ({
    _id,
    title,
    img,
}) => html`
    <li class="movie-list-item" style="width: 18rem;">
        <img src="${img}" class="card-img-top" alt="${title}">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <a href="/movies/${_id}" class="btn btn-primary">Details</a>
        </div>
    </li>
`;

const moviesTemplate = (movies, pages, currentPage = 1) => html`
    <h3>Movie Page</h3>
    
    <section class="movies-wrapper">
        <ul class="movie-list">
            ${movies.slice((ITEMS_PER_PAGE * currentPage - 1) - 1, (ITEMS_PER_PAGE * currentPage - 1) + ITEMS_PER_PAGE - 1).map(x => movieCardTemplate(x))}
        </ul>
    
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    
                ${pages.map(x => html`
                    <li class="page-item"><a class="page-link" href="${x.url}">${x.page}</a></li>
                `)}
    
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
        </nav>
    </section>
`;

export function moviePage(ctx) {
    let moviesPromise = null;

    if (ctx.qs.search) {
        moviesPromise = movieService.search(ctx.qs.search);
    } else {
        moviesPromise = movieService.getAll();
    }
   
    moviesPromise
        .then(movies => {
            // showNotification(' You movies are loaded');
            ctx.render(moviesTemplate(movies, generatePaging(movies), ctx.qs.page));
        });
}

function generatePaging(movies) {
    
    let pages = [];
    let currentPage = 0;

    for (let i = 0; i < movies.length; i+=ITEMS_PER_PAGE) {
        currentPage++;

        pages.push({
            url: `/movies?page=${currentPage}`,
            page: currentPage,
        });
    }

    return pages;
}

export function myMoviesPage(ctx) {
    movieService.getMyMovies(ctx.userId)
        .then(movies => {
            ctx.render(moviesTemplate(movies));
        });
}