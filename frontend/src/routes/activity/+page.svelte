<script>

    export let data;

    import { RequestCard } from  "$lib/components"

    import { Icon } from "@steeze-ui/svelte-icon"
    import { FaceFrown } from "@steeze-ui/heroicons"

</script>
<div class="">
    <p class="text-4xl">My Activity</p>
</div>

<div class="divider mt-2 mb-8"></div>


<!------------------------------------------------------------------------------ Requests ------------------------------------------------------------->
<p class="text-2xl mt-10">Requests</p>
<div class="divider mt-2 mb-8"></div>

    <div>


        {#if data.followRequests.requests.length === 0}

            <div class="text-center" >
                <Icon src={FaceFrown} size=48 class="text-center w-full mb-5"/>
                <p class="text-2xl">There are no follow requests</p>
            </div>

        {:else}

            <div class="flex flex-col gap-6" >
            {#each data.followRequests.requests as request}
                <RequestCard requestData={request}/>
            {/each}
            </div>

        {/if}

        <a href="/requests" class="text-lg text-blue-600 mt-5 underline">View more..</a>

    </div>

    
<!------------------------------------------------------------------------------ Likes ------------------------------------------------------------->
<p class="text-2xl mt-10">Likes</p>
<div class="divider mt-2 mb-8"></div>


<!------------------------------------------------------------------------------ Comments ------------------------------------------------------------->
<p class="text-2xl mt-10">Comments</p>
<div class="divider mt-2 mb-8"></div>

<!------------------------------------------------------------------------------ Follows ------------------------------------------------------------->
<p class="text-2xl mt-10">Follows</p>
<div class="divider mt-2 mb-8"></div>


