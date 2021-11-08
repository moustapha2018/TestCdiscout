/**
 * Cette fonction permet de concatener tous les jsons se trouvant dans allDatta et retourner le json attendu
 * @param {*} allData tableau contenant les jsons à concatener
 * @returns Elle retourne le json attendu (JSON_OUPTPUT)
 */
 function prepareJsonOutput(allData = [], keysRemove = []){
  personData = {}

  for(var i = 0; i< allData.length; i++){
    personData = fusionJsons(personData, allData[i]);
  }

  removeOtherKeys(personData, keysRemove)

  return {"person" : personData } 
}


/**
 * Cette fonction permet de concatener les deux (jsons) 
 * @param {*} firstJson premier json à concaténer 
 * @param {*} secondJson le déuxième json à concatener
 * @returns Elle retourne un json contenant le résultat des deux jsons
 */
function fusionJsons(firstJson, secondJson) {
  if(!isObjEmpty(firstJson)){

    for (var key in secondJson) {           
      if(Array.isArray(firstJson[key])){

        for (var val in secondJson[key]  ){
          if(!firstJson[key].includes(secondJson[key][val])){
            firstJson[key].push(parseInt(secondJson[key][val]))
            firstJson[key].sort()
            
          }
        }  

      }else if(typeof (firstJson[key]) === "object"){
        firstJson[key] = Object.assign(secondJson[key], firstJson[key])
        sortKeysObject(firstJson[key])
       

      }else if(isColor(firstJson[key]) && isColor(secondJson[key])){
        var mixedColor = getResultMixColor(colorToHex(secondJson[key]), colorToHex(firstJson[key]), 75);
        //les fonctions getResultMixColor(), colorToHex() se trouve dans le fichier color.js
        firstJson[key] = ntc.name(mixedColor)[1]

      }
    }
  }else{

    for (var key in secondJson) {
      firstJson[key] = secondJson[key]
    }
  }

  return firstJson;
}


/**
 * Cette fonction permet de verifier si un objet est vide
 * @param {*} objet est l'objet
 * @returns Elle retourne true si l'objet est vide sinon elle retourne false
 */
function isObjEmpty(objet) {
  for (var p in objet) {
    if (objet.hasOwnProperty(p)) return false;
  }

  return true;
}


/**
 * Cette fonction permet de supprimer les variables (clés de jsons) qu'on ne souhaite pas avoir dans le json de sortie(JSON_OUTPUT)
 * @param {*} data est le json de sortie(JSON_OUTPUT) autrement dit attendu
 * @param {*} keysRemove est le tableau qui contient les variables(clés) à supprimer dans le json de sortie
 */
function removeOtherKeys(data, keysRemove){
  Object.keys(data).forEach(function(key){
    for (i = 0; i < keysRemove.length; i++){
      delete data[keysRemove[i]];
    }
  });
}


/**
 * Cette fonction Permet de verifier si une chaine de caractère est une couleur
 * @param {*} strColor est la chaine de caractère
 * @returns Elle retourne true si la chaine de caractère est une couleur sinon elle retourne false
 */
function isColor(strColor){
  var s = new Option().style;
  s.color = strColor;
  return s.color == strColor;
}


/**
 * Fonction qui permet de trier un objet
 * @param {*} objet objet à trier
 * @returns Elle retourne un ojet trié
 * 
 */
function sortKeysObject(objet) {
  var key = Object.keys(objet)
    .sort(function order(firstKey, secondKey) {
        if (firstKey < secondKey) return -1;
        else if (firstKey > secondKey) return +1;
        else return 0;
    }); 
    
  var inter = {}; //objet intermédiaire
    
  for (var i = 0; i < key.length; i++) {
      inter[key[i]] = objet[key[i]];
      delete objet[key[i]];
  } 

  // copier l'objet inter dans l'objet original.
  for (var i = 0; i < key.length; i++) {
    objet[key[i]] = inter[key[i]];
  } 
  return objet;
}

