export class Inventario {
    constructor(props) {
        Object.assign(this, props);
    }

    addData() {
        return fetch(`http://192.168.0.112:3000/api/inventario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this),
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
    }

    editData(id) {
        const dataToUpdate = { ...this };
        delete dataToUpdate._id;

        return fetch(`http://192.168.0.112:3000/api/inventario/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToUpdate),
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
    }
}