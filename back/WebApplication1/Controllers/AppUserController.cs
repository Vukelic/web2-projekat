using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApplication1.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Net.Http;
using System.Net;
using Newtonsoft.Json;
using WebApplication1.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppUserController : Controller
    {
        private UserManager<User> _userManager;

        private SignInManager<User> _signInManager;
        private readonly ApplicationSettings _appSettings;
        private readonly MyContextBase2020 _dbcontext;
        public IConfiguration Configuration { get; }
        private static string loggedinID = "";
        private static string socloggedinID = "";

        public AppUserController(UserManager<User> userManager, SignInManager<User> signInManager, 
            IOptions<ApplicationSettings> appSettings, IConfiguration configuration, MyContextBase2020 dbcontext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
            Configuration = configuration;
            _dbcontext = dbcontext;
        }

        [HttpPost]
        [Route("Register")]
        //POST : /api/AppUser/Register
        public async Task<Object> Register(RegisterModel rm)
        {
            var user = await _userManager.FindByNameAsync(rm.Username);
            if (user != null)
                return BadRequest(new { message = "Username already exists!." });

            rm.Role = "web_admin";

            var applicationUser = new User()
            {
                UserName = rm.Username,
                Email = rm.Email,
                Fullname = rm.FullName,
                Address = rm.Address,
                PhoneNumber = rm.Phone,
                Activated = false
               
            };

            try
            {
                var result = await _userManager.CreateAsync(applicationUser, rm.Password);
               

                if (result.Succeeded)
                {
                    string toMail = "http://localhost:54183/api/AppUser/VerifyEmail/" + applicationUser.Id;

                    MailMessage mail = new MailMessage();
                    mail.To.Add(applicationUser.Email);
                    mail.From = new MailAddress("lnslagalica2@gmail.com");
                    mail.Subject = "Projekat";
                    mail.Body = "<h1>Please verify your account by clicking on the link below<h1><br>";
                    mail.Body += toMail;

                    using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                    {
                        smtp.Credentials = new System.Net.NetworkCredential("lnslagalica2@gmail.com", "lazniprofil");
                        smtp.EnableSsl = true;
                        smtp.Send(mail);
                    }               
                }

                await _userManager.AddToRoleAsync(applicationUser, rm.Role);
                await _userManager.AddClaimAsync(applicationUser, new Claim(ClaimTypes.Role, rm.Role));
               // await _userManager.AddClaimAsync(applicationUser, new Claim(ClaimTypes.PrimarySid, applicationUser.Id));
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

     

        [HttpGet]
        [Route("VerifyEmail/{id}")]
        public async Task VerifyEmail(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            try
            {
                VerifyService service = new VerifyService(Configuration);
                service.Verify(user);
            }
            catch (Exception e)
            {

            }

        }
        [HttpPost]
        [Route("Login")]
        //POST : /api/AppUser/Login
        public async Task<IActionResult> Login(LogInModel model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                loggedinID = user.Id;
                if (user.EmailConfirmed)
                {
                    var role = await _userManager.GetRolesAsync(user);
                    IdentityOptions options = new IdentityOptions();
                    var tokenDescriptor = new SecurityTokenDescriptor
                        {
                            Subject = new ClaimsIdentity(new Claim[]
                        {
                        new Claim("UserID",user.Id.ToString()),
                        new Claim(options.ClaimsIdentity.RoleClaimType, role.FirstOrDefault()),
                        }),
                            Expires = DateTime.UtcNow.AddMinutes(60),
                            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                        };
                        var tokenHandler = new JwtSecurityTokenHandler();
                        var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                        var token = tokenHandler.WriteToken(securityToken);
                    

                        return Ok(new { token });
                    
                  
                }
                else
                    return BadRequest(new { message = "Please verify your e-mail first." });
            }
            else
                return BadRequest(new { message = "Username or password is incorrect." });
        }
    

        [HttpPost]
        [Route("SocialLogIn")]
        public async Task<IActionResult> SocialLogIn([FromBody] SocialLogInModel model)
        {
            var validation = await VerifyTokenAsync(model.IdToken);

            if (validation.isVaild)
            {
                socloggedinID = model.IdToken;
                var socialUser = await _userManager.FindByNameAsync(validation.apiTokenInfo.email);

                if (socialUser == null)
                {
                    var newUser = new User()
                    {
                        Email = validation.apiTokenInfo.email,
                        Firstname = model.FirstName,
                        Lastname = model.LastName,
                        Fullname = model.FirstName + " " + model.LastName,
                        UserName = model.FirstName,
                        NormalizedUserName = model.FirstName.ToUpper(),
                        EmailConfirmed = true

                    };
                    await _dbcontext.Users.AddAsync(newUser);
                    await _dbcontext.SaveChangesAsync();
                    loggedinID = newUser.Id;
                    await _userManager.AddToRoleAsync(newUser, "register_user");
                    await _userManager.AddClaimAsync(newUser, new Claim(ClaimTypes.Role, "register_user"));

                }

            
                socloggedinID = model.IdToken;
              var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                       new Claim("UserID",model.IdToken.ToString()),
                       new Claim(ClaimTypes.Role,"register_user"),
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(60),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);

            
            return Ok(new { token });
            }
            return Ok();
        }


        public async Task<(bool isVaild, GoogleApiTokenInfo apiTokenInfo)> VerifyTokenAsync(string providerToken)
        {
            var httpClient = new HttpClient();
            string GoogleApiTokenInfo = $"https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={providerToken}";
            var requestUri = new Uri(string.Format(GoogleApiTokenInfo, providerToken));

            HttpResponseMessage responseMessage;

            try
            {
                responseMessage = await httpClient.GetAsync(requestUri);
            }
            catch (Exception)
            {
                return (false, null);
            }

            if (responseMessage.StatusCode != HttpStatusCode.OK)
            {
                return (false, null);
            }

            var response = await responseMessage.Content.ReadAsStringAsync();
            var googleApiTokenInfo = JsonConvert.DeserializeObject<GoogleApiTokenInfo>(response);
            return (true, googleApiTokenInfo);
        }


        private const string GoogleApiTokenInfoUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={0}";

        [HttpPost]
        [Route("RegisterWebAdmin")]
        //POST : /api/AppUser/RegisterWebAdmin
        public async Task<Object> RegisterWebAdmin(RegisterModel rm)
        {
            var user = await _userManager.FindByNameAsync(rm.Username);
            if (user != null)
                return BadRequest(new { message = "Username already exists!." });
            rm.Role = "web_admin";
            var applicationUser = new User()
            {
                UserName = rm.Username,
                Email = rm.Email,
                Fullname = rm.FullName,
                Address = rm.Address,
                PhoneNumber = rm.Phone,
           //     EmailConfirmed = true,
            Activated = false,

            };
            try
            {
                IdentityResult result = await _userManager.CreateAsync(applicationUser, rm.Password);

                if (result.Succeeded)
                {

                    string toMail = "http://localhost:54183/api/AppUser/VerifyEmail/" + applicationUser.Id;

                    MailMessage mail = new MailMessage();
                    mail.To.Add(applicationUser.Email);
                    mail.From = new MailAddress("lnslagalica2@gmail.com");
                    mail.Subject = "Projekat";
                    mail.Body = "<h1>Please verify your account by clicking on the link below<h1><br>";
                    mail.Body += toMail;

                    using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                    {
                        smtp.Credentials = new System.Net.NetworkCredential("lnslagalica2@gmail.com", "lazniprofil");
                        smtp.EnableSsl = true;
                        smtp.Send(mail);
                    }

                }
                await _userManager.AddToRoleAsync(applicationUser, rm.Role);
                await _userManager.AddClaimAsync(applicationUser, new Claim(ClaimTypes.Role, rm.Role));
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [HttpPost]
        [Route("RegisterCarAdmin")]
        //POST : /api/AppUser/RegisterCarAdmin
        public async Task<Object> RegisterCarAdmin(RegisterModel rm)
        {
            var user = await _userManager.FindByNameAsync(rm.Username);
            if (user != null)
                return BadRequest(new { message = "Username already exists!." });

            rm.Role = "car_admin";
            var applicationUser = new User()
            {
                UserName = rm.Username,
                Email = rm.Email,
                Fullname = rm.FullName,
                Address = rm.Address,
                PhoneNumber = rm.Phone,
           //     EmailConfirmed = true,
                Activated = false,

            };
            try
            {
                IdentityResult result = await _userManager.CreateAsync(applicationUser, rm.Password);

                if (result.Succeeded)
                {

                    string toMail = "http://localhost:54183/api/AppUser/VerifyEmail/" + applicationUser.Id;

                    MailMessage mail = new MailMessage();
                    mail.To.Add(applicationUser.Email);
                    mail.From = new MailAddress("lnslagalica2@gmail.com");
                    mail.Subject = "Projekat";
                    mail.Body = "<h1>Please verify your account by clicking on the link below<h1><br>";
                    mail.Body += toMail;

                    using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                    {
                        smtp.Credentials = new System.Net.NetworkCredential("lnslagalica2@gmail.com", "lazniprofil");
                        smtp.EnableSsl = true;
                        smtp.Send(mail);
                    }

                }
                await _userManager.AddToRoleAsync(applicationUser, rm.Role);
                await _userManager.AddClaimAsync(applicationUser, new Claim(ClaimTypes.Role, rm.Role));
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [HttpPost]
        [Route("AddDiscount")]
        //POST : /api/AppUser/AddDiscount
        public async Task<Object> AddDiscount(DiscountModel d)
        {
           var currentData = await _dbcontext.Discounts.FindAsync(2);
          //  var currentData = new Discount();
            currentData.RentAirD = Convert.ToDouble(d.RentAirD);
            currentData.SilverD = Convert.ToDouble(d.SilverD);
            currentData.GoldD = Convert.ToDouble(d.GoldD);

             _dbcontext.Discounts.Update(currentData);
           // _dbcontext.Discounts.u(currentData);
            _dbcontext.SaveChanges();
            return Ok();
          
        }

        [HttpGet]
        [Route("GetDiscount")]
        //get : /api/AppUser/GetDiscount
        public async Task<Object> GetDiscount()
        {
            var currentData = await _dbcontext.Discounts.FindAsync(2);
            if (currentData == null) 
            {
                return NotFound();
            }
            return currentData;


        }

        [HttpGet]
        
        [Route("UserAccount")]
        //get : /api/AppUser/GetDiscount
        public async Task<Object> UserAccount()
        {
        
            var user = await _userManager.FindByIdAsync(loggedinID);
            if(user == null)
            {
                var validation = await VerifyTokenAsync(socloggedinID);
                Profile profile2 = new Profile();
              //  profile2.Phone = user.PhoneNumber;
                profile2.Fullname = validation.apiTokenInfo.family_name + validation.apiTokenInfo.given_name;
                profile2.Username = validation.apiTokenInfo.family_name;
                profile2.Email = validation.apiTokenInfo.email;
                //profile2.Address = user.Address;
                profile2.Status = "register_user";
                return profile2;
            }
            var role = await _userManager.GetRolesAsync(user);
            Profile profile = new Profile();
            profile.Phone = user.PhoneNumber;
            profile.Fullname = user.Fullname;
            profile.Username = user.UserName;
            profile.Email = user.Email;
            profile.Address = user.Address;
            profile.Status = role.FirstOrDefault().ToString();
            return profile;
        }

        [HttpPut]
        [AllowAnonymous]
        [Route("PutUser")]
        public async Task<object> PutUser(ProfileModel u)
        {
            var user = await _userManager.FindByNameAsync(u.Username);
            if (user is null)
            {
                return BadRequest(new { message = "Not found user" });
            }
            user.UserName = u.Username;
            user.Fullname = u.FullName;
          
            if (u.PhoneNumber != null)
                user.PhoneNumber = u.PhoneNumber;
            user.Email = u.Email;
            user.Address = u.Address;
            var code = await _userManager.GeneratePasswordResetTokenAsync(user);
            try
            {
                await _userManager.ResetPasswordAsync(user, code, u.Password);
                await _userManager.UpdateAsync(user);
            }
            catch (Exception)
            {

                throw;
            }
           
            return user;
        }



        [HttpPost]
        [Route("AddCarCompany")]
        public async Task<IActionResult> AddCarCompany([FromBody] CarCompanyModel model)
        {
            var admin = await _userManager.FindByNameAsync(model.Cadmin);

            if (admin == null)
            {
                var adminModel = new RegisterModel()
                {
                //    FullName = model.Cadmin.FullName,
               //     Email = model.Cadmin.Email,
                 //   Address = model.Cadmin.Address,
                 //   Phone = model.Cadmin.Phone,
                 //   Role = "web_admin",
                 //   Username = model.Cadmin.Username
                };

           //     model.Cadmin = adminModel;
            }

            CarCompany carCompany = new CarCompany()
            {
                Cadmin = admin.UserName,
                Address = model.Address,
                Cars = new List<Car>(),
                CityExpositure = model.CityExpositure,
                Description = model.Description,
                Name = model.Name,
                Rating = 0,
                ImagePic = model.ImagePic
            };


            try
            {
                _dbcontext.CarCompanies.Add(carCompany);
                _dbcontext.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error with creating new car company. -> {e.Message}");
            }

            return Ok(carCompany);
        }

        [HttpGet]
        [Route("GetAllCarAdmins")]
        public async Task<List<User>> GetAllCarAdmins()
        {
            var users = _dbcontext.Users.ToList();

            List<User> allUsers = new List<User>();
            User u;
            foreach (var user in users)
            {
                var role = await _userManager.GetRolesAsync(user);
                var status = role.FirstOrDefault().ToString();
                if (status == "car_admin")
                {
                    u = new User()
                    {
                        Fullname = user.Fullname,
                        UserName = user.UserName,
                        Email = user.Email,
                        PhoneNumber = user.PhoneNumber,                      
                        Address = user.Address,
                    };
                    allUsers.Add(u);
                }
            }

            return allUsers;
        }

    }

}
