import { serializeNonPOJOs } from '$lib/utils'
import { error, redirect } from "@sveltejs/kit"


export const load = ({ locals }) => {

    if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

    const getPosts = async() => {

        try {
            
        const posts = serializeNonPOJOs(await locals.pb.collection('posts').getList(1, 20, {
                sort: '-created',
                expand: 'user',
                // filter: 'user.privacy = false',
              }));

        // const posts = serializeNonPOJOs(await locals.pb.collection('posts').getFullList(undefined, {
        //     expand: 'user',
        // }))

    
        console.log(posts)
        return posts


        } catch(err) {
            console.log("Error: ", err)
            throw error(err.status, err.message)
        }
    }


    return {
        posts: getPosts()
    }

}