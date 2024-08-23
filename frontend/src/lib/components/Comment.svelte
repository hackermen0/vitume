<script>
    import {Icon, Heart} from "svelte-hero-icons"
    import {getImageURL, timeDifference} from "$lib/utils"
    import {enhance} from "$app/forms"
  
    export let commentData;
    export let displayMode = false;

    export let likeValue;

    let user = commentData.expand?.user;
 
    let date = new Date()
    let oldDate = new Date(commentData.created)

    const options = {hour: 'numeric', minute : 'numeric', day: 'numeric', month : 'short', second : 'numeric', year: 'numeric'}

    const relativeDate = timeDifference(date, oldDate)
    const tooltipDate = oldDate.toLocaleString('en', options)

    let clicked = false

    
    if (likeValue != undefined) {
        clicked = true
    } 

    const handleClick = () => {
        clicked = !clicked
    }


</script>

<div class="my-8" id={commentData.id}>
    <img src={user?.avatar ? getImageURL(user?.collectionId, user?.id, user?.avatar, "80x80")
            : `https://api.dicebear.com/5.x/thumbs/svg?size=32&seed=${user?.name}&scale=70`} alt="thumbnail" class="rounded-full inline w-6 h-6 "/>
    <a href="/user/{user?.id}">
        <p class="inline hover:underline hover:cursor-pointer text-lg align-bottom">{user?.name}</p>
    </a>
    <div class="tooltip tooltip-left flex" data-tip="{tooltipDate}">
        <p class="mt-1 text-[0.8rem]">{relativeDate}</p>
    </div>


    <p class="mt-4 mb-2">

        {commentData.text}

        {#if displayMode === true}
            <a href="/posts/{commentData.post}/#{commentData.id}" class="underline float-right text-blue-600">Go to comment</a>
        {/if}
    </p>

  
        

    {#if displayMode === false}

        <form action="?/commentLike" method="POST" use:enhance>
            <input type="hidden" value={clicked} name="clickedValue">
            <input type="hidden" value={commentData.id} name="commentID">
            <button type="submit" on:click={handleClick} class="mt-4 align-bottom p-0"><Icon src="{Heart}" size="20" class="hover:cursor-pointer {clicked === false ? "hover:text-pink-400" : "hover:text-gray-400"} {clicked === true ? "text-pink-400" : ""}"  solid={clicked ? true : false}/></button>
            
        </form>

    {/if}
    <div class="divider p-0"></div>

</div>