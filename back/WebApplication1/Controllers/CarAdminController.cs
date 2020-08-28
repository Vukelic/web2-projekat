using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core.Features;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Migrations;
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
            var user = await _userManager.FindByNameAsync(model.NameOfCompany);
            var id = user.CarCompanyId;
            var company = await _dbcontext.CarCompanies.FindAsync(id);
            string img = model.ImagePic.Replace("C:\\fakepath\\", "assets/");
            Car cmodel = new Car()
            {
                Description = model.Description,
                ModelOfCar = model.ModelOfCar,
                NumberOfSeats = Convert.ToInt32(model.NumberOfSeats),
                Price = Convert.ToDouble(model.Price),
                Rating = Convert.ToDouble(model.Rating),
                AverageRating = Convert.ToInt32(model.AverageRating),
                ImagePic = img,
                MyCompany = company,
                CompanyId = id,
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
        public async Task<CarCompany> GetAllCompaniesCarAdmin(string username)
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

            var myComp = new CarCompany();

            foreach (var item in companies)
            {
                if (item.Cadmin == user.UserName)
                {
                    myComp = item;
                }
            }

            return myComp;
        }

        [HttpGet]
        [Route("GetCarsOfCompany/{id}")]
        public async Task<IEnumerable<Car>> GetCarsOfCompany(string id)
        {
            var cars = new List<Car>();

            try
            {
                var user = await _userManager.FindByIdAsync(id);
                var num = user.CarCompanyId;
                var listOfCars = _dbcontext.Cars.ToList();

                foreach (var item in listOfCars)
                {
                    if(item.CompanyId == num)
                    {
                        cars.Add(item);
                    }
                }   

            //    cars = (await _dbcontext.CarCompanies.Include(c => c.Cars)
            //   .FirstOrDefaultAsync(company => company.Id == num)).Cars.ToList();

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
            var listReservation = _dbcontext.Reservations.ToList();
            IActionResult ia;
            bool isReserved = false;
            foreach (var item in listReservation)
            {
                if(item.Car == c)
                {
                    
                    if(item.isEnded != true)
                    {
                        isReserved = true;
                        break;
                    }
                    else
                    {
                        isReserved = false;
                    }
                   
                }
                else
                {
                    isReserved = false;
                }
            }

            if (isReserved)
            {
                return BadRequest();
            }
            else
            {
                _dbcontext.Cars.Remove(c);
                await _dbcontext.SaveChangesAsync();
                return Ok();
            }

        }

        // PUT api/CarAdmin/Update/5
        [HttpPut("{id}")]
        [Route("CarUpdate")]
        public async Task<IActionResult> CarUpdate([FromBody] Car model)
        {
            string img = model.ImagePic.Replace("C:\\fakepath\\", "assets/");
            model.ImagePic = img;
            var listReservation = _dbcontext.Reservations.ToList();
            var myCar = _dbcontext.Cars.Find(model.Id);
            myCar.ModelOfCar = model.ModelOfCar;
            myCar.Description = model.Description;
            myCar.NumberOfSeats = model.NumberOfSeats;
            myCar.Price = model.Price;
            bool isReserved = false;
            foreach (var item in listReservation)
            {
                if (item.Car == myCar)
                {
                    if(item.isEnded != true)
                    {
                        isReserved = true;
                        break;
                    }
                    else
                    {
                        isReserved = false;
                    }
                  
                }
                else
                {
                    isReserved = false;        
                }
            }
            if(isReserved)
            {
                Console.WriteLine($"ERROR You can't update reserved car.");
                return BadRequest();
            }
            else
            {
                _dbcontext.Cars.Update(myCar);
                _dbcontext.SaveChanges();
                return Ok();
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
            mymodel.AverageRating = Convert.ToInt32(model.AverageRating);
            
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
        public async Task<Object> GetCar(int id)
        {
            //  var newId = Convert.ToInt32(id);
            var company = await _dbcontext.Cars.FindAsync(id);

            if (company is null)
            {
                return BadRequest(new { message = "Not found car" });
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
                TotalPrice = price,
                CarPic = car.ImagePic,
                Rating = 0,
                MyCarId = car.Id,
                MyCompanyId = car.CompanyId
            };
            Date d = new Date();
            d.MyCarId = car;
            d.IdOfCar = car.Id;
            d.ReservedFrom = model.StartDate;
            d.ReservedTo = model.EndDate;



            if (CheckAvailability(d))
            {
                if (CheckAvailabilityInQuickRes(d))
                {
                    try
                    {

                        _dbcontext.Dates.Add(d);
                        _dbcontext.SaveChanges();
                        rcmodel.Data = d;
                        rcmodel.DateId = Convert.ToString(d.Id);
                        _dbcontext.Reservations.Add(rcmodel);
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
                        mail.To.Add(user.Email);
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

                        return Ok(rcmodel);
                    }



                    catch (Exception e)
                    {
                        Console.WriteLine($"Error with creating new car reservation. -> {e.Message}");
                    }
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                return BadRequest();
            }
            return Ok(rcmodel);
        }

        private double GetTotalPrice(Car car, string from, string to, string babyseat, string navigation)
        {
            DateTime dtfrom = DateTime.Parse(from);
            DateTime dtTo = DateTime.Parse(to);
            double days = (dtTo - dtfrom).TotalDays + 1;
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

        private bool CheckAvailability(Date d)
        {
            bool available = true;
            List<Date> alldates = null;
            DateTime fromDate = DateTime.Parse(d.ReservedFrom);
            DateTime toDate = DateTime.Parse(d.ReservedTo);
            try
            {
                alldates = _dbcontext.Dates.ToList();
            }
            catch (Exception e)
            {

                Console.WriteLine($"Error with {e.Message}");
            }

            if (alldates.Count == 0)
            {
                return true;
            }

            foreach (var date in alldates)
            {
                if (date.IdOfCar == d.IdOfCar)
                {
                    DateTime dt1 = DateTime.Parse(date.ReservedFrom);
                    DateTime dt2 = DateTime.Parse(date.ReservedTo);
                    if ((dt1 <= fromDate && dt2 >= toDate) || (dt1 >= fromDate && dt2 <= toDate))
                    {
                        available = false;
                        break;
                    }
                }
            }

            return available;
        }

        private bool CheckAvailabilityInQuickRes(Date d)
        {
            bool available = true;
            List<QuickReservation> alldates = null;
            DateTime fromDate = DateTime.Parse(d.ReservedFrom);
            DateTime toDate = DateTime.Parse(d.ReservedTo);
            try
            {
                alldates = _dbcontext.QuickReservations.ToList();
            }
            catch (Exception e)
            {

                Console.WriteLine($"Error with {e.Message}");
            }

            if (alldates.Count == 0)
            {
                return true;
            }

            foreach (var date in alldates)
            {
                if (date.CarId == d.IdOfCar)
                {
                    DateTime dt1 = date.StartDate;
                    DateTime dt2 = date.EndDate;
                    if ((dt1 <= fromDate && dt2 >= toDate) || (dt1 >= fromDate && dt2 <= toDate))
                    {
                        available = false;
                        break;
                    }
                }
            }

            return available;
        }

        [HttpGet]
        [Route("GetCarsOfCompanyAllUsers/{id}")]
        public async Task<IEnumerable<Car>> GetCarsOfCompanyAllUsers(int id)
        {
            var cars = new List<Car>();

            try
            {
                // var company = await _dbcontext.CarCompanies.FindAsync(id);
                //var num = user.CarCompanyId;
                cars = (await _dbcontext.CarCompanies.Include(c => c.Cars)
               .FirstOrDefaultAsync(company => company.Id == id)).Cars.ToList();

            }
            catch (Exception e)
            {
                Console.WriteLine($"Error while geting cars... [{e.Message}]");
                return null;
            }
            return cars;

        }

        [HttpGet]
        [Route("GetMyReservations/{id}")]
        public async Task<IEnumerable<ReservationCar>> GetMyReservations(string id)
        {
            var reservations = new List<ReservationCar>();
            var today = DateTime.Today;
            try
            {
                var user = await _userManager.FindByIdAsync(id);
                var allreservations = await _dbcontext.Reservations.ToListAsync();

                foreach (var item in allreservations)
                {
                    if (item.User == user)
                    {
                        if (item.EndDate < today)
                        {
                            item.isEnded = true;
                            _dbcontext.Reservations.Update(item);
                            _dbcontext.SaveChanges();
                        }
                        reservations.Add(item);
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error while geting reservations... [{e.Message}]");
                return null;
            }
            return reservations;
        }

        [HttpPost]
        [Route("CreateQuickReservationCar")]
        public async Task<IActionResult> CreateQuickReservationCar([FromBody] QuickReservationModel model)
        {
            var idcar = Convert.ToInt32(model.Car);
            var car = await _dbcontext.Cars.FindAsync(idcar);
            string img = car.ImagePic.Replace("C:\\fakepath\\", "assets/");
            QuickReservation qrmodel = new QuickReservation()
            {
                StartDate = Convert.ToDateTime(model.StartDate),
                EndDate = Convert.ToDateTime(model.EndDate),
                Car = car,
                CarPic = img
            };

            Date d = new Date();
            d.ReservedFrom = model.StartDate;
            d.ReservedTo = model.EndDate;
            d.IdOfCar = car.Id;
            d.MyCarId = car;
            if (CheckAvailability(d))
            {
                try
                {
                    _dbcontext.QuickReservations.Add(qrmodel);
                    _dbcontext.SaveChanges();

                   // _dbcontext.Dates.Add(d);
                    //_dbcontext.SaveChanges();

                }
                catch (Exception e)
                {
                    Console.WriteLine($"Error with creating new quick reservation. -> {e.Message}");
                }
            }
            else
            {
                return BadRequest();
            }

            return Ok(qrmodel);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("SearchQuickReservationCar/{from}/{to}/{id}")]
        public async Task<IEnumerable<QuickReservationModel>> SearchQuickReservationCar(string from, string to, string id)
        {
            var reservations = new List<QuickReservationModel>();
            try
            {
                var quickList = await _dbcontext.QuickReservations.ToListAsync();
                DateTime dt1 = Convert.ToDateTime(from);
                DateTime dt2 = Convert.ToDateTime(to);
               
              
                foreach (var item in quickList)
                {
                    if (item.StartDate == dt1 && item.EndDate == dt2)
                    {
                        
                            QuickReservationModel qm = new QuickReservationModel();
                            qm.StartDate = Convert.ToString(item.StartDate);
                            qm.EndDate = Convert.ToString(item.EndDate);
                            var car = await _dbcontext.Cars.FindAsync(item.CarId);
                            qm.TotalPrice = Convert.ToString(GetTotalPrice(car, from, to, "", ""));
                            qm.PriceWithDiscount = Convert.ToString(GetDiscount(qm.TotalPrice));
                            qm.Id = Convert.ToString(item.Id);
                            qm.CarId = car.Id;
                            qm.UserId = id;

                            string img = car.ImagePic.Replace("C:\\fakepath\\", "assets/");
                            qm.CarPic = img;
                        Date d = new Date();
                        d.ReservedFrom = from;
                        d.ReservedTo = to;
                        d.IdOfCar = car.Id;
                        d.MyCarId = car;
                        
                        if (CheckAvailability(d)){
                            reservations.Add(qm);
                        }
                        
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error with geting quich cars... [{e.Message}]");
            }

            return reservations;

        }
        [AllowAnonymous]
        [HttpDelete]
        [Route("DeleteReservation/{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            var myreservation = await _dbcontext.Reservations.FindAsync(id);
            var dateId = myreservation.DateId;
            var idd = Convert.ToInt32(dateId);
            var myDate = await _dbcontext.Dates.FindAsync(idd);
            var today = DateTime.Today;
            var twoDaysAgo = myreservation.StartDate.AddDays(-2);

            if (today <= twoDaysAgo)
            {
                try
                {

                    _dbcontext.Reservations.Remove(myreservation);
                    await _dbcontext.SaveChangesAsync();
                    _dbcontext.Dates.Remove(myDate);
                    await _dbcontext.SaveChangesAsync();
                }
                catch (Exception e)
                {
                    Console.WriteLine($"Error with date reservation.. [{e.Message}]");
                    return null;
                }

            }
            else
            {
                return BadRequest();
            }

            return Ok();

        }

        private double GetDiscount(string price)
        {
            double myPrice;
            double prc = Convert.ToDouble(price);
            var currentData = _dbcontext.Discounts.Find(1);

            return myPrice = prc - (prc * currentData.RentAirD) / 100;

        }

        [HttpPost]
        [Route("CreateQucikReservation")]
        public async Task<IActionResult> CreateQucikReservation(QuickReservationModel model)
        {
            var car = await _dbcontext.Cars.FindAsync(model.CarId);
            var user = await _userManager.FindByIdAsync(model.UserId);
            string img = car.ImagePic.Replace("C:\\fakepath\\", "assets/");
            ReservationCar rc = new ReservationCar()
            {
                StartDate = Convert.ToDateTime(model.StartDate),
                EndDate = Convert.ToDateTime(model.EndDate),
                TotalPrice = Convert.ToDouble(model.PriceWithDiscount),
                Car = car,
                User = user,
                CarPic = img,
                MyCarId = car.Id,
                MyCompanyId = car.CompanyId
            };

            Date d = new Date();
            d.MyCarId = car;
            d.IdOfCar = car.Id;
            d.ReservedFrom = model.StartDate;
            d.ReservedTo = model.EndDate;

            if (CheckAvailability(d))
            {

                _dbcontext.Dates.Add(d);
                _dbcontext.SaveChanges();
                try
                {
                    rc.DateId = Convert.ToString(d.Id);
                    rc.Data = d;
                    _dbcontext.Reservations.Add(rc);
                    _dbcontext.SaveChanges();

                }
                catch (Exception ex)
                {

                    Console.WriteLine($"Error with create user quick reservation.. [{ex.Message}]");
                    return null;
                }


            }
            return Ok();
        }

        [HttpGet]
        [Route("GetMyExposituresByCar/{id}")]
        public async Task<List<CityExpositureModel>> GetMyExposituresByCar(int id)
        {
            var myList = new List<CityExpositureModel>();
            var myExpositure = new CityExpositureModel();
            var car = await _dbcontext.Cars.FindAsync(id);
            var myCompany = await _dbcontext.CarCompanies.FindAsync(car.CompanyId);
            var expositure = myCompany.CityExpositure;
            string[] cities = expositure.Split(',');
            foreach (var c in cities)
            {
                myExpositure = new CityExpositureModel();
                myExpositure.Name = c;
                myList.Add(myExpositure);
            }

            return myList;
        }

        [HttpPost]
        [Route("AddRating")]
        public async Task<IActionResult> AddRating([FromBody]RatingModel model)
        {
            int idR = Convert.ToInt32(model.Id);
            var myReservation = await _dbcontext.Reservations.FindAsync(idR);
            var myCarRating = Convert.ToInt32(model.CarRating);
            var myServRatin = Convert.ToInt32(model.ServiceRating);
          
           
            if( myReservation.isEnded == true)
            {
                if(myReservation.Rating == 0)
                {
                    if(myCarRating >= 1 && myCarRating <= 5  && myServRatin >=1 && myServRatin <=5)
                    {
                        myReservation.Rating = myCarRating;
                        _dbcontext.Reservations.Update(myReservation);
                        _dbcontext.SaveChanges();
                        var carId = myReservation.MyCarId;
                        var car = _dbcontext.Cars.Find(carId);
                        var companyId = car.CompanyId;
                        var company = _dbcontext.CarCompanies.Find(companyId);
                        MyRate r = new MyRate();
                        r.MyCarId = carId;
                        r.MyServiceId = companyId;
                        r.CarRating = model.CarRating;
                        r.ServiceRating = model.ServiceRating;
                         _dbcontext.MyRates.Add(r);
                        _dbcontext.SaveChanges();
                       car.Rating = CalculateAverageRatingCar(carId);
                        car.AverageRating = Convert.ToInt32(car.Rating);
                        _dbcontext.Cars.Update(car);
                        _dbcontext.SaveChanges();
                        company.Rating = CalculateAverageRatingService(companyId);
                        company.AverageRating = Convert.ToInt32(company.Rating);
                        _dbcontext.CarCompanies.Update(company);
                        _dbcontext.SaveChanges();

                        return Ok();
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                return BadRequest();
            }

        }
        private double CalculateAverageRatingCar(int id)
        {
            double averageRating = 0;
            double i = 0;
            var myRates = _dbcontext.MyRates.ToList();

            foreach (var item in myRates)
            {
                if(item.MyCarId == id)
                {
                    i++;
                    averageRating += Convert.ToDouble(item.CarRating);
                }
            }

            return (averageRating / i);
        }
        private double CalculateAverageRatingService(int id)
        {
            double averageRating = 0;
            double i = 0;
            var myRates = _dbcontext.MyRates.ToList();

            foreach (var item in myRates)
            {
                if (item.MyServiceId == id)
                {
                    i++;
                    averageRating += Convert.ToDouble(item.ServiceRating);
                }
            }

            return (averageRating / i);
        }

        [HttpGet]
        [Route("GetMyReport/{id}")]
        public async Task<Object> GetMyReport(string id)
        {
        //    var myList = new List<ChartModel>();
            ChartModel cm = new ChartModel();
            int i = 0;
            var user = await _userManager.FindByIdAsync(id);

            var myCompany = user.CarCompanyId;

            var listReservation = _dbcontext.Reservations.ToList();

            var myListDates = _dbcontext.Reservations.ToList();

            foreach (var item in myListDates)
            {
                if(item.MyCompanyId == myCompany)
                {
                    if (item.StartDate == Convert.ToDateTime("2020-08-20") || item.EndDate == Convert.ToDateTime("2020-08-20"))
                    {
                        i++;
                    }
                }
              
            }

            cm.First = (Convert.ToString(i));
            i = 0;
            foreach (var item in myListDates)
            {
                if (item.MyCompanyId == myCompany)
                {
                    if (item.StartDate == Convert.ToDateTime("2020-08-16") || item.EndDate == Convert.ToDateTime("2020-08-22"))
                    {
                        i++;
                    }
                }
            }

            cm.Second = (Convert.ToString(i));
            i = 0;

            foreach (var item in myListDates)
            {
                if (item.MyCompanyId == myCompany)
                {
                    if (item.StartDate == Convert.ToDateTime("2020-08-01") || item.EndDate == Convert.ToDateTime("2020-08-31"))
                    {
                        i++;
                    }
                }
            }
            cm.Third = (Convert.ToString(i));

            return cm;
        }
       
    }
}
