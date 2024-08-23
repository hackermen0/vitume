import { error, redirect } from "@sveltejs/kit";
import { serializeNonPOJOs } from '$lib/utils'


export const actions = {

    default : async({locals, params, request}) => {

        if (params.userID === locals.user.id) {
            throw redirect(301, `/user/${params.userID}/profile`)
        } else {

            const body = Object.fromEntries(await request.formData())

            const user = await locals.pb.collection('users').getOne(params.userID, { '$autoCancel': false })

            const followValue = JSON.parse(body.followValue)

            console.log(followValue)
        
            try {
    
                if (followValue) {

                    if (user.privacy === false) {

                        console.log(`${params.userID} followed`)
        
                        locals.pb.collection("follows").create({
                            user : locals.user.id,
                            following : params.userID
                        })

                    } else if (user.privacy === true) {

                        console.log(`${params.userID} requested to follow`)

                        locals.pb.collection("followRequests").create({
                            user : locals.user.id,
                            requestee : params.userID
                        })
                    }
    
                }
    
                else if (!followValue) {

                    if (user.privacy === false) {

                        console.log(`${params.userID} unfollowed`)
        
                        const result = serializeNonPOJOs(await locals.pb.collection('follows').getFullList(50, {
                            filter: `user="${locals.user.id}" && following="${params.userID}"`
                        }))
        
                        await locals.pb.collection("follows").delete(result[0].id)

                    } else if (user.privacy === true) {
             
                        console.log(`${params.userID} request removed`)
        
                        const result = serializeNonPOJOs(await locals.pb.collection('followRequests').getFullList(50, {
                            filter: `user="${locals.user.id}" && requestee="${params.userID}"`
                        }))
        
                        await locals.pb.collection("followRequests").delete(result[0].id)
                    }
    
                }
               
            } catch(err) {
                console.log(err)
                throw error(err.status, err.message)
            }
        }     
    }
}