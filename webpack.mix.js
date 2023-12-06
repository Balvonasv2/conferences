const mix = require('laravel-mix');

mix.js('resources/assets/js/app.js', 'public/js')
    .react()
    .sass('resources/assets/sass/app.scss', 'public/css')
    .sourceMaps();

if (mix.inProduction()) {
    mix.version();
}
