const grid = new Muuri('.grid', {
    layout: {
        rounding: false
    }
});

//Evento al cargar la pagina
window.addEventListener('load', () => {
    //Lo hacemos responsive
    grid.refreshItems().layout();
    //Agregamos la clase imagenes-cargadas a los elementos con clase grid
    document.getElementById('grid').classList.add('imagenes-cargadas');

    //Recuperamos los elementos a que tengan la clase categorias
    const enlaces = document.querySelectorAll('#categorias a');

    enlaces.forEach((enlace) => {
        //Agregamos el evento del click de las categorias
        enlace.addEventListener('click', (ev) => {
            //Evitamos el comportamiento por default del navegador
            ev.preventDefault();
            //Recorremos la lista con cada enlace para quitar la clase activo que por default esta en 'todos'
            enlaces.forEach((enl) => {
                enl.classList.remove('activo');
            });
            //Despues se agrega al link que fue clickeado
            ev.target.classList.add('activo');

            //Recuperamos el dato de la etiqueta que fue clickeado
            const categoria = ev.target.innerHTML.toLowerCase();

            //Si es igual a todos, que muestre los elementos con atributo 'data-categoria' y si no que se filtre
            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"] `);
        });
    });

    //Agregamos el listener para la barra de busqueda
    busqueda = document.querySelector('#barra-busqueda').addEventListener('input', (ev) => {
        const busqueda = ev.target.value.toLowerCase();

        grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda));
    });


    //Listener para el click de las imagenes
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((elem) => {


        elem.addEventListener('click', (ev) => {

            const ruta = elem.getAttribute('src');
            const desc = elem.parentNode.parentNode.dataset.descripcion;
            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('.descripcion').innerHTML = desc;
        });

    });


    //Listener para cerrar el popup
    document.querySelector('.overlay #btn-cerrar-popup').addEventListener('click', () => {
        overlay.classList.remove('activo');
        
    });

    //Eventlistener
    overlay.addEventListener('click', (ev) => {
        ev.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    } );

});