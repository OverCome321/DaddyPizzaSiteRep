using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DaddyPizzasWebApi.DataBase;
using DaddyPizzasWebApi.Models;

namespace DaddyPizzasWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderCombosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderCombosController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderCombos>>> GetOrderCombos()
        {
            return await _context.OrderCombos.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderCombos>> GetOrderCombo(int id)
        {
            var orderCombo = await _context.OrderCombos.FindAsync(id);

            if (orderCombo == null)
            {
                return NotFound();
            }

            return orderCombo;
        }

        [HttpPost]
        public async Task<ActionResult<OrderCombos>> PostOrderCombo(OrderCombos orderCombo)
        {
            _context.OrderCombos.Add(orderCombo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrderCombo", new { id = orderCombo.id }, orderCombo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderCombo(int id, OrderCombos orderCombo)
        {
            if (id != orderCombo.id)
            {
                return BadRequest();
            }

            _context.Entry(orderCombo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.OrderCombos.Any(e => e.id == id))
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
        public async Task<IActionResult> DeleteOrderCombo(int id)
        {
            var orderCombo = await _context.OrderCombos.FindAsync(id);
            if (orderCombo == null)
            {
                return NotFound();
            }

            _context.OrderCombos.Remove(orderCombo);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
