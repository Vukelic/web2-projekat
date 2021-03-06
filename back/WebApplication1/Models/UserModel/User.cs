﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Data;
using WebApplication1.Models.CarAdmin;

namespace WebApplication1.Models
{
    public class User : IdentityUser
    {
        public string Fullname { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public bool Activated { get; set; }
        public int Points { get; set; }
        public bool IsAdmin { get; set; }
        public int CarCompanyId { get; set; }

        public ICollection<ReservationCar> ReservationCars { get; set; }

        public User()
        {

        }


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
