import { error, redirect, fail } from "@sveltejs/kit"
import { serializeNonPOJOs } from "$lib/utils"
import { validateData } from '$lib/utils';
import { updateProjectSchema } from '$lib/schemas';
import { serialize } from "object-to-formdata";

export const load = async ({ locals, params }) => {

    if (!locals.pb.authStore.isValid) {
        throw error(401, "Unauthorized")
    }


    try {
        const post =  serializeNonPOJOs(await locals.pb.collection("posts").getOne(params.postID))

        if (locals.user.id === post.user) {
            return post
        } else {
            throw error(403, "Forbidden")
        }

    } catch(err) {
        console.log("error: ", err)
        throw err(err.status, err.message)

    }
};

export const actions = {
    updatePost : async({ request, locals, params }) => {

		const body = await request.formData();

		const thumb = body.get('thumbnail');

		if (thumb.size === 0) {
			body.delete('thumbnail');
		}

		const { formData, errors } = await validateData(body, updateProjectSchema);
		// eslint-disable-next-line no-unused-vars
		const { thumbnail, ...rest } = formData;

		if (errors) {
			return fail(400, {
				data: rest,
				errors: errors.fieldErrors
			});
		}

        try {
            await locals.pb.collection('posts').update(params.postID, serialize(formData))
        } catch(err) {
            console.log("Error: ", err)
            throw error(err.status, err.message)
        }
        
        throw redirect(303, `/posts/${params.postID}`)
    },


    deleteThumbnail: async({ locals, params }) => {
        
        try {
            await locals.pb.collection('posts').update(params.postID, { thumbnail : null })
        } catch(err) {
            console.log("Error: ", err)
            return error(err.status, err.message)
        }

        return {
            success : true
        };
    }

}