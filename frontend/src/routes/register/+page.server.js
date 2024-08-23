
import { error, fail, redirect } from '@sveltejs/kit';
import { registerUserSchema } from '$lib/schemas';
import { generateUsername, validateData } from '$lib/utils';


export const actions = {
	register: async ({ locals, request }) => {

		const body = await request.formData()

		console.log(body)

		const { formData, errors } = await validateData(body, registerUserSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		let username = generateUsername(formData.name.split(' ').join('')).toLowerCase();
		const emailVisibility = false

		try {
		
			await locals.pb.collection('users').create({ username, emailVisibility, ...formData });
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, '/login');
	}
};