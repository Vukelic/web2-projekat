using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;
using WebApplication1.Models.CarAdmin;

namespace WebApplication1.Data
{
    public class MyContextBase2020 : IdentityDbContext
    {
        public MyContextBase2020(DbContextOptions options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<CarCompany> CarCompanies { get; set; }
        public DbSet<Car> Cars { get; set; }

        public DbSet<ReservationCar> Reservations { get; set; }
        public DbSet<Date> Dates { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        }
    }
}
