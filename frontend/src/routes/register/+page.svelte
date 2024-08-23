<script>
	import { Input } from '$lib/components';
	export let form;

</script>

<div class="flex flex-col items-center h-full w-full">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Register for an account
	</h2>
	<p class="text-center mt-1">
		Or <a href="/login" class="text-primary font-medium hover:cursor-pointer hover:underline"
			>sign in</a
		> if you already have an account.
	</p>
	<form action="?/register" method="POST" class="flex flex-col items-center space-y-2 w-full pt-4">
		<Input id="name" label="Name" value={form?.data?.name} errors={form?.errors?.name} />
		<Input
			type="email"
			id="email"
			label="Email"
			value={form?.data?.email}
			errors={form?.errors?.email}
		/>
		<Input type="password" id="password" label="Password" errors={form?.errors?.password} />
		<Input
			type="password"
			id="passwordConfirm"
			label="Confirm Password"
			errors={form?.errors?.passwordConfirm}
		/>
		<label class="label cursor-pointer">
			<input type="checkbox" id="terms" name="terms" class="checkbox" value={true}>
			<p class="label-text ml-3">I agree to the <a href="/terms" class="text-primary hover:underline hover:text-primary">Terms and Condtions</a></p>
		</label>
		{#if form?.errors?.terms}
		{#each form?.errors?.terms as error}
				<label for="avatar" class="label py-0 pt-1">
					<span class="label-text-alt text-error">
						{error}
					</span>
				</label>
			{/each}
		{/if}

		<div class="w-full max-w-lg pt-2">
			<button type="submit" class="btn btn-primary w-full">Register</button>
		</div>
	</form>
</div>