export const state = () => ({
    snackbar: {
        status: false,
        message: '',
        color: ''
    },
    cart: []
})

export const getters = {
    getSnackbar: (state) => {
        return state.snackbar
    },
    getCart(state) {
        return state.cart
    },
    getShortCart(state) {
        return state.cart.map(({ id, qty }) => {
            return {
                product: id, qty
            }
        })
    },
    getCartLength(state) {
        return state.cart.length
    },
    getCartTotalPrice(state) {
        return parseInt(state.cart.reduce((a, b) => (a + b.price * b.qty), 0).toLocaleString().split(',')[0] + '000'.toLocaleString())
    }

}
export const mutations = {
    SET_SNACKBAR(state, payload) {
        state.snackbar.status = payload.status
        state.snackbar.color = payload.color
        state.snackbar.message = payload.message
    },
    SET_CART_PRODUCTS(state, payload) {
        state.cart = payload.slice()
    },
    CLEAR_CART(state) {
        // state.cart.length = 0
        state.cart = []
    }
}

export const actions = {
    snackbar: ({ commit }, payload) => {
        commit('SET_SNACKBAR', payload)
        setTimeout(() => {
            commit('SET_SNACKBAR', {
                status: false,
                color: '',
                message: ''
            })
        }, 3000);
    },
    addToCart({ commit, dispatch }, payload) {
        let storage = JSON.parse(window.localStorage.getItem('shagf_store_cart') || '[]')
        let productIndex = storage.findIndex(ele => ele.id === payload.id)
        if (payload.option === 'qu') {
            if (productIndex > -1) {
                if (payload.qty === 1) {
                    storage[productIndex].qty += 1
                } else {

                    storage[productIndex].qty = payload.qty
                }
                window.localStorage.setItem('shagf_store_cart', JSON.stringify(storage))
            } else {
                let quentityProductIndex = storage.findIndex(ele => ele.option === 'qu')
                if (quentityProductIndex > -1) {
                    storage[quentityProductIndex].id = payload.id
                    storage[quentityProductIndex].name = payload.name
                    storage[quentityProductIndex].price = payload.price
                    storage[quentityProductIndex].qty = payload.qty
                    storage[quentityProductIndex].thumbnail = payload.thumbnail
                    window.localStorage.setItem('shagf_store_cart', JSON.stringify(storage))
                } else {
                    storage.push(payload)
                    window.localStorage.setItem('shagf_store_cart', JSON.stringify(storage))
                }
            }
        } else {
            if (productIndex > -1) {
                if (payload.qty === 1) {
                    storage[productIndex].qty += 1
                } else {

                    storage[productIndex].qty = payload.qty
                }
                window.localStorage.setItem('shagf_store_cart', JSON.stringify(storage))
            } else {
                storage.push(payload)
                window.localStorage.setItem('shagf_store_cart', JSON.stringify(storage))

            }
        }
        dispatch('snackbar', {
            message: 'تمت الاضافة',
            status: true,
            color: 'success'
        })
        commit('SET_CART_PRODUCTS', storage)
    },
    getCartFromStorage({ commit }) {
        let storage = JSON.parse(window.localStorage.getItem('shagf_store_cart') || '[]')
        commit('SET_CART_PRODUCTS', storage)
    },
    deleteFromCart({ commit, dispatch }, payload) {
        let storage = JSON.parse(window.localStorage.getItem('shagf_store_cart') || '[]')
        let removedProductIndex = storage.findIndex(ele => ele.id === payload)
        if (removedProductIndex > -1) {
            storage.splice(removedProductIndex, 1)
            window.localStorage.setItem('shagf_store_cart', JSON.stringify(storage))
            commit('SET_CART_PRODUCTS', storage)
            dispatch('snackbar', {
                message: 'تمت الازالة',
                status: true,
                color: 'success'
            })
        }
    },
    clearCart({ commit }) {
        window.localStorage.removeItem('shagf_store_cart')
        commit('CLEAR_CART')
    }

}