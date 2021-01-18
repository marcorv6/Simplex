const app = new Vue({
  el: "#app",
  data() {
    return {
      noVar: localStorage.getItem("noVar"),
      noRes: localStorage.getItem("noRes"),
      objetivoIsMin: true,
      LD: [],
      FO: [],
      operadores: [],
      mat: [],
      aux: []
    };
  },
  methods: {
    parseArrays() {
      const max = this.noRes*this.noVar;
      for(let i=0; i<max; i++){
        if(i<this.noRes) this.LD[i] = Number(this.LD[i]);
        if(i<this.noVar) this.FO[i] = Number(this.FO[i]);
        this.aux[i] = Number(this.aux[i]);
      }
      console.log(this.LD, this.FO, this.aux);
    }
  },
  created() {
    for(let i=0; i<this.noRes; i++){
      this.mat[i] = new Array(Number(this.noVar))
    }
    this.LD = new Array(Number(this.noRes));
    this.FO = new Array(Number(this.noVar));
    this.aux = new Array((Number(this.noVar)*Number(this.noRes)));
    this.operadores = new Array(Number(this.noRes));
  }
});
