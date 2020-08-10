using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Data;
using static WebApplication1.Models.EnumClass;

namespace WebApplication1.Models
{
    public class User : IdentityUser
    {
        public string Fullname { get; set; }
        public string Address { get; set; }
        public RoleType Role { get; set; }
        public bool Activated { get; set; }
    }

    public class VerifyService
    {
        public MyContextBase2020 Context { get; set; }
        public VerifyService(IConfiguration config)
        {
            var options = new DbContextOptionsBuilder<MyContextBase2020>()
                .UseSqlServer(config.GetConnectionString("mydb")).Options;
            Context = new MyContextBase2020(options);
        }

        public void Verify(User user)
        {
            user.EmailConfirmed = true;
            Context.Update(user);
            Context.SaveChanges();
        }
    }
}
