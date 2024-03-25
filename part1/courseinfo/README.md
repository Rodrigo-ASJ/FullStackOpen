## 1.1: información del curso, paso 1

La aplicación en la que comenzaremos a trabajar en este ejercicio se desarrollará más a fondo en algunos de los siguientes ejercicios. En este y otros conjuntos de ejercicios futuros de este curso, es suficiente enviar solo el estado final de la aplicación. Si lo desea, también puedes crear un commit para cada ejercicio de la serie, pero esto es completamente opcional.

Usa Vite para inicializar una nueva aplicación. Modifica main.jsx y App.jsx, elimina los archivos adicionales App.css, y index.css, y el directorio assets.

Desafortunadamente, toda la aplicación está en el mismo componente. Refactoriza el código para que conste de tres componentes nuevos: Header, Content y Total. Todos los datos aún residen en el componente App, que pasa los datos necesarios a cada componente mediante props. Header se encarga de representar el nombre del curso, Content representa las partes y su número de ejercicios y Total representa el número total de ejercicios.

Define los nuevos componentes en el archivo App.jsx.

## 1.2: información del curso, paso 2

Refactoriza el componente Content para que no muestre ningún nombre de partes o su número de ejercicios por sí mismo. En su lugar, solo representa tres componentes Part de los cuales cada uno representa el nombre y el número de ejercicios de una parte.

## 1.3: información del curso, paso 3

Avancemos para usar objetos en nuestra aplicación. Modifica las definiciones de las variables del componente App de la siguiente manera y también refactoriza la aplicación para que siga funcionando

## 1.4: información del curso paso 4

Y luego coloca los objetos en un array. Modifica las definiciones de las variables de App de la siguiente forma y modifica las otras partes de la aplicación en respectivamente

## 1.5: información del curso paso 5

Llevemos los cambios un paso más allá. Cambia el curso y sus partes a un solo objeto JavaScript. Arregla todo lo que se rompa.
