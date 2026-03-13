<script>
    let contacts = $state([]);
    import { dev } from '$app/environment';

    let API = '/api/v1/contacts';
    if (dev) {
        API = 'http://localhost:3000' + API;
    }

    async function loadContacts() {
        try {
            const response = await fetch(API, {
                method: 'GET',
            });
            const data = await response.json();
            contacts = data;
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    }
</script>

<p>Contacts</p>

<ul>
{#each contacts as contact (contact.name)}
    <li>    
        <div>
            <p>Name: {contact.name}</p>
            <p>Email: {contact.email}</p>
        </div>
    </li>
{/each}
</ul>

<button onclick={loadContacts}>Refresh Contacts</button>