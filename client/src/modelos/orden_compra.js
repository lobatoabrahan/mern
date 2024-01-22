import {
    fetchData,
    postData,
    putData,
    updateProperty,
    fetchOneData,
    deleteData,
    addPropertiesToDocument,
  } from "../server/Server";
  
  const coleccion = "ordenes_compra";
  
  export class OrdenCompra {
    constructor(props) {
      Object.assign(this, props);
    }
  
    async addData() {
      try {
        const createdData = await postData(coleccion, this);
        console.log(createdData);
        return createdData;
      } catch (error) {
        console.error("Error creating data:", error);
        return undefined;
      }
    }
  
    async editData(id) {
      try {
        const dataToUpdate = { ...this };
        delete dataToUpdate._id;
  
        const updatedData = await putData(coleccion, id, dataToUpdate);
        console.log(updatedData);
        return updatedData;
      } catch (error) {
        console.error("Error updating data:", error);
        return undefined;
      }
    }
  
    static async fetchData() {
      const data = await fetchData(coleccion);
      return data && data.map((d) => new OrdenCompra(d));
    }
  
    static async fetchOneData(id) {
      const data = await fetchOneData(coleccion, id);
      return new OrdenCompra(data);
    }
  
    static async updateProperty(id, property, value) {
      return updateProperty(coleccion, id, property, value);
    }
  
    static async delete(id) {
      return deleteData(coleccion, id);
    }
  
    static async addProperties(id, properties) {
      return addPropertiesToDocument(coleccion, id, properties);
    }
  }
  