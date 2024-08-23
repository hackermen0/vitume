<script>
    export let data;

    import PostCard from '$lib/components/PostCard.svelte';




</script>


<div class="flex flex-col items-center h-full gap-4 sm:gap-10 ">


{#each data.posts.items as item (item.id)}
    <PostCard {item}/>
{/each}

</div>