import { error, fail, redirect } from '@sveltejs/kit';
import { serialize } from 'object-to-formdata';
import { createPostschema } from '$lib/schemas';
import { validateData } from '$lib/utils';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions = {
	create: async ({ request, locals }) => {
		const body = await request.formData();

		const thumb = body.get('thumbnail');

		const mediaObject = body.get("media")

		if (thumb.size === 0) {
			body.delete('thumbnail');
		}

		if (mediaObject.size === 0) {
			body.delete('media');
		}
		body.append('user', locals.user.id);

		const { formData, errors } = await validateData(body, createPostschema);
		// eslint-disable-next-line no-unused-vars
		const { thumbnail, media,  ...rest } = formData;

		if (errors) {
			return fail(400, {
				data: rest,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('posts').create(serialize(formData));
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, '/my/posts');
	}
};