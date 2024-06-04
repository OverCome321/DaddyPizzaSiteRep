using System.ComponentModel.DataAnnotations.Schema;

namespace DaddyPizzasWebApi.Models
{
    public class Pizzas
    {
        public int id { get; set; }
        public string name { get; set; }
        public string size { get; set; }
        public double price { get; set; }
        public string description { get; set; }
        [ForeignKey("Categories")]
        public int idCategory { get; set; }
        public DateTime createDate { get; set; }
    }
}
