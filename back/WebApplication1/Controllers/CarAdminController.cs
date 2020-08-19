using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarAdminController : ControllerBase
    {
        private readonly MyContextBase2020 _dbcontext;
        private UserManager<User> _userManager;

        public CarAdminController(MyContextBase2020 _Dbcontext, UserManager<User> userManager)
        {
            _dbcontext = _Dbcontext;
            _userManager = userManager;
        }

        [HttpGet]
        [Route("GetAllCompanies")]
        public async Task<List<CarCompany>> GetAllCompanies()
        {
            return await _dbcontext.CarCompanies.ToListAsync();         
        }

        [HttpPost]
        [Route("AddCar")]
        public async Task<IActionResult> AddCar([FromBody] CarModel model)
        {
          //  var cm = await _dbcontext.Cars.FindAsync(model.NameOfCompany);

         //   if (cm == null)
        //    {
       //        var cmm = new CarModel()
       //        {
                    //    FullName = model.Cadmin.FullName,
                    //     Email = model.Cadmin.Email,
                    //   Address = model.Cadmin.Address,
                    //   Phone = model.Cadmin.Phone,
                    //   Role = "web_admin",
                    //   Username = model.Cadmin.Username
          //      };

                //     model.Cadmin = adminModel;
         //   }

            Car cmodel = new Car()
            {
                Description = model.Description,
                ModelOfCar = model.ModelOfCar,
                NumberOfSeats = Convert.ToInt32(model.NumberOfSeats),
                Price = Convert.ToDouble(model.Price),
                Rating = Convert.ToDouble(model.Rating),
                ImagePic = model.ImagePic,
                NameOfCompany = model.NameOfCompany,
                IsReserved = Convert.ToBoolean(model.IsReserved)
            };


            try
            {
                _dbcontext.Cars.Add(cmodel);
                _dbcontext.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error with creating new car company. -> {e.Message}");
            }

            return Ok(cmodel);
        }

        [HttpGet]
        [Route("GetAllCompaniesCarAdmin/{username}")]
        public async Task<List<CarCompany>> GetAllCompaniesCarAdmin(string username)
        {
            var companies =  new List<CarCompany>();
            var user = new User(); 
            try
            {
                 user = await _userManager.FindByIdAsync(username);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ERROR with getting user. -> {ex.Message}");             
            }

            try
            {
                companies = await _dbcontext.CarCompanies.ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ERROR with getting companies. -> {ex.Message}");
            }
                     
            var mylist = new List<CarCompany>();
           
                foreach (var item in companies)
                {
                    if (item.Cadmin == user.UserName)
                    {
                        mylist.Add(item);
                    }
                }

                  return mylist;

        }


    }
}
