<script>

    import { getImageURL, timeDifference } from "$lib/utils"

    import { enhance } from "$app/forms"

    export let requestData

    let date = new Date()
    let oldDate = new Date(requestData.created)

    const options = {hour: 'numeric', minute : 'numeric', day: 'numeric', month : 'short', second : 'numeric', year: 'numeric'}

    const relativeDate = timeDifference(date, oldDate)
    const tooltipDate = oldDate.toLocaleString('en', options)
</script>

<div class="tooltip tooltip-right flex w-40" data-tip="{tooltipDate}">
    <p class="text-md">{relativeDate}</p>
</div>
<div class="divider w-40 mt-0 mb-0"></div>

<div class="border border-gray-400 py-2 rounded-md">
    <div class="flex flex-row justify-between">
         <div>
             <a href="/user/{requestData.expand.user.id}/profile">  
                 <img src={requestData.expand.user.avatar ? getImageURL(requestData.expand.user.collectionId, requestData.expand.user.id, requestData.expand.user.avatar) : 
                     `https://api.dicebear.com/5.x/thumbs/svg?size=32&seed=${requestData.expand.user.name}&scale=70`} alt="User Avatar" class="rounded-full w-16 h-16 mt-4 ml-2 mr-1 inline object-cover object-center">          
                 <div class="inline-flex flex-col ml-1 mb-6">
                     <h1 class="text-xl align-baseline">{requestData.expand.user.name}</h1>
                     <p class="align-baseline hover:underline hover:text-blue-600 hover:cursor-pointer text-md">@{requestData.expand.user.username}</p>
                 </div>      
             </a> 
         </div>  
         <div class="mt-7 mr-5 flex flex-row gap-2">
             <form action="?/accept" method="POST" use:enhance>
                 <input id="followRequestID" for="followRequestID" name="followRequestID" type="hidden" value={requestData.id}>
                 <button class="btn btn-outline btn-success">Accept</button>
             </form>
             <form action="?/reject" method="POST" use:enhance>
                 <input id="followRequestID" for="followRequestID" name="followRequestID" type="hidden" value={requestData.id}>
                 <button class="btn btn-outline btn-error">Reject</button>
             </form>
         </div>
     </div>
 </div>