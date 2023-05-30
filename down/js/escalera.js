function escalera(numero) {
	var array=[];
	var linea="";
 
	for(var i=1;i<=numero;i++) {
 
		linea="";
 
		for(var j=1;j<=numero;j++) {
 
			if(j>numero-i) {
				linea+="#";
			} else{
				linea+=" ";
			}
		}
		array.push(linea);
	}
 
	return array;
}
escalera(3);
escalera(5);