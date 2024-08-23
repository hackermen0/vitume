<script>
	import '../app.postcss';
	export let data;

	
	import { Icon } from "@steeze-ui/svelte-icon"
	import { Heart } from "@steeze-ui/heroicons"

	import { getImageURL } from "$lib/utils"
</script>

<div class="min-h-full">
<nav class="navbar bg-base-100 border-b">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl">Bliu</a>
	</div>
	<div class="flex-none">
		 {#if !data.user}
			<div class="dropdown dropdown-end">
				<a href="/login" class="btn btn-primary">Login</a>
				<a href="/register" class="btn btn-secondary">Register</a>
			</div>
		 {:else}
			<div class="dropdown dropdown-end">

				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label tabindex="0">
					<Icon src={Heart} size=32 class="mr-4"/>
				</label>

				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow-md bg-base-100 rounded-box w-96">

					<li>
						<a href="/requests">Requests</a>
					</li>

					<li>
						<a href="ramesh">Ramesh</a>
					</li>

					<li>
						<a href="ramesh">Ramesh</a>
					</li>

					<li>
						<a href="ramesh">Ramesh</a>
					</li>

					<li>
						<a href="ramesh">Ramesh</a>
					</li>

				</ul>
			</div>
			<div class="dropdown dropdown-end mr-4">
				<a href="/posts/new" class="btn btn-primary btn-outline">Add Post</a>
			</div>
			<div class="dropdown dropdown-end">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label tabindex="0" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						<img src={data.user?.avatar ? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar) : 
							`https://api.dicebear.com/5.x/thumbs/svg?size=32&seed=${data.user?.name}&scale=70`} alt="User Avatar">
					</div>
				</label>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul
				tabindex="0"
				class="menu menu-compact dropdown-content mt-3 p-2 shadow-md bg-base-100 rounded-box w-52">
				<li>
					<a href="/activity" class="justify-between">My Activity</a>
				</li>
				<li>
					<a href="/user/{data.user?.id}/profile" class="justify-between">My Profile</a>
				</li>
				<li>
					<a href="/my/posts" class="justify-between">My Posts</a>
				</li>
				<li>
					<a href="/my/settings">Settings</a>
				</li>
				<li>
					<form action="/logout" method="POST">
						<button type="submit" class="w-full text-start text-red-400">Logout</button>
					</form>
				</li>
				</ul>
			</div>
		 {/if}
	</div>
</nav>

	<div class="py-10">
		<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
			<slot />
		</div>
	</div>
	<!-- <footer class="footer footer-center p-4 bg-base-300 text-base-content h- w-[100%]">
		<div>
		<p>Copyright © 2023 - All right reserved by Upaayan Naskar</p>
		</div>
	</footer>	
 -->

</div>
