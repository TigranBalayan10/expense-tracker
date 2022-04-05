// const newUser = new User(grabUserData()) ??????
class CurrentUser {
    constructor(id) {
        this.id = id
    }
    async addTag (event) {
        event.preventDefault();
        // is this valid? 
        const tag_name = document.querySelector('#new_tag').value.trim();
        const tag_color = document.querySelector('#tag_color').value;
        const response = await fetch('/api/tags', {
            method: 'POST', 
            body: JSON.stringify({
                tag_name,
                tag_color,
                user_id: this.id
            }),
            headers: {'Content-Type': 'application/json'}
        })
        if(response.ok) {
            tagAdded();
        }
    }
    get tags () {
        
    }
}
// Does this work? what if I need a chain reaction?
document.querySelector('#add-tag').addEventListener('submit', user.addTag());







