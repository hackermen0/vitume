<script>
    export let data;

    import { RequestCard } from  "$lib/components"

    import { Icon } from "@steeze-ui/svelte-icon"
    import { FaceFrown } from "@steeze-ui/heroicons"
</script>



{#if data.followRequests.requests.length === 0}

    <div class="text-center">
        <Icon src={FaceFrown} size=48 class="text-center w-full mb-5"/>
        <p class="text-2xl">There are no follow requests</p>
    </div>

{:else}

    <div class="flex flex-col gap-6">
    {#each data.followRequests.requests as request}
        <RequestCard requestData={request}/>
    {/each}
    </div>

{/if}