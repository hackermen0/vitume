import { redirect, error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils'

export const load = ({locals, params}) => {

    
    if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

    const getUserPosts = async() => {

        const userData = serializeNonPOJOs(await locals.pb.collection("users").getOne(params.userID, { '$autoCancel': false }))

        const followingData = serializeNonPOJOs(await locals.pb.collection("follows").getFullList(1, {
            filter : `user="${locals.user.id}" && following="${params.userID}"`,
            '$autoCancel': false
        }))

        let followingStatus = false

        if (followingData.length > 0) {
            followingStatus = true
        } else {
            followingStatus = false
        }

        console.log(followingData, followingData.length)
        console.log(followingStatus)

        const userPrivacy = userData.privacy

        try {

            if (userPrivacy === false || locals.user.id === params.userID || followingStatus === true) {

                const posts = serializeNonPOJOs(await locals.pb.collection("posts").getFullList(200, {
                    filter: `user="${params.userID}"`,
                    expand: 'user',
                    sort : '-created',
                    
                })) 
    
            
                return {
                    userPrivacy : userPrivacy,
                    posts : posts,
                    followingStatus : followingStatus,
                }
            } else {
                return {
                    userPrivacy : userPrivacy,
                    followingStatus : followingStatus,
                }
            }

        } catch(err) {
            console.log(err)
            throw error(err.status, err.message)
        }
    }


    return {
        userPosts : getUserPosts()
    }

    
}