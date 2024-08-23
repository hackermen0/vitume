<script>

    export let data;

    import { PostCard } from "$lib/components";

    import { Icon } from "@steeze-ui/svelte-icon"
    import { LockClosed } from "@steeze-ui/heroicons"

</script>

    {#if (!data.userPosts.userPrivacy) || (data.userID === data.user.id) || (data.userPosts.followingStatus)}

        <div class="mt-24 flex flex-col gap-10 items-center lg:grid lg:grid-cols-3 lg:gap-3 lg:gap-y-10">

        {#each data.userPosts.posts as item}

            <PostCard item={item}/>
        
        {/each}

        </div>
    {:else}

        <div class="text-center p-20 mt-20">
            <Icon src={LockClosed} size=48 class="text-center w-full mb-5"/>
            <p class="text-2xl">This Account is Private</p>
        </div>

    {/if}











