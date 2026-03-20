<script>
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';

	let API = '/api/v1/contacts';
	if (dev) {
		API = 'http://localhost:3000' + API;
	}

	let contacts = $state([]);
	let resultStatusCode = $state(0);
	let newName = $state('SampleName');
	let newPhone = $state('SamplePhone');

	onMount(async () => {
		await loadContacts();
		console.log('s');
	});

	async function loadContacts() {
		try {
			const response = await fetch(API, {
				method: 'GET'
			});
			const data = await response.json();
			contacts = data;
		} catch (error) {
			console.error('Error fetching contacts:', error);
		}
	}

	async function deleteContact(name) {
		try {
			const response = await fetch(`${API}/${name}`, {
				method: 'DELETE'
			});
			if (response.ok) {
				await loadContacts();
			} else {
				console.error('Error deleting contact:', response.statusText);
			}
		} catch (error) {
			console.error('Error deleting contact:', error);
		}
	}

	async function handleAddContact() {
		const res = await fetch(API, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: newName, phone: newPhone })
		});
		resultStatusCode = await res.status;
		if (resultStatusCode === 201) {
			await loadContacts();
			newName = '';
			newPhone = '';
		} else {
			console.error('Error adding contact:', res.statusText);
		}
	}
</script>

<p>Contacts</p>

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Phone</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><input bind:value={newName} /></td>
			<td><input bind:value={newPhone} /></td>
			<td><button onclick={handleAddContact}>Add</button></td>
		</tr>
		{#each contacts as contact (contact.name)}
			<tr>
				<td>{contact.name}</td>
				<td>{contact.phone}</td>
				<td>
                    <button onclick={() => deleteContact(contact.name)}>Delete</button>
					<a href={`/contacts/${contact.name}`}>View</a>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
