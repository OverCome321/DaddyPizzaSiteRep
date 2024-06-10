using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DaddyPizzasWebApi.DataBase;
using DaddyPizzasWebApi.Models;

namespace DaddyPizzasWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderPizzasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderPizzasController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderPizzas>>> GetOrderPizzas()
        {
            return await _context.OrderPizzas.ToListAsync();
        }

        [HttpGet("{idOrder}")]
        public async Task<ActionResult<IEnumerable<OrderPizzas>>> GetOrderPizzasByOrderId(int idOrder)
        {
            var orderPizzas = await _context.OrderPizzas
                                            .Where(op => op.idOrder == idOrder)
                                            .ToListAsync();

            if (orderPizzas == null)
            {
                return NotFound();
            }

            return orderPizzas;
        }


        [HttpPost]
        public async Task<ActionResult<OrderPizzas>> PostOrderPizza(OrderPizzas orderPizza)
        {
            try
            {
                _context.OrderPizzas.Add(orderPizza);
                await _context.SaveChangesAsync();

                // Убедитесь, что маршрут и параметры указаны правильно
                return CreatedAtAction(nameof(GetOrderPizzasByOrderId), new { idOrder = orderPizza.idOrder }, orderPizza);
            }
            catch (Exception ex)
            {
                // Логирование ошибки
                Console.WriteLine($"Error adding pizza to order: {ex.Message}");
                // Возвращаем ошибку сервера с сообщением
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpDelete("{orderId}")]
        public async Task<IActionResult> DeleteOrderPizzasByOrderId(int orderId)
        {
            var orderPizzas = await _context.OrderPizzas
                                          .Where(op => op.idOrder == orderId)
                                          .ToListAsync();

            if (orderPizzas == null || !orderPizzas.Any())
            {
                return NotFound();
            }

            _context.OrderPizzas.RemoveRange(orderPizzas);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
