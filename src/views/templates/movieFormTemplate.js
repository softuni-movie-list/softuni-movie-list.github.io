import { html } from 'https://unpkg.com/lit-html?module';
import {ifDefined} from 'https://unpkg.com/lit-html/directives/if-defined.js?module';

export const movieFormTemplate = (onSubmit, movie) => html`
<h3>Add movie</h3>

<form @submit=${onSubmit}>
    <div class="mb-3">
        <label for="movie-title" class="form-label">Title</label>
        <input type="text" class="form-control" name="title" id="movie-title" value=${ifDefined(movie?.title)}>
    </div>

    <div class="mb-3">
        <label for="movie-image-url" class="form-label">Image Url</label>
        <input type="text" class="form-control" name="imageUrl" id="movie-image-url" value=${ifDefined(movie?.img)}>
    </div>

    <div class="mb-3">
        <label for="movie-description" class="form-label">Description</label>
        <textarea class="form-control" id="movie-description" name="description" rows="3" >${movie?.description}</textarea>
    </div>

    <div class="mb-3">
        <input class="form-controll" type="submit" value="${movie?.title ? 'Update' : 'Create' }"/>
    </div>
</form>
`;