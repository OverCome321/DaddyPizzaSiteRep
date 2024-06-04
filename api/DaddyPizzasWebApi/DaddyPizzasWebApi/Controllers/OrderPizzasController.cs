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

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderPizzas>> GetOrderPizza(int id)
        {
            var orderPizza = await _context.OrderPizzas.FindAsync(id);

            if (orderPizza == null)
            {
                return NotFound();
            }

            return orderPizza;
        }

        [HttpPost]
        public async Task<ActionResult<OrderPizzas>> PostOrderPizza(OrderPizzas orderPizza)
        {
            _context.OrderPizzas.Add(orderPizza);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrderPizza", new { id = orderPizza.id }, orderPizza);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderPizza(int id, OrderPizzas orderPizza)
        {
            if (id != orderPizza.id)
            {
                return BadRequest();
            }

            _context.Entry(orderPizza).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.OrderPizzas.Any(e => e.id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderPizza(int id)
        {
            var orderPizza = await _context.OrderPizzas.FindAsync(id);
            if (orderPizza == null)
            {
                return NotFound();
            }

            _context.OrderPizzas.Remove(orderPizza);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
