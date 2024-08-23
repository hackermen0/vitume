import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils'

export const load = ({ locals }) => {

    if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}


    const getFollowRequests = async() => {

        try {

            const requests = serializeNonPOJOs(await locals.pb.collection("followRequests").getFullList(200, {
                filter : `requestee="${locals.user.id}"`,
                expand : `user`,
                sort : '-created'
            }))

            return {
                requests
            }
    
        } catch(err) {
            console.log(err)
            throw error(err.status, err.message)
        }

    }

    return {
        followRequests : getFollowRequests()
    }
}


export const actions = {

    accept : async({ locals, request }) => {

        const body = Object.fromEntries(await request.formData())

        const data = await locals.pb.collection("followRequests").getOne(body.followRequestID)

        const followRequestorUserID = data.user
    
        await locals.pb.collection('followRequests').delete(body.followRequestID)
            
        await locals.pb.collection("follows").create({
                "user" : followRequestorUserID,
                "following" : locals.user.id
        })
    },

    reject : async({ locals, request }) => {

        const body = Object.fromEntries(await request.formData())

        await locals.pb.collection('followRequests').delete(body.followRequestID)

    }
}