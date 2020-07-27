using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Model.Models;

namespace WebApplication1.Model.Context
{
    public class ApplicationUsersContext : IdentityDbContext<User, Role, string>
    {
        public ApplicationUsersContext(DbContextOptions<ApplicationUsersContext> options) : base(options)
        {

        }

        public DbSet<User> ApplicationUsers { get; set; }

    }
}
