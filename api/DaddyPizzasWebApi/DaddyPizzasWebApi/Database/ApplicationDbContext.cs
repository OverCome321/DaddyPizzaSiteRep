using Microsoft.EntityFrameworkCore;
using DaddyPizzasWebApi.Models;

namespace DaddyPizzasWebApi.DataBase
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Roles> Roles { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Toppings> Toppings { get; set; }
        public DbSet<Categories> Categories { get; set; }
        public DbSet<Pizzas> Pizzas { get; set; }
        public DbSet<PizzasToppings> PizzasToppings { get; set; }
        public DbSet<Orders> Orders { get; set; }
        public DbSet<OrderPizzas> OrderPizzas { get; set; }
        public DbSet<Histories> Histories { get; set; }
        public DbSet<Combos> Combos { get; set; }
        public DbSet<ComboItems> ComboItems { get; set; }
        public DbSet<OrderCombos> OrderCombos { get; set; }
        public DbSet<Baskets> Baskets { get; set; }
        public DbSet<BasketItemsPizzas> BasketItemsPizzas { get; set; }
        public DbSet<BasketItemsCombos> BasketItemsCombos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pizzas>(entity =>
            {
                entity.Property(e => e.idCategory)
                      .HasColumnName("idCategory");
            });
            base.OnModelCreating(modelBuilder);

        }
    }
}
