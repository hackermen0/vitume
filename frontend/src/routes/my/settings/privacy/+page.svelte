<script>

    import { enhance } from "$app/forms"

    export let data

    let form
</script>



<div class="flex flex-col w-full h-full gap-10">
    <div class="w-full">

        <form action="">
            <h3 class="text-2xl font-medium">Privacy</h3>
            <div class="divider"></div>
    
            <div class="flex flex-col gap-2">

                <form action="?/privacy" method="POST" bind:this={form} use:enhance>                   
                    <label class="label cursor-pointer border border-gray-500 rounded-lg p-5" for="">
                        <span class="label-text text-base font-semibold ml-1">Private Profile</span>
                        <!-- <input  type="hidden" value="{privacyBool}"> -->
                        <input id="privacyValue" name="privacyValue" for="privacyValue" class="toggle toggle-success" type="checkbox" checked={JSON.parse(data.privacyValue)} on:change={form.requestSubmit()}>
                    </label>
                </form>


               <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
               <div tabindex="0" class="collapse collapse-arrow border border-gray-500 rounded-lg p-1">
                    <input type="checkbox" class="peer">
                    <div class="collapse-title text-base font-medium">Blocked Accounts</div>
               
               <div class="collapse-content">
                    <p>people who are blocked</p>
               </div>

               </div>
            </div>
        </form>

    </div>
</div>