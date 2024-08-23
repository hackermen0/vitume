<script>

  export let data;
  
  import { getImageURL } from "$lib/utils"

  import { enhance } from "$app/forms"

  import { Icon } from "@steeze-ui/svelte-icon"
  import { Bookmark, ViewColumns, Envelope, Plus, Check } from "@steeze-ui/heroicons"

  import { page } from "$app/stores"

  const selectedStyle = "border-t border-t-slate-100 text-slate-100"

//---------------------------------------------------------------------------------------------------------------------------

  let followedValue = data.followStatus.value === null ? false : true

  const followAction = () => {
    followedValue = !followedValue
  }

</script>


<div class="flex flex-row justify-between">
  <div>
      <img src={data.user.avatar ? getImageURL(data.user.collectionId, data.user.id, data.user.avatar) : 
        `https://api.dicebear.com/5.x/thumbs/svg?size=32&seed=${data.user.name}&scale=70`} alt="User Avatar" class="rounded-full w-16 h-16 md:w-32 md:h-32 mt-4 md:mt-0 ml-1 inline object-cover object-center">
      <div class="inline-flex flex-col ml-1 md:ml-4">
        <h1 class="text-xl md:text-4xl align-baseline">{data.user.name}</h1>
        <p class="align-baseline hover:underline hover:text-blue-600 hover:cursor-pointer">@{data.user.username}</p>
      </div>  
  </div>
  {#if $page.params.userID != data.userID}
    <form action="/user/{$page.params.userID}/follow" method="POST" use:enhance>
        <div class="mr-4">
          <input type="hidden" id="followValue" name="followValue" for="followValue" value={followedValue}/>
          <button on:click="{followAction}" type="submit" class="btn border-white text-white btn-outline  mt-7 md:mt-16">
            <Icon src="{followedValue == true ? Check : Plus}" size=20 class="mr-1.5"/>
            {data.followStatus.value === 'following' ? "followed" : data.followStatus.value === "requested" ? "Requested" : "Follow"}
          </button>
          <!-- <button on:click="{followAction}" type="submit" class="">
            <Icon src="{EllipsisVertical}" size=40 class=""/>
          </button> -->
        </div>
    </form>
  {/if}

</div>


<div class="divider mt-8 mb-0"></div>



<div class="flex flex-row justify-around md:justify-center gap-2 md:gap-20">



<a href="/user/{$page.params.userID}/profile">
<button class="{$page.url.pathname.includes("profile") ? `py-2 px-3 uppercase tracking-wider font-mono + ${selectedStyle}` : "py-2 px-3 uppercase tracking-wider font-mono"}">
  <Icon src="{ViewColumns}" size=20 class="inline mr-1.5"/>Posts</button>
</a>

<a href="/user/{$page.params.userID}/comments">
  <button class="{$page.url.pathname.includes("comments") ? `py-2 px-3 uppercase tracking-wider font-mono + ${selectedStyle}` : "py-2 px-3 uppercase tracking-wider font-mono"}">
    <Icon src="{Envelope}" size=20 class="inline mr-1.5"/>Comments</button>

</a>

{#if $page.params.userID == data.userID}

  <a href="/user/{$page.params.userID}/saved">
    
    <button class="{$page.url.pathname.includes("saved") ? `py-2 px-3 uppercase tracking-wider font-mono + ${selectedStyle}` : "py-2 px-3 uppercase tracking-wider font-mono"}">
      <Icon src="{Bookmark}" size=20 class="inline mr-1.5"/>Saved</button>

  </a>
  
{/if}

</div>

<p>{$page.url.pathname.split("/")[0]}</p>

<slot />



