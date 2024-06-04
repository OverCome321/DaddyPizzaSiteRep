using DaddyPizzasWebApi.Models;

namespace DaddyPizzasWebApi.ViewModels
{
    public class CartItem
    {
        public Pizzas Pizza { get; set; }
        public int Quantity { get; set; }
    }
}
