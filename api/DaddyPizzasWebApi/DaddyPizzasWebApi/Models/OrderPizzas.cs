using System.ComponentModel.DataAnnotations.Schema;

namespace DaddyPizzasWebApi.Models
{
    public class OrderPizzas
    {
        public int id { get; set; }
        [ForeignKey("Pizzas")]
        public int idPizza { get; set; }
        [ForeignKey("Orders")]
        public int idOrder { get; set; }
        public int count { get; set; }
    }
}
