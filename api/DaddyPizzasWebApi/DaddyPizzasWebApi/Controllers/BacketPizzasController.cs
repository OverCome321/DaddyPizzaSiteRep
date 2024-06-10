using DaddyPizzasWebApi.DataBase;
using DaddyPizzasWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DaddyPizzasWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BacketPizzasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BacketPizzasController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BasketItemsPizzas>>> GetBasketItemPizzas()
        {
            return await _context.BasketItemsPizzas.ToListAsync();
        }

        [HttpGet("{idBasket}")]
        public async Task<ActionResult<IEnumerable<BasketItemsPizzas>>> GetBasketItemsByBasketId(int idBasket)
        {
            var basketItems = await _context.BasketItemsPizzas
                .Where(item => item.idBasket == idBasket)
                .ToListAsync();

            if (basketItems == null)
            {
                return NotFound();
            }

            return basketItems;
        }

        [HttpPost]
        public async Task<IActionResult> PostBasketItemPizza(BasketItemsPizzas basketItem)
        {
            try
            {
                var existingItem = await _context.BasketItemsPizzas
                    .FirstOrDefaultAsync(b => b.idBasket == basketItem.idBasket && b.idPizza == basketItem.idPizza);

                if (existingItem != null)
                {
                    existingItem.count += basketItem.count;
                    _context.BasketItemsPizzas.Update(existingItem);
                }
                else
                {
                    _context.BasketItemsPizzas.Add(basketItem);
                }

                await _context.SaveChangesAsync();
                return Ok("Item added/updated successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Failed to add/update item in the basket");
            }
        }
        [HttpDelete("{idBasket}/{idPizza}")]
        public async Task<IActionResult> DeleteBasketItemPizza(int idBasket, int idPizza)
        {
            var existingItem = await _context.BasketItemsPizzas
                .FirstOrDefaultAsync(b => b.idBasket == idBasket && b.idPizza == idPizza);

            if (existingItem == null)
            {
                return NotFound();
            }

            if (existingItem.count > 1)
            {
                existingItem.count -= 1;
                _context.BasketItemsPizzas.Update(existingItem);
            }
            else
            {
                _context.BasketItemsPizzas.Remove(existingItem);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpDelete("{idBasket}")]
        public async Task<IActionResult> DeleteAllBasketItems(int idBasket)
        {
            var basketItems = await _context.BasketItemsPizzas
                .Where(b => b.idBasket == idBasket)
                .ToListAsync();

            if (basketItems == null || !basketItems.Any())
            {
                return NotFound();
            }

            _context.BasketItemsPizzas.RemoveRange(basketItems);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
