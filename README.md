# laboratorio-javascript
## Algunas preguntas que surgieron durante el laboratorio:
### ¿Qué ventajas trae implementar código JS en funciones anónimas?<br>
R: Permite generar un nuevo scope/namespace, y de esta manera manter las variables y métodos definidos en un scope aparte del scope global.

¿Cuál es la diferencia entre las palabras reservadas self y this dentro de la definición de un prototipo como se hizo en el proyecto de Ping Pong?<br>
R: 'self' vincula al prototipo con el scope global, aunque esté definido en el scope de la función anónima.
'this', por su parte, hace referencia a los atributos del prototipo (análogo a los atributos de clase en POO).

¿Por qué es importante el manejo de basuras y cómo procurar que nuestro código permita al navegador manejar las basuras de forma adecuada?<br>
R: El manejo de basuras permite mantener la memoria del navegador con la menor carga de datos posible, almacenando solo lo que el código necesita.
Se debe procurar no tener código ligado a variables que cambian constantemente y que la información almacena con anterioridad no se va a necesitar después.
Para esto, hacer una copia de la información o sobre escribir la variable, para que el manejador de basuras desecha la información que no se está usando.


