using DaddyPizzasWebApi.DataBase;
using DaddyPizzasWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DaddyPizzasWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BasketItemsPizzasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BasketItemsPizzasController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BasketItemsPizzas>>> GetBasketItemPizzas()
        {
            return await _context.BasketItemsPizzas.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BasketItemsPizzas>> GetBasketItemPizza(int id)
        {
            var basketItem = await _context.BasketItemsPizzas.FindAsync(id);

            if (basketItem == null)
            {
                return NotFound();
            }

            return basketItem;
        }

        [HttpPost]
        public async Task<ActionResult<BasketItemsPizzas>> PostBasketItemPizza(BasketItemsPizzas basketItem)
        {
            _context.BasketItemsPizzas.Add(basketItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBasketItemPizza), new { id = basketItem.id }, basketItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBasketItemPizza(int id, BasketItemsPizzas basketItem)
        {
            if (id != basketItem.id)
            {
                return BadRequest();
            }

            _context.Entry(basketItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.BasketItemsPizzas.Any(e => e.id == id))
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
        public async Task<IActionResult> DeleteBasketItemPizza(int id)
        {
            var basketItem = await _context.BasketItemsPizzas.FindAsync(id);
            if (basketItem == null)
            {
                return NotFound();
            }

            _context.BasketItemsPizzas.Remove(basketItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
