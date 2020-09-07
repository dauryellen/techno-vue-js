const vm = new Vue({
	el: "#app",
	data: {
		products: [],
		product: false,
		cart: [],
		activeCart: false,
		alertMessage: "Item added to cart",
		alertActive: false,
	},
	filters: {
		formatPrice(value) {
			return value.toLocaleString("en-GB", {
				style: "currency",
				currency: "EUR",
			});
		},
	},
	computed: {
		totalCart() {
			let total = 0;

			if (this.cart.length) {
				this.cart.forEach((item) => {
					total += item.price;
				});
			}

			return total;
		},
	},
	methods: {
		fetchProducts() {
			fetch("./api/products.json")
				.then((res) => res.json())
				.then((res) => {
					this.products = res;
				});
		},
		fetchProduct(id) {
			fetch(`./api/products/${id}/data.json`)
				.then((res) => res.json())
				.then((res) => {
					this.product = res;
				});
		},
		openModal(id) {
			this.fetchProduct(id);

			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		},
		closeModal({ target, currentTarget }) {
			if (target === currentTarget) this.product = false;
		},
		clickOut({ target, currentTarget }) {
			if (target === currentTarget) this.activeCart = false;
		},
		addItem() {
			this.product.stock--;
			const { id, name, price } = this.product;
			this.cart.push({ id, name, price });
			this.alert(`${name} added to cart`);
		},
		removeItem(index) {
			this.product.stock++;
			this.cart.splice(index, 1);
		},
		checkLocalStorage() {
			if (window.localStorage.cart)
				this.cart = JSON.parse(window.localStorage.cart);
		},
		alert(message) {
			this.alertMessage = message;
			this.alertActive = true;
			setTimeout(() => {
				this.alertActive = false;
			}, 1500);
		},
		router() {
			const hash = document.location.hash;

			if (hash) {
				this.fetchProduct(hash.replace("#", ""));
			}
		},
	},
	watch: {
		product() {
			document.title = this.product.name || "Techno";
			const hash = this.product.id || "";
			history.pushState(null, null, `#${hash}`);
		},
		cart() {
			window.localStorage.cart = JSON.stringify(this.cart);
		},
	},
	created() {
		this.fetchProducts();
		this.checkLocalStorage();
		this.router();
	},
});
