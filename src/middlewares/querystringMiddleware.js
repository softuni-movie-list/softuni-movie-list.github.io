export function querystringMiddleware(ctx, next) {
    let qs = {};

    if (ctx.querystring) {
        qs = ctx.querystring
            .split('&')
            .map(x => x.split('='))
            .reduce((a, [key, value]) => {
                a[key] = value;

                return a;
            }, {});
    }

    ctx.qs = qs;

    next();
}