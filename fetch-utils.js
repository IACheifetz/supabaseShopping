const SUPABASE_URL = 'https://piaaxjtzsxubseeoqown.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpYWF4anR6c3h1YnNlZW9xb3duIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc5ODgwOTMsImV4cCI6MTk2MzU2NDA5M30.-JF8rp3uujkLpMpiJj70fwmuyamVh64NHTUYK5UFA04';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./other-page');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

// function checkError({ data, error }) {
//     return error ? console.error(error) : data;
// }

export async function getShoppingList() {
    const response = await client
        .from('shopping_list_items')
        .select('*');

    return response.body;
}

export async function deleteShoppingList(id) {
    const response = await client
        .from('shopping_list_items')
        .delete()
        .match({ id });

    return response.body;

}

export async function buyItem(id) {
    const response = await client
        .from('shopping_list_items')
        .update({ is_bought: true })
        .match({ id });

    return response.body;

}
export async function createListItem(listItem) {
    const response = await client
        .from('shopping_list_items')
        .insert(listItem);
        
    return response.body;

}