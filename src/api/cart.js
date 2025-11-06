const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://ecommerce-backend-bwha.onrender.com";

class CartService {
    constructor(token) {
        this.token = token;
    }

    _getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        };
    }

    async fetchCart() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/cart`, {
                method: 'GET',
                headers: this._getHeaders()
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching cart:", error);
            return [];
        }
    }

    async saveCart(cartItems) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/cart`, {
                method: 'POST',
                headers: this._getHeaders(),
                body: JSON.stringify({ cartItems })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error saving cart:", error);
            return null;
        }
    }

    async updateCartItem(productId, quantity) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/cart/${productId}`, {
                method: 'PUT',
                headers: this._getHeaders(),
                body: JSON.stringify({ quantity })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error updating cart item:", error);
            return null;
        }
    }

    async removeCartItem(productId) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/cart/${productId}`, {
                method: 'PUT',
                headers: this._getHeaders(),
                body: JSON.stringify({ quantity: 0 })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error removing cart item:", error);
            return null;
        }
    }

    async clearCart() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/cart`, {
                method: 'DELETE',
                headers: this._getHeaders()
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error clearing cart:", error);
            return null;
        }
    }
}

export default CartService;
