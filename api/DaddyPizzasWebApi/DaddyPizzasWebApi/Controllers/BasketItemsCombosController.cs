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
    public class BasketItemsCombosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BasketItemsCombosController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BasketItemsCombos>>> GetBasketItemCombos()
        {
            return await _context.BasketItemsCombos.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BasketItemsCombos>> GetBasketItemCombo(int id)
        {
            var basketItem = await _context.BasketItemsCombos.FindAsync(id);

            if (basketItem == null)
            {
                return NotFound();
            }

            return basketItem;
        }

        [HttpPost]
        public async Task<ActionResult<BasketItemsCombos>> PostBasketItemCombo(BasketItemsCombos basketItem)
        {
            _context.BasketItemsCombos.Add(basketItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBasketItemCombo), new { id = basketItem.id }, basketItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBasketItemCombo(int id, BasketItemsCombos basketItem)
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
                if (!_context.BasketItemsCombos.Any(e => e.id == id))
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
        public async Task<IActionResult> DeleteBasketItemCombo(int id)
        {
            var basketItem = await _context.BasketItemsCombos.FindAsync(id);
            if (basketItem == null)
            {
                return NotFound();
            }

            _context.BasketItemsCombos.Remove(basketItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
