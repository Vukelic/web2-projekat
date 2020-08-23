using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;
using WebApplication1.Models.CarAdmin;

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
            var id = Convert.ToInt32(model.NameOfCompany);
            var company = await _dbcontext.CarCompanies.FindAsync(id);
            string img = model.ImagePic.Replace("C:\\fakepath\\", "assets/");
            Car cmodel = new Car()
            {
                Description = model.Description,
                ModelOfCar = model.ModelOfCar,
                NumberOfSeats = Convert.ToInt32(model.NumberOfSeats),
                Price = Convert.ToDouble(model.Price),
                Rating = Convert.ToDouble(model.Rating),
                ImagePic = img,
                MyCompany = company,
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
            var companies = new List<CarCompany>();
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

        [HttpGet]
        [Route("GetCarsOfCompany/{id}")]
        public async Task<IEnumerable<Car>> GetCarsOfCompany(string id)
        {
            var cars = new List<Car>();

            try
            {
                var num = Convert.ToInt32(id);
                cars = (await _dbcontext.CarCompanies.Include(c => c.Cars)
               .FirstOrDefaultAsync(company => company.Id == num)).Cars.ToList();

            }
            catch (Exception e)
            {
                Console.WriteLine($"Error while geting cars... [{e.Message}]");
                return null;
            }
            return cars;

        }

        //DELETE api/CarAdmin/DeleteCarr/5
        [HttpDelete("{id}")]
        [Route("DeleteCarr/{id}")]
        public async Task<IActionResult> DeleteCarr(int id)
        {
            var c = await _dbcontext.Cars.FindAsync(id);
            if(c.IsReserved == false)
            {
                _dbcontext.Cars.Remove(c);
                await _dbcontext.SaveChangesAsync();
            }
            else
            {
                Console.WriteLine($"ERROR You don't have to delete reserved car.");
                return BadRequest();
            }


            return Ok();
        }

        // PUT api/CarAdmin/Update/5
        [HttpPut("{id}")]
        [Route("CarUpdate")]
        public async Task CarUpdate([FromBody] Car model)
        {
            string img = model.ImagePic.Replace("C:\\fakepath\\", "assets/");
            model.ImagePic = img;
            try
            {
                _dbcontext.Cars.Update(model);
                await _dbcontext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error while updating a car. [{e.Message}]");
            }


        }

        [HttpGet]
        [Route("GetCompany/{id}")]
        public async Task<Object> GetCompany(string id)
        {
            var newId = Convert.ToInt32(id);
            var company = await _dbcontext.CarCompanies.FindAsync(newId);

            if (company is null)
            {
                return BadRequest(new { message = "Not found user" });
            }

            return company;
        }


        [HttpPut("{id}")]
        [Route("UpdateCarCompany")]
        public async Task<object> UpdateCarCompany([FromBody] CarCompanyModel model)
        {
            var id = Convert.ToInt32(model.Id);
            string img = model.ImagePic.Replace("C:\\fakepath\\", "assets/");
          
            var mymodel = _dbcontext.CarCompanies.Find(id);

            mymodel.Address = model.Address;
            mymodel.Cadmin = model.Cadmin;
            mymodel.Description = model.Description;
            mymodel.ImagePic = img;
            mymodel.Name = model.Name;
            mymodel.CityExpositure = model.CityExpositure;
            mymodel.Rating = Convert.ToDouble(model.Rating);
            try
            {
                _dbcontext.CarCompanies.Update(mymodel);
                await _dbcontext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error while updating a car. [{e.Message}]");
            }

            return model;
        }

        [HttpGet]
        [Route("GetCar/{id}")]
        public async Task<Object> GetCar(string id)
        {
            var newId = Convert.ToInt32(id);
            var company = await _dbcontext.Cars.FindAsync(newId);

            if (company is null)
            {
                return BadRequest(new { message = "Not found user" });
            }

            return company;
        }

        [HttpPost]
        [Route("CreateReservationCar")]
        public async Task<IActionResult> CreateReservationCar([FromBody] ReservationCarModel model)
        {
            var idCar = Convert.ToInt32(model.Car);
            var car = await _dbcontext.Cars.FindAsync(idCar);
            var user = await _userManager.FindByIdAsync(model.User);

            var price = GetTotalPrice(car, model.StartDate, model.EndDate, model.BabySeat, model.Navigation);

            ReservationCar rcmodel = new ReservationCar()
            {
                StartDate = Convert.ToDateTime(model.StartDate),
                EndDate = Convert.ToDateTime(model.EndDate),
                PickUpTime = model.PickUpTime,
                ReturnTime = model.ReturnTime,
                PickUpLocation = model.PickUpLocation,
                ReturnLocation = model.ReturnLocation,
                BabySeat = model.BabySeat,
                Navigation = model.Navigation,
                User = user,
                Car = car,
                TotalPrice = price
            };
            
            try
            {
                _dbcontext.Reservations.Add(rcmodel);
                _dbcontext.SaveChanges();
                car.IsReserved = true;
                _dbcontext.Cars.Update(car);
                _dbcontext.SaveChanges();

                string toMail = "Model of car: " + rcmodel.Car.ModelOfCar + Environment.NewLine +
                                    "Price for car per day: " + rcmodel.Car.Price + Environment.NewLine +
                                    "Number Of Seats: " + rcmodel.Car.NumberOfSeats + Environment.NewLine +
                                    "Start date: " + rcmodel.StartDate + Environment.NewLine +
                                    "End date: " + rcmodel.EndDate + Environment.NewLine + 
                                    "Totaly price:" + rcmodel.TotalPrice + Environment.NewLine + 
                                    "Navigation is " + rcmodel.Navigation + "in total price!" + Environment.NewLine +
                                    "BabySeat is " + rcmodel.BabySeat + "in total price!" + Environment.NewLine;

                    MailMessage mail = new MailMessage();
                    mail.To.Add(rcmodel.User.Email);
                    mail.From = new MailAddress("lnslagalica2@gmail.com");
                    mail.Subject = "Projekat";
                    mail.Body = "Reservation is succesfully created!" + Environment.NewLine;
                    mail.Body += toMail;

                    using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                    {
                        smtp.Credentials = new System.Net.NetworkCredential("lnslagalica2@gmail.com", "lazniprofil");
                        smtp.EnableSsl = true;
                        smtp.Send(mail);
                    }


            }
            catch (Exception e)
            {
                Console.WriteLine($"Error with creating new car reservation. -> {e.Message}");
            }

            return Ok(rcmodel);
        }

        private double GetTotalPrice(Car car, string from, string to, string babyseat, string navigation)
        {
            DateTime dtfrom = DateTime.Parse(from);
            DateTime dtTo = DateTime.Parse(to);
            double days = (dtTo - dtfrom).TotalDays;
            var total = car.Price * days;

            if (babyseat == "included")
            {
                total += days * 3;
            }
            if (navigation == "included")
            {
                total += days * 3;
            }

            return total;
        }

      /*  private bool CheckAvailability(Car rc, string from, string to)
        {
            bool available = true;
            DateTime fromDate = DateTime.Parse(from);
            DateTime toDate = DateTime.Parse(to);

            List<Car> cars = _dbcontext.Reservations.Find(rc.Id);

            foreach (var date in )
            {
                DateTime dt = DateTime.Parse(date.DateStr);
                if (dt >= fromDate && dt <= toDate)
                {
                    available = false;
                    break;
                }
            }

            return available;
        }*/




    }
}
