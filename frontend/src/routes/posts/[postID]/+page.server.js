import { serializeNonPOJOs } from '$lib/utils'
import { error, fail, redirect } from "@sveltejs/kit"
import { commentSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';


export const load = async ({ locals, params }) => {

    if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}


    const getPost = async(postID) => {

        try {
            
        const posts = serializeNonPOJOs(await locals.pb.collection('posts').getOne(postID, {
            expand : "user"
        }))

        return posts


        } catch(err) {
            console.log("Error: ", err)
            throw error(err.status, err.message)
        }
    }

    const getComments = async(postID) => {

        try {

            const comments = serializeNonPOJOs(await locals.pb.collection('comments').getList(1, 50, {
                filter : `post = "${postID}"`,
                sort : '-created',
                expand : "user",
            }))
    
            return comments

        } catch(err) {
            console.log("Error: ", err)
            throw error(err.status, err.message)
        }
        

    }

    const getPostLikes = async(postID) => {

        try {
            let like = serializeNonPOJOs(await locals.pb.collection('postLikes').getFullList(200, {
                filter: `user="${locals.user.id}" && post="${postID}"`
            }))

            return like[0]

        } catch(err) {
            console.log("Error: ", error)
            throw error(err.status, err.message)
        }
    }

    const getPostSaved = async(postID) => {

        try {
            let save = serializeNonPOJOs(await locals.pb.collection('postSaves').getFullList(200, {
                filter: `user="${locals.user.id}" && post="${postID}"`
            }))

            return save[0]

        } catch(err) {
            console.log("Error: ", error)
            throw error(err.status, err.message)
        }
    }

    const getCommentLikes = async(postID) => {

        try {

            let like = serializeNonPOJOs(await locals.pb.collection('commentLikes').getFullList(200, {
                filter: `user="${locals.user.id}" && post="${postID}"`
            }))

            return like

        } catch(err) {
            console.log("Error: ", error)
            throw error(err.status, err.message)
        }
    }

    
    return {
        post: await getPost(params.postID),
        comments: await getComments(params.postID),
        postLike: await getPostLikes(params.postID),
        postSave : await getPostSaved(params.postID),
        commentLikes: await getCommentLikes(params.postID)
  
    }


}

export const actions = {
    createComment: async({ request, locals, params }) => {

        
        const { formData, errors } = await validateData(await request.formData(), commentSchema);

        if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}
        const userID = locals.user.id
        const postID = params.postID

        try {
            
            await locals.pb.collection('comments').create({
                text: formData.comment,
                user: userID,
                post: postID
            });

        } catch(err) {
            console.log("Error: ",err)
            throw error(err.status, err.message)
        }
    },

    postLike : async({ request, locals, params }) => {
        const body = Object.fromEntries(await request.formData())

        if (body.likeValue === "true") {
            await locals.pb.collection('postLikes').create({
                post : params.postID,
                user : locals.user.id
            })
        }

        else if (body.likeValue === "false") {

            const result = serializeNonPOJOs(await locals.pb.collection('postLikes').getFullList(50, {
                filter: `user="${locals.user.id}" && post="${params.postID}"`
            }))


            await locals.pb.collection("postLikes").delete(result[0].id)
        } 

    },

    postSave : async({ request, locals, params }) => {
        const body = Object.fromEntries(await request.formData())

        console.log(body)

        if (body.saveValue === "true") {
            console.log(locals.user.id)
            await locals.pb.collection('postSaves').create({
                post : params.postID,
                user : locals.user.id
            })
        }

        if (body.saveValue === "false") {

            let result = serializeNonPOJOs(await locals.pb.collection('postSaves').getFullList(50, {
                filter: `user="${locals.user.id}" && post="${params.postID}"`
            }))

            
            await locals.pb.collection("postSaves").delete(result[0].id)
        } 

    },


    commentLike : async({ request, locals, params }) => {

        const body = Object.fromEntries(await request.formData())

        if (body.clickedValue === "true") {
            await locals.pb.collection('commentLikes').create({
                post : params.postID,
                user : locals.user.id,
                comment : body.commentID
            })
        }

        if (body.clickedValue === "false") {

            let result = await locals.pb.collection('commentLikes').getFullList(200, {
                filter: `user="${locals.user.id}" && post="${params.postID}" && comment="${body.commentID}"`
            })
            
            await locals.pb.collection("commentLikes").delete(result[0].id)
        } 

    }
}