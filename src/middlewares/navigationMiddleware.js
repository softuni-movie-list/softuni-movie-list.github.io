import { render } from 'https://unpkg.com/lit-html?module';

import { renderNavigation } from '../views/navigationView.js';

let navigationElement = document.querySelector('.navigation');

export function navigationMiddleware(ctx, next) {
    render(renderNavigation(ctx), navigationElement);

    next();
}