namespace DaddyPizzasWebApi.Models
{
    public class BasketItemsPizzas
    {
        public int id { get; set; }
        public int idBasket { get; set; }
        public int idPizza { get; set; }
        public int count { get; set; }
    }
}
