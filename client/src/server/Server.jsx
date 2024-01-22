import axios from 'axios';

const SERVER_URL = 'http://localhost:3000/api/';

export async function fetchData(collection) {
    try {
        const response = await axios.get(`${SERVER_URL}${collection}`);
        console.log(response.data);
        return response.data // Devuelve los datos obtenidos de la API
    } catch (error) {
        console.error(error);
    }
}

export async function fetchOneData(collection, id) {
    try {
        const response = await axios.get(`${SERVER_URL}${collection}/${id}`);
        console.log(response.data);
        return response.data // Devuelve los datos obtenidos de la API
    } catch (error) {
        console.error(error);
    }
}

export async function postData(collection, data) {
    try {
        const response = await axios.post(`${SERVER_URL}${collection}`, data);
        console.log(response.data);
        return response.data // Devuelve los datos obtenidos de la API
    } catch (error) {
        console.error(error);
    }
}

export async function putData(collection, id, data) {
    try {
        const response = await axios.put(`${SERVER_URL}${collection}/${id}`, data);
        console.log(response.data);
        return response.data // Devuelve los datos obtenidos de la API
    } catch (error) {
        console.error(error);
    }
}

export async function deleteData(collection, id) {
    try {
        const response = await axios.delete(`${SERVER_URL}${collection}/${id}`);
        console.log(response.data);
        return response.data // Devuelve los datos obtenidos de la API
    } catch (error) {
        console.error(error);
    }
}

export async function updateProperty(collection, id, property, newValue) {
    try {
        const response = await axios.put(`${SERVER_URL}${collection}/${id}/${property}`, { value: newValue });
        console.log(response.data);
        return response.data // Devuelve los datos obtenidos de la API
    } catch (error) {
        console.error(error);
    }
}

export async function addPropertiesToDocument(collection, id, properties) {
    try {
        let data;
        if (typeof properties === 'object') {
            // Itera sobre las propiedades del objeto y envía cada una individualmente
            for (let property in properties) {
                data = { property, value: properties[property] };
                await axios.post(`${SERVER_URL}${collection}/${id}/addProperty`, data);
            }
        } else if (typeof properties === 'string') {
            const property = properties;
            data = { property, value: properties };
            await axios.post(`${SERVER_URL}${collection}/${id}/addProperty`, data);
        } else {
            throw new Error('Properties must be an object or a string');
        }
        console.log('Properties added successfully');
    } catch (error) {
        console.error(error);
    }
}

export async function linkData(table1, table2, linkProperty, property2) {
    return table1.map(item1 => {
        const item2 = table2.find(item2 => item2._id === item1[linkProperty]);
        return {
            ...item1,
            [linkProperty]: item2 ? item2[property2] : item1[linkProperty]
        };
    });
}