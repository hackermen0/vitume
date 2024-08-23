<script>

    export let data

    import { Comment } from "$lib/components";

    import { Icon } from "@steeze-ui/svelte-icon"
    import { LockClosed } from "@steeze-ui/heroicons"

</script>

{#if (!data.userComments.userPrivacy) || (data.userID === data.user.id)}

    <div class="mt-24 flex flex-col gap-3">
        
        {#each data.userComments.comments as comment}

            <Comment commentData={comment} displayMode={true}/>

        {/each}

    </div>

{:else}

    <div class="text-center p-20 mt-20">
        <Icon src={LockClosed} size=48 class="text-center w-full mb-5"/>
        <p class="text-2xl">This Account is Private</p>
    </div>

{/if}
