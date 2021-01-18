const app = new Vue({
  el: "#app",
  data() {
    return {
      noVar: localStorage.getItem("noVar"),
      noRes: localStorage.getItem("noRes"),
      objetivo: "",
      LD: [],
      FO:[],
      operadores: [],
      mat:[]

    };
  },
  methods: {},
  created() {
    for(let i=0; i<this.noRes; i++){
      this.mat[i] = new Array(Number(this.noVar))
    }
    this.LD = new Array(Number(this.noRes));
    this.operadores = new Array(Number(this.noRes));
    this.FO = new Array(Number(this.noVar));
  }
});
