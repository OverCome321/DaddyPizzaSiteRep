using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DaddyPizzasWebApi.DataBase;
using DaddyPizzasWebApi.Models;

namespace DaddyPizzasWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PizzasToppingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PizzasToppingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PizzasToppings>>> GetPizzasToppings()
        {
            return await _context.PizzasToppings.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PizzasToppings>> GetPizzasTopping(int id)
        {
            var pizzasTopping = await _context.PizzasToppings.FindAsync(id);

            if (pizzasTopping == null)
            {
                return NotFound();
            }

            return pizzasTopping;
        }

        [HttpPost]
        public async Task<ActionResult<PizzasToppings>> PostPizzasTopping(PizzasToppings pizzasTopping)
        {
            _context.PizzasToppings.Add(pizzasTopping);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPizzasTopping", new { id = pizzasTopping.id }, pizzasTopping);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPizzasTopping(int id, PizzasToppings pizzasTopping)
        {
            if (id != pizzasTopping.id)
            {
                return BadRequest();
            }

            _context.Entry(pizzasTopping).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.PizzasToppings.Any(e => e.id == id))
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
        public async Task<IActionResult> DeletePizzasTopping(int id)
        {
            var pizzasTopping = await _context.PizzasToppings.FindAsync(id);
            if (pizzasTopping == null)
            {
                return NotFound();
            }

            _context.PizzasToppings.Remove(pizzasTopping);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
