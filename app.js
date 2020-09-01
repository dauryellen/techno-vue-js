const vm = new Vue({
	el: "#app",
	data: {
		products: [],
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
});
