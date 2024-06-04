using System.ComponentModel.DataAnnotations.Schema;

namespace DaddyPizzasWebApi.Models
{
    public class OrderCombos
    {
        public int id { get; set; }
        [ForeignKey("Combos")]
        public int idCombo { get; set; }
        [ForeignKey("Orders")]
        public int idOrder { get; set; }
        public int count { get; set; } 
    }
}
