<script>
/*Dado un array, quitar elementos repetidos
El concepto puede ser fácilmente generalizado para tareas en el mundo real. 
Por ejemplo: si necesitas esclarecer estadísticas removiendo elementos de baja frecuencia (ruido).
*/

var miArray=new Array();
miArray[0]=200;
miArray[1]=40;
miArray[2]=400;
miArray[3]=40;
miArray[4]=40;

var resultado=new Array();


for(i=0;i<miArray.length;i++)
{
	if (isUnique(miArray,miArray[i]))  resultado.push(miArray[i]);
	
}

function isUnique(arr, el) {
    var hasOne = false;
    for (let item of arr) {
        if (item === el) {
            if (hasOne) {
                return false;
            } else {
                hasOne = true;
            }
        }
    }
    return true;
}


for(i=0;i<resultado.length;i++) document.write(" "+resultado[i]);
</script>