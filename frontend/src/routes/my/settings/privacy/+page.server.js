// import { serializeNonPOJOs } from '$lib/utils'
import { error } from "@sveltejs/kit";



export const load = async ({ cookies, locals }) => {

    let privacyValue = cookies.get('privacy')
    console.log(privacyValue)

    if (privacyValue === undefined) {
        const userData = await locals.pb.collection('users').getOne(locals?.user?.id)
        cookies.set('privacy', userData.privacy)
        privacyValue = cookies.get('privacy')
    }

    await locals.pb.collection('users').update(locals.user.id, {privacy : privacyValue})

    return {
        privacyValue
    }
    
}


export const actions = {

    privacy : async({ cookies, request}) => {

        try {

 
            const body = Object.fromEntries(await request.formData())
        
            if (body.privacyValue === "on") {
                
                cookies.set('privacy', true)

            } else {

                cookies.set('privacy', false)

            }
    

        } catch(err) {
            console.log(err)
            throw error(err.status, err.message)
        }
 
    }

}