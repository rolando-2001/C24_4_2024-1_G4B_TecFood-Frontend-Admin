// Importaciones necesarias
import { parseISO, format } from 'date-fns';

// Función para formatear y convertir las fechas en un array de objetos
export const convertEventsToDateEvents = (dish = []) => {
    console.log(dish);

    return dish.map(event => {
        // Convierte la cadena order_date a un objeto Date usando parseISO
        const parsedDate = parseISO(event.order_date);

        // Formatea la fecha a dd/MM/yyyy HH:mm:ss
        event.order_date = format(parsedDate, 'dd/MM/yyyy HH:mm:ss');

        console.log(event.order_date); // Muestra la fecha formateada en la consola
        return event;
    });
};

export const  formatAmount=(amount) =>{
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
    }).format(amount);
    
  }
