function tablonBigM(tablon){
    num_rest = tablon.length-1;
    num_var = tablon[0].length-num_rest-1;
    cont = 0;
    negativosLD = [];

    for(var i=0; i<num_rest; i++){
        if(tablon[i+1][tablon[0].length-1] < 0){
            negativosLD[cont] = i+1;
            cont++;
        }
    }

    let tablon_aux = [];

    if(cont != 0){
        for (let i = 0; i < tablon.length-1 + 1; i++) {
            let array_aux = [];
            for (let j = 0; j < tablon[0].length-tablon.length + (tablon.length-1) + 3; j++) {
                array_aux.push(0);
            }
            tablon_aux.push(array_aux);
        }
        
        for(var i=0; i<num_var+num_rest; i++){
            for(var j=0; j<num_rest+1; j++){
                tablon_aux[j][i] = tablon[j][i];
            }
        }

        for(var i=0; i<num_rest+1; i++){
            tablon_aux[i][tablon_aux[0].length-1] = tablon[i][tablon[0].length-1];

        }

        let suma = [];
        let suma_ind = 0;

        for(var j=0; j<tablon_aux[0].length; j++){
            for(var i=0; i<cont; i++){
                suma_ind += tablon_aux[negativosLD[i]][j];

                tablon_aux[negativosLD[i]][j] = -tablon_aux[negativosLD[i]][j];
            }
            suma[j] = suma_ind;
            
            suma_ind = 0;
        }

        for(var i=0; i<tablon_aux[0].length; i++){
            tablon_aux[0][i] = tablon_aux[0][i]+(1000*-1*suma[i]);
        }

        return tablon_aux;
    }if(cont == 0){
        return tablon;
    }
}

function encontarMax(matriz, maxFO) {//encuentra el maximo de la funcion objetivo y lo uarda en un arrelo junto con su posicion
    if(matriz[0][matriz[0].length-1]>0){//condicionales para Big Mama 
        matriz[0][matriz[0].length-1] = -matriz[0][matriz[0].length-1];
        maxFO[0] = Math.max(...matriz[0]);//Guarda el maximo
        matriz[0][matriz[0].length-1] = -matriz[0][matriz[0].length-1];
    }else{
        maxFO[0] = Math.max(...matriz[0]);
    }

    if(matriz[0][matriz[0].length-1]>0){//condicionesles para Big Mama
        matriz[0][matriz[0].length-1] = -matriz[0][matriz[0].length-1];
        maxFO[1] = matriz[0].indexOf(Math.max(...matriz[0]));//Guarda la posicion de maximo
        matriz[0][matriz[0].length-1] = -matriz[0][matriz[0].length-1];
    }else{
        maxFO[1] = matriz[0].indexOf(Math.max(...matriz[0]));
    }

}

function dividirLD(tablon, maxFO, LD_xmax) {//Divide el lado derecho entre la fila del max de fun obj
    let max = 1000000000;
    for (let i = 0; i < tablon.length-1; i++) {
        
        if (tablon[i + 1][maxFO[1]] > 0) {
            LD_xmax[i] = tablon[i + 1][tablon[0].length - 1] / tablon[i + 1][maxFO[1]];//divide y lo guarda en un arreglo
        }
        else{
            LD_xmax[i] = max;//vuelve un numero muy grande los negativos, ya que posterior mente necesitaremos el menor positivo
        }
    }
}

function encontarMin(LD_xmax, minLD, error){//encuentra el minimo del lado derecho
    let max = 1000000000;
    minLD[0] = Math.min(...LD_xmax);
    
    minLD[1] = LD_xmax.indexOf(Math.min(...LD_xmax));
    if(minLD[0]===max){
        error[0] = 1;//si todos los valores de LD son negativos es no acotado
    }
}


function pivotear(tablon, tablon_aux, maxFO, minLD, pivote) {//funcion para pivotear
    
    for (let i = 0; i < tablon.length-1 + 1; i++) {
        let array_aux = [];
        for (let j = 0; j < tablon[0].length-tablon.length + (tablon.length-1) + 1; j++) {
            array_aux.push(0);
        }
        tablon_aux.push(array_aux);
    }

    for(var i=0; i<tablon[0].length; i++){
        tablon_aux[minLD[1]+1][i] = tablon[minLD[1]+1][i] / pivote;//se guardan los valores en una matrz auxiliar
    }

    for(var j=0; j<tablon.length; j++){
        if(j != minLD[1]+1){
            for(var i=0; i<tablon[0].length; i++){
                tablon_aux[j][i] = tablon[j][i] - (tablon[j][maxFO[1]] * tablon_aux[minLD[1]+1][i]);
            }
        }
    }
}

function generarVectorSolucion(tablon, vect_sol_var, vect_sol_val){//inicializa en vector de la solucion y sus valores
    num_rest = tablon.length-1;
    num_var = tablon[0].length-num_rest-1;
    for(var i=0; i<num_rest; i++){
        vect_sol_var[i] = "X"+(num_var+i+1);
        vect_sol_val[i] = 0;
    }
}

function VectorSolucion(vect_sol_var, minLD, maxFO){//se guarda en vector solucion
    vect_sol_var[minLD[1]] = "X"+(maxFO[1]+1);
}

function VectorSolucionValores(tablon, vect_sol_val){//se guardan los valores del vector solucion
    num_rest = tablon.length-1;
    num_var = tablon[0].length-num_rest-1;
    for(var i=0; i<num_rest; i++){
        vect_sol_val[i] = tablon[i+1][tablon[0].length-1];
    }
}

function simplex(tablon, vect_sol_var, error){
    let maxFO = [];
    let LD_xmax = [];
    let tablon_aux = [];
    let minLD = [];
    
    encontarMax(tablon, maxFO);

    if(maxFO[0] != 0){
        
        dividirLD(tablon, maxFO, LD_xmax);
        
        encontarMin(LD_xmax, minLD, error);

        if(error[0] === 0){

            let pivote = tablon[minLD[1] + 1][maxFO[1]];

            pivotear(tablon, tablon_aux, maxFO, minLD, pivote);

            tablon = tablon_aux;
            
            VectorSolucion(vect_sol_var, minLD, maxFO);
        }if(error[0] === 1){
            

            for (let i = 0; i < tablon.length-1 + 1; i++) {
                let array_aux = [];
                for (let j = 0; j < tablon[0].length-tablon.length + (tablon.length-1) + 1; j++) {
                    array_aux.push(-1);
                }
                tablon_aux.push(array_aux);
            }
            tablon = tablon_aux;
        }

        return tablon;
    }if(maxFO[0] === 0){

        tablon[0][tablon[0].length-1] = -tablon[0][tablon[0].length-1];

        return tablon;
        
    }
    
}


const simplexCompleto = (tablon) => {
    let error = [0];

    let vect_sol_var = [];
    let vect_sol_val = [];

    let tableau = {//Objeto tableau
        matriz: [],
        vector_variables: [],
        vector_valores: [],
        solucion: 0,
        indicador: 0    //0 = si hay solucion, 1 = solucion no acotada, 2 = solucion igual a 0 o que no tiene solucion
    };

    tablon = tablonBigM(tablon);

    generarVectorSolucion(tablon, vect_sol_var, vect_sol_val);

    while(Math.max(...tablon[0])>0){
        tablon = simplex(tablon, vect_sol_var, error);
    };

    if(error[0] === 0){
        VectorSolucionValores(tablon, vect_sol_val);
    }else{
        tableau.indicador = 1;
    }

    tableau.matriz = tablon;
    tableau.vector_variables = vect_sol_var;
    tableau.vector_valores = vect_sol_val;
    tableau.solucion = -tablon[0][tablon[0].length-1];

    if(tableau.solucion === 0){
        tableau.indicador = 2;
    }
    
    console.log(tableau)
    return tableau;

}


