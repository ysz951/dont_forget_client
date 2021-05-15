import config from '../config';
import TokenService from './token-service';
const BuyListApiService = {
    getBuyLists() {
        return fetch(`${config.API_ENDPOINT}/list`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
        .then(res =>

            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    getBuyListById(listId) {
        return fetch(`${config.API_ENDPOINT}/buylists/${listId}`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
        .then(res =>

            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    getBuyListItems(listId) {
        return fetch(`${config.API_ENDPOINT}/list/${listId}/item`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
        .then(res =>

            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    getNextLists() {
        return fetch(`${config.API_ENDPOINT}/nextlists`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
        .then(res =>

            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    getNextListById(listId) {
        return fetch(`${config.API_ENDPOINT}/nextlists/${listId}`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
        .then(res =>

            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    getNextListItems(listId) {
        return fetch(`${config.API_ENDPOINT}/nextlists/${listId}/items`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
        .then(res =>

            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    postBuyList(list_name) {
        return fetch(`${config.API_ENDPOINT}/list`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({
            "listName": list_name
            
        }),
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    postNextList(list_name) {
        return fetch(`${config.API_ENDPOINT}/nextlists`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({
            list_name,
            
        }),
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    postItem(item_name, list_id) {
        return fetch(`${config.API_ENDPOINT}/list/${list_id}/item`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({
            "itemName": item_name
        }),
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },

    deleteBuyList(listId) {
        return fetch(`${config.API_ENDPOINT}/list/${listId}`, {
        method: 'DELETE',
        headers: {
            'authorization': `Bearer ${TokenService.getAuthToken()}`,
        },
        })
        .then(res => {
            if (!res.ok) {
              return res.json().then(error => Promise.reject(error))
            }
        })
    },
    deleteNextList(listId) {
        return fetch(`${config.API_ENDPOINT}/nextlists/${listId}`, {
        method: 'DELETE',
        headers: {
            'authorization': `Bearer ${TokenService.getAuthToken()}`,
        },
        })
        .then(res => {
            if (!res.ok) {
              return res.json().then(error => Promise.reject(error))
            }
        })
    },
    updateBuyList(listId, list_name) {
        return fetch(`${config.API_ENDPOINT}/list/${listId}?name=${list_name}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${TokenService.getAuthToken()}`,
        },
        // body: JSON.stringify({
        //     list_name,
        // }),
        })
        .then(res => {
            if (!res.ok) {
              return res.json().then(error => Promise.reject(error))
            }
          })
    },
    updateNextList(listId, list_name) {
        return fetch(`${config.API_ENDPOINT}/nextlists/${listId}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({
            list_name,
        }),
        })
        .then(res => {
            if (!res.ok) {
              return res.json().then(error => Promise.reject(error))
            }
          })
    },
    deleteItem(itemId) {
        return fetch(`${config.API_ENDPOINT}/items/${itemId}`, {
        method: 'DELETE',
        headers: {
            'authorization': `Bearer ${TokenService.getAuthToken()}`,
        },
        })
        .then(res => {
            if (!res.ok) {
              return res.json().then(error => Promise.reject(error))
            }
        })
    },
    updateItem(itemId, item_name, list_id) {
        return fetch(`${config.API_ENDPOINT}/items/${itemId}?name=${item_name}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${TokenService.getAuthToken()}`,
        },
        // body: JSON.stringify({
        //     item_name,
        //     list_id
        // }),
        })
        .then(res => {
            if (!res.ok) {
              return res.json().then(error => Promise.reject(error))
            }
          })
    },
    // getCollectionList() {
    //     return fetch(`${config.API_ENDPOINT}/users/collections`, {
    //         headers: {
    //             'authorization': `Bearer ${TokenService.getAuthToken()}`,
    //         },
    //         })
    //         .then(res =>
    //             (!res.ok)
    //             ? res.json().then(e => Promise.reject(e))
    //             : res.json()
    //         )
        
        
    // },
    // postCollectionList(recId) {
    //     return fetch(`${config.API_ENDPOINT}/users/collections`, {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json',
    //             'authorization': `Bearer ${TokenService.getAuthToken()}`,
    //         },
    //         body: JSON.stringify({
    //             rec_id: recId,
    //         }),
    //         })
    //         .then(res =>
    //             (!res.ok)
    //             ? res.json().then(e => Promise.reject(e))
    //             : res.json()
    //         )
    // },
    // deleteCollectionList(recId) {
    //     return fetch(`${config.API_ENDPOINT}/users/collections/${recId}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'content-type': 'application/json',
    //             'authorization': `Bearer ${TokenService.getAuthToken()}`,
    //         },
    //         })
    //         .then(res => {
    //             if (!res.ok) {
    //             return res.json().then(error => Promise.reject(error))
    //             }
    //         })
    // },
};

export default BuyListApiService;
