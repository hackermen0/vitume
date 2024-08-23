<script>
    /** @type {import('./$types').PageData} */

    export let data
    export let form;

    import {Input} from '$lib/components';
    import { invalidateAll } from "$app/navigation"
    import {enhance, applyAction} from "$app/forms"

    let loading;
    
    $: loading = false

    const submitUpdateEmail = () => {

        return async({ result }) => {
            switch(result.type) {
                case "success":
                    await invalidateAll()
                    break
                
                case "error":
                    break

                default:
                    await applyAction(result)
            }
        }
    }

    const submitUpdateUsername = () => {

        return async({ result }) => {
            switch(result.type) {
                case "success":
                    await invalidateAll()
                    break
                
                case "error":
                    break

                default:
                    await applyAction(result)
            }
        }
    }
</script>


<div class="flex flex-col w-full mb-20">
    <form action="?/updateEmail" method="POST" class="flex flex-col space-y-2 w-full" enctype="multipart/form-data" use:enhance={submitUpdateEmail}>
        <h3 class="text-2xl font-medium">Change Email</h3>
        <div class="divider"></div>
        <Input id="email" placeholder = "Enter new email" label = "Email" errors={form?.errors?.email} value={data?.user?.email} required={true} disabled={loading}/>
        <button class="btn btn-primary w-full max-w-lg" type="submit" disabled = {loading}>Change Email</button>
    </form>

</div>
<div class="w-full ">
    <form action="?/updateUsername" method="POST" class="flex flex-col space-y-2 w-full" enctype="multipart/form-data" use:enhance={submitUpdateUsername}>
        <h3 class="text-2xl font-medium">Change Username</h3>
        <div class="divider"></div>
        <Input id="username" placeholder = "Enter new username" label = "Username" value = {data?.user?.username} errors={form?.errors?.username} disabled={loading}/>
        <button class="btn btn-primary w-full max-w-lg" type="submit" disabled = {loading}>Change Username</button>
    </form>

</div>