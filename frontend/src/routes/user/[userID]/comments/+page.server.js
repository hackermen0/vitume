import { redirect, error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils'


export const load = ({locals, params}) => {

    if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

    const getUserComments = async() => {
        
        const userData = serializeNonPOJOs(await locals.pb.collection("users").getOne(params.userID, { '$autoCancel': false }))

        const userPrivacy = userData.privacy
        
        try {

            if (userPrivacy === false || locals.user.id === params.userID) {

                const comments = serializeNonPOJOs(await locals.pb.collection('comments').getFullList(50, {
                    filter : `user="${params.userID}"`,
                    expand : "post, user",
                    sort : "-created",
                }))

                        
                return {
                    userPrivacy : userPrivacy,
                    comments : comments
                }
            
            } else {
                return {
                    userPrivacy : userPrivacy
                }
            }
        
        } catch(err) {
            console.log(err)
            throw error(err.status, err.message)
        }
    }

    return {
        userComments : getUserComments()
    }

}