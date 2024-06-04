using System.ComponentModel.DataAnnotations.Schema;

namespace DaddyPizzasWebApi.Models
{
    public class Users
    {
        public int id { get; set; }
        public string email { get; set; }
        public string password { get; set; }

        [ForeignKey("Role")] // указываем имя столбца внешнего ключа
        public int idRole { get; set; }

        public string adress { get; set; }
        public DateTime createDate { get; set; }
    }
}
