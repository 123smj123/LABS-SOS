<script>
    import { page } from '$app/state';
    import { dev } from '$app/environment';
	import { onMount } from 'svelte';

	let API = '/api/v1/contacts';
	if (dev) {
		API = 'http://localhost:3000' + API;
	}

	let contact = $state(getContact);
	let resultStatusCode = $state(0);
	let updatedName = $state('SampleName');
	let updatedPhone = $state('SamplePhone');

	onMount(async () => {
		await getContact();
		console.log('s');
	});

	async function getContact() {
		try {
			const response = await fetch(API+`/${name}`, {
				method: 'GET'
			});
			const data = await response.json();
			updatedName = data.name;
            updatedPhone = data.phone;
		} catch (error) {
			console.error('Error fetching contacts:', error);
		}
	}

	async function deleteContact(name) {
		try {
			const response = await fetch(`${API}/${name}`, {
				method: 'DELETE'
			});
		} catch (error) {
			console.error('Error deleting contact:', error);
		}
	}

    async function updateContact() {
        const res = await fetch(`${API}/${name}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: updatedName, phone: updatedPhone })
        });
        resultStatusCode = await res.status;
        if (resultStatusCode === 200) {
            await getContact();
        } else {
            console.error('Error updating contact:', res.statusText);
        }
    }

    let name = page.params.name;
</script>

<p>Contact Details for {name}</p>

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Phone</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><input bind:value={updatedName} /></td>
			<td><input bind:value={updatedPhone} /></td>
			<td><button onclick={updateContact}>Update</button></td>
		</tr>
		
	</tbody>
</table>