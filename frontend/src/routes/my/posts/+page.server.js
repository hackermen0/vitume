import { error, redirect } from "@sveltejs/kit"
import { serializeNonPOJOs, handleLoginRedirect} from "$lib/utils"

export const load = async ({ url , locals }) => {
    
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, handleLoginRedirect(url))
    }

    const getUsersProjects = async(userID) => {
        
        try {
            const posts = serializeNonPOJOs(await locals.pb.collection('posts').getFullList(undefined, {
                filter : `user = "${userID}"`
            }))
            return posts;
        } catch(err) {
            console.log("error", err)
            throw error(err.status, err.message)
        }
    }

    return {
        posts: await getUsersProjects(locals.user.id)
    }

}

export const actions = {
    deletePost: async ({ request, locals }) => {
        const { id } = Object.fromEntries(await request.formData())

        try {
            await locals.pb.collection("posts").delete(id)
        } catch (err) {
            console.log("error:", err)
            throw error(err.status, err.message)
        }

        return {
            success : true
        }

    }
};