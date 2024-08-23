<script>

    export let data

    import PostCard from "$lib/components/PostCard.svelte"

</script>


<div class="mt-24 flex flex-col gap-10 items-center lg:grid lg:grid-cols-3 lg:gap-3 lg:gap-y-10">

{#each data.savedPosts as item}

    <PostCard item={item.expand.post}/>

{/each}

</div>

