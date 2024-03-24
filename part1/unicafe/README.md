## 1.6: unicafe, paso 1

Como la mayoría de las empresas, Unicafe recopila comentarios de sus clientes. Tu tarea es implementar una aplicación web para recopilar comentarios de los clientes. Solo hay tres opciones para los comentarios: good (bueno), neutral y bad(malo).

La aplicación debe mostrar el número total de comentarios recopilados para cada categoría. Tu aplicación final podría verse así:

![referencia](./public/13e.png)

Ten en cuenta que tu aplicación debe funcionar solo durante una única sesión del navegador. Una vez que se actualice la página, los comentarios recopilados pueden desaparecer.

### 1.7: unicafe, paso 2

Amplía tu aplicación para que muestre más estadísticas sobre los comentarios recopilados: el número total de comentarios recopilados, la puntuación promedio (buena: 1, neutral: 0, mala: -1) y el porcentaje de comentarios positivos.

![referencia2](https://fullstackopen.com/static/0a5d15ae9f055a15cb469b9c9223df41/5a190/14e.png)

### 1.8: unicafe, paso 3

Refactoriza tu aplicación para que la visualización de las estadísticas se extraiga en su propio componente Statistics. El estado de la aplicación debe permanecer en el componente raíz App.

### 1.9: unicafe paso 4
Cambia tu aplicación para mostrar estadísticas solo una vez que se hayan recopilado los comentarios.

![Cambia tu aplicación para mostrar estadísticas solo una vez que se hayan recopilado los comentarios.](https://fullstackopen.com/static/b453d7533ae85dcaf3eccf342a353c58/5a190/15e.png)

### 1.10: unicafe paso 5
Continuemos refactorizando la aplicación. Extrae los siguiente dos componentes:
- Button para definir los botones utilizados para enviar comentarios
- StatisticLine para mostrar una única estadística, por ejemplo, la puntuación media.

### 1.11*: unicafe, paso 6
Muestra las estadísticas en una tabla HTML, de modo que tu la aplicación se ve más o menos así:
![recurso](https://fullstackopen.com/static/a74acccc17aafb02b3801ffa1fcc0fdc/5a190/16e.png)

