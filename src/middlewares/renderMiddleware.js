import { render } from 'https://unpkg.com/lit-html?module';

let rootElement = document.querySelector('.root');

const contextRender = templateResult => {
    render(templateResult, rootElement);
};

export function renderMiddleware(ctx, next) {
    ctx.render = contextRender;

    next();
}