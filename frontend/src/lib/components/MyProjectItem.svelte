<script>
	import { enhance } from '$app/forms';
	import Modal from "./Modal.svelte"
	import { getImageURL } from '$lib/utils';
	export let post;
	let modalOpen;
	$: modalOpen = false;
</script>

<div class="w-full h-28 flex items-center justify-between">
	<div class="avatar">
		<div class="w-16 md:w-20 rounded">
			<img
				src={post?.thumbnail
					? getImageURL(post.collectionId, post.id, post.thumbnail, '80x80')
					: `https://api.dicebear.com/5.x/initials/svg?seed=${post.name}&scale=70&size=80`}
				alt="post thumbnail"
			/>
		</div>
	</div>
	<div class="flex flex-col w-full ml-4 h-full justify-center overflow-hidden">
		<a href="/posts/{post.id}" class="font-semibold text-sm md:text-xl truncate ...">{post.name}</a>
		<p class="truncate ... text-sm md:text-xl">{post.caption}</p>
	</div>
	<div class="flex items-center justify-end w-full">
		<a href="/posts/{post.id}/edit" class="btn btn-outline h-8 px-1 text-xs sm:h-12 sm:px-4 sm:text-sm">Edit post</a>
		<Modal label={post.id} checked={modalOpen}>
			<span slot="trigger" class="btn btn-error ml-2 h-8 px-1 text-xs sm:h-12 sm:px-4 sm:text-sm">Delete</span>
			<div slot="heading">
				<h3 class="text-xs sm:text-xl">Delete {post.name}</h3>
				<p class="text-base font-normal mt-2">
					Are you sure you want to delete this post? Once deleted, the post cannot be
					restored.
				</p>
			</div>
			<div slot="actions" class="flex w-full items-center justify-center space-x-2">
				<label for={post.id} class="btn btn-outline">Cancel</label>
				<form action="?/deletePost" method="POST" use:enhance>
					<input type="hidden" name="id" value={post.id} />
					<button type="submit" class="btn btn-error">Delete</button>
				</form>
			</div>
		</Modal>
	</div>
</div>