<script>
    import {Input, TextArea} from "$lib/components";
    import { enhance } from '$app/forms';

    export let form;
</script>

<div class="flex flex-col h-full w-full p-2">
    <div class="w-full">
        <form action="?/create" method="POST" class="space-y-2 flex flex-col items-center" enctype="multipart/form-data" use:enhance>
            <h3 class="text-3xl font-bold">Create New Post</h3>
            <p class="mt-2 text-lg">
                We'll need the name, caption and description
            </p>
            <Input id="name" label="Post Name" errors={form?.errors?.name} value={form?.data?.name}/>
            <Input id="caption" label="Post Caption" errors={form?.errors?.caption} value={form?.data?.caption}/>
			<TextArea
				id="description"
				label="Project description"
                value={form?.data?.description}
				errors={form?.errors?.description}
			/>
			<Input id="thumbnail" label="Thumbnail" type="file" errors={form?.errors?.thumbnail} myClass="file-input file-input-bordered"/>
			<Input id="media" label="Media" type="file" errors={form?.errors?.media} myClass="file-input file-input-bordered"/>
			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-primary w-full max-w-lg">Create Post</button>
			</div>
        </form>
    </div>
</div>