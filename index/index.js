const app = new Vue({
  el: "#app",
  data(){
    return {
      noVar: null,
      noRes: null
    }
  },
  methods: {
    guardar() {
      window.localStorage.setItem("noVar", this.noVar);
      window.localStorage.setItem("noRes", this.noRes);
    }
  },
  created(){
    this.noVar = null;
    this.noRes = null;
  }
});
