using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DaddyPizzasWebApi.Models
{
    public class Orders
    {
        public int id { get; set; }
        public DateTime dateOrder { get; set; }
        public string status { get; set; }
        [ForeignKey("Users")]
        public int idUser { get; set; }
    }
}
