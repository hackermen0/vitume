<script>

    export let item;

    import {getImageURL, timeDifference} from "$lib/utils"


    const parseDate = (date) => {
        const postDate = new Date(date)
        const nowDate = new Date()

        const displayDate = (timeDifference(nowDate, postDate))

        return displayDate
    }

    const parseTooltipDate = (date) => {
        const dateVar = new Date(date)

        const options = {hour: 'numeric', minute : 'numeric', day: 'numeric', month : 'short', second : 'numeric', year: 'numeric'}

        return dateVar.toLocaleString('en', options)
    }

</script>



<a href="/posts/{item.id}">
    <div class="card-normal w-60 md:w-96 sm:h-max bg-base-200 shadow-xl rounded-2xl overflow-hidden">
        <div class="avatar">
            <div>                
                <img src={item.thumbnail ? getImageURL(item.collectionId, item.id, item.thumbnail, "80x80")
                : `https://api.dicebear.com/5.x/initials/svg?seed=${item.name}&scale=70&size=80`} alt="thumbnail" class="rounded-full w-2 h-2 p-2 justify-self-end object-cover object-center"/>    
            </div>
        <div class="divider"></div>
        </div>
        <div class="py-3 px-5 flex flex-col ">
    
            <div class="inline">
                <img src={item.expand?.user?.avatar ? getImageURL(item.expand.user.collectionId, item.expand.user.id, item.expand.user.avatar, "16x16")
                : `https://api.dicebear.com/5.x/thumbs/svg?size=32&seed=${item.expand?.user?.name}&scale=70`} alt="thumbnail" class="w-6 h-6 rounded-full inline object-cover object-center"/>
                <a href="/user/{item.expand?.user?.id}/profile"><p class="inline hover:underline">{item.expand?.user?.name}</p></a>
            </div>
    
            
            <div class="text-ellipsis overflow-hidden ...">
    
                <div class="divider mt-4"></div>
    
    
                <h1 class="card-title text-sm md:text-lg inline-flex mt-6 ">
                    {item.name.length > 36 ? item.name.slice(0, 30) + "..." : item.name}
                </h1>
    
                <p class="font-light text-sm md:text-lg overflow-hidden ">
                    {item.caption.length > 36 ? item.caption.slice(0, 30) + "..." : item.caption}
                </p>
    
                <p class="italic mt-4 text-sm md:text-lg">
                    {item.description.length > 128 ? item.description.slice(0, 64) + "..." : item.description}
                </p>
    
            </div>
    
            <div class="overflow-visible">
                <div class="tooltip tooltip-left overflow-visible float-right" data-tip="{parseTooltipDate(item.created)}">
                    <p class="pt-6 text-sm text-end cursor-pointer border-b-[1px] border-gray-500 border-dotted mt-auto pb-2 overflow-visible">
                        {parseDate(item.created)}    
                    </p>  
                </div>      
            </div>
        </div>
    </div>
</a>
    