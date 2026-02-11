import axios from "axios";

const baseUrl = 'http://localhost:3002/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newPerson => {
  return axios.post(baseUrl, newPerson)
}

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, updatedPerson) => {
  return axios.patch(`${baseUrl}/${id}`, updatedPerson)
}

export default { getAll, create, remove, update }

