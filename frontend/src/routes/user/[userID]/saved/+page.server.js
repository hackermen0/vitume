
import { redirect, error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils'

export const load = async ({locals, params}) => {


    if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

    if(params.userID != locals.user.id) {
        throw redirect(303, `/user/${params.userID}/profile`)
    }


    const getSavedPosts = async() => {


        try {


            const posts = serializeNonPOJOs(await locals.pb.collection('postSaves').getFullList(50, {
                filter : `user="${params.userID}"`,
                expand : "post, post.user"
            }))
    
    
            return posts
    



        } catch(err) {

            console.log(err)
            throw error(err.status, err.message)
        }
    }

    return {
        savedPosts : await getSavedPosts()
    }


}