using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DaddyPizzasWebApi.DataBase;
using DaddyPizzasWebApi.Models;

namespace DaddyPizzasWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ComboItemsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ComboItemsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ComboItems>>> GetComboItems()
        {
            return await _context.ComboItems.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ComboItems>> GetComboItem(int id)
        {
            var comboItem = await _context.ComboItems.FindAsync(id);

            if (comboItem == null)
            {
                return NotFound();
            }

            return comboItem;
        }

        [HttpPost]
        public async Task<ActionResult<ComboItems>> PostComboItem(ComboItems comboItem)
        {
            _context.ComboItems.Add(comboItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetComboItem", new { id = comboItem.id }, comboItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutComboItem(int id, ComboItems comboItem)
        {
            if (id != comboItem.id)
            {
                return BadRequest();
            }

            _context.Entry(comboItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.ComboItems.Any(e => e.id == id))
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
        public async Task<IActionResult> DeleteComboItem(int id)
        {
            var comboItem = await _context.ComboItems.FindAsync(id);
            if (comboItem == null)
            {
                return NotFound();
            }

            _context.ComboItems.Remove(comboItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
