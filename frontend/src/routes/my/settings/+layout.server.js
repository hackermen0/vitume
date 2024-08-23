import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageServerLoad} */
export  const load = ({ locals }) => {

    if(!locals.pb.authStore.isValid) {
        throw redirect(303, "/login")
    }
} 


    
