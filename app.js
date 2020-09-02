const vm = new Vue({
	el: "#app",
	data: {
		products: [],
		product: false,
	},
	filters: {
		formatPrice(value) {
			return value.toLocaleString("en-GB", {
				style: "currency",
				currency: "EUR",
			});
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
	},
	created() {
		this.fetchProducts();
	},
});
