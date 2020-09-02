const vm = new Vue({
	el: "#app",
	data: {
		products: [],
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
	},
	created() {
		this.fetchProducts();
	},
});
