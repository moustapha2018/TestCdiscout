function getResultMixColor(color_1, color_2, weight) {
    function d2h(d) { return d.toString(16); }  //permet de convertir un décimal en héxadécimal
    function h2d(h) { return parseInt(h, 16); } // permet de convert un hexa decimal en décimal
  
    weight = (typeof(weight) !== 'undefined') ? weight : 50;
  
    var color = "#";
  
    for(var i = 0; i <= 5; i += 2) { // boucle à travers chacune des 3 paires hexagonales (rouge, vert et bleu)
      var v1 = h2d(color_1.substr(i, 2)), // extraire les pairs actuels
          v2 = h2d(color_2.substr(i, 2)),
          
          // combiner les paires actuelles de chaque couleur source, selon le poids spécifié
          val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0))); 
  
      while(val.length < 2) { val = '0' + val; } // ajouter un '0' si val donne un seul chiffre
      
      color += val; // concaténer la valeur à notre nouvelle chaîne de couleur
    }
      
    return color; 
};

/**
 * Cette fonction permet de convertir la couleur css en hexadécimal
 * @param {*} color 
 * @returns 
 */
function colorToHex(color) {
    var rgba, hex;

    rgba = colorToRGBA(color);

    hex = [0,1,2].map(
        function(idx) { return byteToHex(rgba[idx]); }
        ).join('');
    return hex;
}


/**
 * Cette fonction Renvoie la couleur sous la forme d'un tableau de [r, g, b, a] -- tous compris entre 0 et 255
 * @param {*} color 
 * @returns 
 */
function colorToRGBA(color) {
    //convertir la couleur en RGBA et la color doit être un canevas valide comme même si la couleur est hexadécimal ça marchera
    var cvs, ctx;
    cvs = document.createElement('canvas');
    cvs.height = 1;
    cvs.width = 1;
    ctx = cvs.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    return ctx.getImageData(0, 0, 1, 1).data;
}

function byteToHex(num) {
    // Transforme un nombre (0-255) en un nombre hexadécimal à 2 caractères (00-ff)
    return ('0'+num.toString(16)).slice(-2);
}