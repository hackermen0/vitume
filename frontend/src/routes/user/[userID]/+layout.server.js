import { serializeNonPOJOs } from '$lib/utils'
import { error, redirect } from "@sveltejs/kit"



export const load = async ({ locals, params, event }) => {

    if (!locals.pb.authStore.isValid) {
        console.log(event)
		throw redirect(303, '/login');
	}


    const getUser = async() => {


        try {

            const user = serializeNonPOJOs(await locals.pb.collection("users").getOne(params.userID))

            return user
     
        } catch(err) {
            console.log("Error: ", err)
            throw error(err.status, err.message)
        }
    }

    const followStatus = async() => {

        
            const followData = serializeNonPOJOs(await locals.pb.collection('follows').getFullList(200, {
                filter : `user="${locals.user.id}" && following="${params.userID}"`
            }))

            if (followData.length === 0) {
                const requestData = serializeNonPOJOs(await locals.pb.collection('followRequests').getFullList(200, {
                    filter : `user="${locals.user.id}" && requestee="${params.userID}"`
                }))

                if (requestData.length === 0) {

                    return {
                        value : null
                    }

                } else {
            
                    return {
                        value : "requested",
                        data : requestData
                    }

                }

            } else {

                return {
                    value : "following",
                    data : followData
                }
            }
    }

    return {
        user : await getUser(),
        userID : locals.user.id,
        followStatus : await followStatus()
    }
}


