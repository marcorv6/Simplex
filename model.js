const app = new Vue({
  el: "#app",
  data() {
    return {
      noVar: Number(localStorage.getItem("noVar")),
      noRes: Number(localStorage.getItem("noRes")),
      objetivoIsMin: true,
      mostrarTableau: false,
      mostrarResultado: false,
      isOne:false,
      numero:"",
      LD: [],
      FO: [],
      operadores: [],
      FOAux: [],
      mat: [],
      aux: [],
      canon:[],
      variablesDecision:[],
      cambioSigno:[],
      arrayAux:[],
      resultado: {}
    };
  },
  methods: {
    parseArrays() {
      const max = this.noRes*this.noVar;
      for(let i=0; i<max; i++){
        if (i < this.noRes) this.LD[i] = Number(this.LD[i]);
        if(i<this.noRes) this.operadores[i] = Number(this.operadores[i]);
        if(i<this.noVar) this.FO[i] = Number(this.FO[i]);
        this.aux[i] = Number(this.aux[i]);
      }
      this.arrayToMatrix();
    },

    arrayToMatrix(){
      for(let i=0; i<this.noRes; i++){
        for(let j=0; j<this.noVar; j++){
          this.mat[i][j] = this.aux[i+j+((this.noVar-1)*i)];
        }
      }
      this.mostrarTableau = true
      this.generarTableau()
    },

    generarTableau(){
      var mat = this.mat
      let arrayAux = this.arrayAux
      var operadores = this.operadores
      var FOAux = this.FOAux
      var cambioSigno = this.cambioSigno
      let canon = this.canon
      let LD = this.LD
      let FO = this.FO  
      
      FO.forEach(function (element) {
        FOAux.push(element)
      })
      
      for (let i = 0 ; i < operadores.length ; i++) {
        if(operadores[i] === 3){
          this.noRes += 1

          mat[i].forEach(function (element) {
            arrayAux.push(element)
          })

          mat.splice(i + 1, 0, arrayAux)
          operadores.splice(i, 1, 1, 2)
          arrayAux = []
          LD.splice(i, 0, LD[i])
        }
      }

      this.variableD()

      for(let i = 0; i < this.noRes ; i++){
        for(let j = 0; j < this.noRes ; j++) {
          if (i === j) {
            this.isOne = true
          }
          this.asignarUno(j)
          mat[j].push(this.numero)

          if(this.numero == 1 || this.numero == -1){
            cambioSigno.push(this.numero)
            
          }

          this.isOne = false

        }
      }
      
      for(let i = 0; i < this.noRes; i++){
        mat[i].push(LD[i])
      }

      for(let i = 0; i <= canon.length; i++){
        FOAux.push(0)
      }

      if (this.objetivoIsMin === true) {
        for (let i = 0; i < canon.length; i++){
            FOAux[i] *= -1
          }
      }
      
      cambioSigno.forEach(function(element, index1){
        if(element === -1){         
          for (let i = 0; i < mat[index1].length; i++){
            mat[index1][i] *= -1
          }
        }
      })
      

      mat.unshift(FOAux) //Agrega elementos al inicio del arreglo 
    },
    asignarUno(index) {
      var operadores = this.operadores
  
      if(this.isOne === false){
        this.numero = 0
      }else{
        
        if(this.operadores[index] === 1){
          this.numero = 1
        }
        if(this.operadores[index] === 2){
          this.numero = -1
        } else {
          this.numero = 1
        }
      }
    },
  
    variableD() {
      for (let i = 0; i < this.noVar; i++) {
        this.variablesDecision.push("X" + (i + 1))
      }

      for (let i = 0; i < this.noRes; i++) {
        this.canon.push("S" + (i + 1))
        this.variablesDecision.push(this.canon[i])
      }

      this.variablesDecision.push("LD")
    },
    mostrarResultados() {
      this.mostrarResultado = true;
      this.resultado = simplexCompleto(this.mat);
    },
    resetLocalStorage() {
      localStorage.clear()
    }
  },

  created() {
    for(let i=0; i<this.noRes; i++) this.mat[i] = new Array(Number(this.noVar))
    this.LD = new Array(Number(this.noRes));
    this.FO = new Array(Number(this.noVar));
    this.aux = new Array((Number(this.noVar)*Number(this.noRes)));
    this.operadores = new Array(Number(this.noRes));
  }
});
