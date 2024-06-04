using System.ComponentModel.DataAnnotations.Schema;

namespace DaddyPizzasWebApi.Models
{
    public class ComboItems
    {
        public int id { get; set; }
        [ForeignKey("Combos")]
        public int idCombo { get; set; }
        [ForeignKey("Pizzas")]
        public int idPizza { get; set; }
    }
}
