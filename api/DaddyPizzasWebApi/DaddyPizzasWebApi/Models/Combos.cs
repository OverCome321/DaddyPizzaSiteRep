using System.ComponentModel.DataAnnotations.Schema;

namespace DaddyPizzasWebApi.Models
{
    public class Combos
    {
        public int id { get; set; }
        public string name { get; set; }
        public string desription { get; set; }
        public DateTime createDate { get; set; }
        public double price { get; set; }
        [ForeignKey("Categories")]
        public int idCategory { get; set; }
    }
}
