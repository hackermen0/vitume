<script>
    export let data;
    export let form;
    
    import {getImageURL} from "$lib/utils"
    import { ArrowTopRightOnSquare } from "@steeze-ui/heroicons"
    import { Heart, Share, Bookmark, Icon} from "svelte-hero-icons"
    import { enhance } from "$app/forms"

    import {Comment, TextArea} from "$lib/components";



    const imageFileTypes = [
	'jpeg',
	'jpg',
	'png',
	'webp',
	'svg+xml',
	'gif',

]


    let likeClicked = false
    let saveClicked = false

    if (data.postLike != undefined) {
        likeClicked = true
    } 

    if (data.postSave != undefined) {
        saveClicked = true
    } 

    const likeHandleClick = () => {
        likeClicked = !likeClicked
    }

    const saveHandleClick = () => {
        saveClicked = !saveClicked
    }

   
</script>



<div class="flex flex-col w-full mt-4">


    <div class="mb-10">    
        <img src={data.post.thumbnail ? getImageURL(data.post.collectionId, data.post.id, data.post.thumbnail, "120x120")
            : `https://api.dicebear.com/5.x/initials/svg?seed=${data.post.name}&scale=70&size=80`} alt="thumbnail" class="w-32 inline rounded-lg object-cover object-center"/>


        <div class="inline ml-6 align-text-top mt-4 ">
  
        <img src={data.post.expand?.user?.avatar ? getImageURL(data.post.expand.user.collectionId, data.post.expand.user.id, data.post.expand.user.avatar, "80x80")
        : `https://api.dicebear.com/5.x/thumbs/svg?size=32&seed=${data.post.expand?.user?.name}&scale=70`} alt="thumbnail" class="rounded-full inline w-6 h-6 "/>
    
        <a href="/user/{data.post.expand?.user?.id}/profile"><p class="inline mb-6 hover:underline hover:cursor-pointer">{data.post.expand?.user?.name}</p></a>

        </div>
    </div>

    <div class="mb-10">

        <h1 class="text-2xl font-bold mt-4">
            {data.post.name}
        </h1>
        <p class="text-2xl font-light mt-2">
            {data.post.caption}
        </p>
        <p>{data.post.description}</p>

    </div>

    {#if data.post.media}
    <div class="mt-4 mb-10">
        {#if imageFileTypes.includes(data.post.media.split(".")[1])}

        <div class="relative top-0 left-0">
            <img  class="h-auto w-auto relative top-0 left-0 z-0 hover:opacity-40 hover:z-20 " alt="media content" src={getImageURL(data.post.collectionId, data.post.id, data.post.media)}>
            <div class="h-full w-full opacity-0 absolute text-center hover:opacity-100 top-0 z-0">
                <a target="_blank" rel="noreferrer noopener" href="{getImageURL(data.post.collectionId, data.post.id, data.post.media)}" class="float-right mr-2 mt-2">
                    <Icon src="{ ArrowTopRightOnSquare }" size="24" class="hover:cursor-pointer hover:text-white"/>
            </div>
        </div>
   

        {:else}
            <!-- svelte-ignore a11y-media-has-caption -->
            <video class="h-auto w-auto" src={getImageURL(data.post.collectionId, data.post.id, data.post.media)} controls></video>
    
        {/if}
    </div>
    {/if}




        
        <div class="flex flex-row gap-2">    

            <form action="?/postLike" method="POST" use:enhance>   
                <input id="likeValue" name="likeValue" for="likeValue" type="hidden" value = {likeClicked}/>
                <button on:click={likeHandleClick} type="submit"><Icon src="{Heart}" size="24" class=" hover:cursor-pointer {likeClicked === false ? "hover:text-pink-400" : "hover:text-gray-400"} {likeClicked === true ? "text-pink-400" : ""}"  solid={likeClicked ? true : false}/></button>
            </form>

            <form action="?/postSave" method="POST" use:enhance>  
                <input id="saveValue" name="saveValue" for="saveValue" type="hidden" value = {saveClicked}/>
                <button on:click={saveHandleClick} type="submit"><Icon src="{Bookmark}" size="24" class="hover:cursor-pointer hover:text-white" solid={saveClicked ? true : false}/></button>
            </form>

            <button><Icon src="{Share}" size="24" class="hover:cursor-pointer hover:text-white"/></button>

        </div>




    
    <div class="divider"></div>

    <div class="comments mt-4">
        <h2 class="text-2xl">Comments</h2>


        <div class="mt-4">
            <form action="?/createComment" method="POST" use:enhance>
                <TextArea placeholder={"Type out your comment"} id={"comment"} errors={form?.errors?.comment}/>
                <button type="submit" class="btn mt-2 bg-slate-400 text-white">Comment</button>
            </form>
        </div>
        
        <div class="divider mt-10"></div>

        <div class="h-auto py-10">

        {#each data.comments.items as item (item.id)}
            <Comment commentData={item} likeValue = {data.commentLikes.find(e => e.comment === item.id)}/>
        {/each}
        </div>
    </div>
</div>

