using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DaddyPizzasWebApi.DataBase;
using DaddyPizzasWebApi.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DaddyPizzasWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly string _jwtSecret = "user_secret_key_will_be_generate";
        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("byEmail")]
        public async Task<ActionResult<Users>> GetUserByEmail(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.email == email);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
        [HttpPost]
        public async Task<ActionResult<Users>> RegisterPostQuerry(Users user)
        {
            if (_context.Users.Any(u => u.email == user.email))
            {
                return BadRequest("Пользователь с таким email уже существует.");
            }

            try
            {
                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.password);
                user.password = hashedPassword;
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                var token = GenerateJwtToken(user);

                return Ok(new { user, token });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ошибка при регистрации: {ex.Message}");
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, Users user)
        {
            if (id != user.id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Users.Any(e => e.id == id))
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
        public async Task<IActionResult> DeleteUser(int id)
        {
            var BasketId = await _context.Baskets.FindAsync(id);
            if (BasketId == null) return NotFound();

            var itemsToRemovePizzas = _context.BasketItemsPizzas.Where(x => x.idBasket == BasketId.id).ToList();
            if (itemsToRemovePizzas.Any())
            {
                _context.BasketItemsPizzas.RemoveRange(itemsToRemovePizzas);
                await _context.SaveChangesAsync();
            }

            var itemsToRemoveComboes = _context.BasketItemsCombos.Where(x => x.idBasket == BasketId.id).ToList();
            if (itemsToRemoveComboes.Any())
            {
                _context.BasketItemsCombos.RemoveRange(itemsToRemoveComboes);
                await _context.SaveChangesAsync();
            }

            _context.Baskets.Remove(BasketId);
            await _context.SaveChangesAsync();
            
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("current")]
        public ActionResult<Users> GetCurrentUser()
        {
            var user = CurrentUser.user;

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
        [HttpGet("login")]
        public async Task<ActionResult<bool>> Login(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.email == email);

            if (user != null && BCrypt.Net.BCrypt.Verify(password, user.password))
            {
                var token = GenerateJwtToken(user);
                return Ok(new { user, token });
            }
            else return NotFound("Неверный email или пароль.");
        }
        private string GenerateJwtToken(Users user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.email),
                }),
                Expires = DateTime.UtcNow.AddDays(7), 
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
