import PocketBase from 'pocketbase'
import { serializeNonPOJOs } from '$lib/utils'

export const handle = async ({ event, resolve }) => {
    // http://127.0.0.1:8090/
    // https://social-media.pockethost.io/
    event.locals.pb = new PocketBase('https://social-media.pockethost.io/')
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "")

    try {
        if (event.locals.pb.authStore.isValid) {
            await event.locals.pb.collection('users').authRefresh()
            event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model)
        }
    } catch(_) {
        event.locals.authStore.clear()
        event.locals.user = undefined
    }

    const response = await resolve(event)

    response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie({
        secure : true
    }))

    return response
}