<template>
	<div id="app">
		<HelloWorld msg="Welcome to Your Vue.js App" />
		<p>some text</p>
		<input v-model="test" type="text" />
		<p>{{ test }}</p>
		<button @click="testF">click me</button>
	</div>
</template>

<script>
	import HelloWorld from "./components/HelloWorld.vue";

	export default {
		name: "App",
		components: {
			HelloWorld,
		},
		data() {
			return {
				test: "",
			};
		},
		methods: {
			testF() {
				console.log("test method");
			},
		},
	};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>