using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DaddyPizzasWebApi.DataBase;
using DaddyPizzasWebApi.Models;

namespace DaddyPizzasWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HistoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HistoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Histories>>> GetHistories()
        {
            return await _context.Histories.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Histories>> GetHistory(int id)
        {
            var history = await _context.Histories.FindAsync(id);

            if (history == null)
            {
                return NotFound();
            }

            return history;
        }

        [HttpPost]
        public async Task<ActionResult<Histories>> PostHistory(Histories history)
        {
            _context.Histories.Add(history);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHistory", new { id = history.id }, history);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutHistory(int id, Histories history)
        {
            if (id != history.id)
            {
                return BadRequest();
            }

            _context.Entry(history).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Histories.Any(e => e.id == id))
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
        public async Task<IActionResult> DeleteHistory(int id)
        {
            var history = await _context.Histories.FindAsync(id);
            if (history == null)
            {
                return NotFound();
            }

            _context.Histories.Remove(history);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
