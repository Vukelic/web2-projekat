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

            rm.Role = "register_user";

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
        public bool VerifyToken(string providerToken)
        {
            var httpClient = new HttpClient();
            var requestUri = new Uri(string.Format(GoogleApiTokenInfoUrl, providerToken));

            HttpResponseMessage httpResponseMessage;

            try
            {
                httpResponseMessage = httpClient.GetAsync(requestUri).Result;
            }
            catch (Exception ex)
            {
                return false;
            }

            if (httpResponseMessage.StatusCode != HttpStatusCode.OK)
            {
                return false;
            }

            var response = httpResponseMessage.Content.ReadAsStringAsync().Result;
            var googleApiTokenInfo = JsonConvert.DeserializeObject<GoogleApiTokenInfo>(response);

            return true;
        }

        [HttpPost]
        [Route("SocialLogIn")]
        public IActionResult SocialLogIn([FromBody] SocialLogInModel model)
        {
            var test = _appSettings.JWT_Secret;

            if (!VerifyToken(model.IdToken))
            {
                return BadRequest(new { message = "Account token could not be verified." });
            }
          
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
        //POST : /api/AppUser/ReadDiscount
        public async Task<Object> AddDiscount(DiscountModel d)
        {
            var currentData = await _dbcontext.Discounts.FindAsync(2);

            currentData.RentAirD = Convert.ToDouble(d.RentAirD);
            currentData.SilverD = Convert.ToDouble(d.SilverD);
            currentData.GoldD = Convert.ToDouble(d.GoldD);

            _dbcontext.Discounts.Update(currentData);
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

        [HttpPut("{id}")]
        [Route("PutUser")]
        public async Task<object> PutUser(int id, [FromBody] User u)
        {
            var user = await _userManager.FindByIdAsync(u.Id);
            if (user is null)
            {
                return BadRequest(new { message = "Error processing email" });
            }
            user.UserName = u.UserName;
            user.Fullname = u.Fullname;
            user.PasswordHash = u.PasswordHash;
            if (u.PhoneNumber != null)
                user.PhoneNumber = u.PhoneNumber;
            user.Email = u.Email;

            await _userManager.UpdateAsync(user);

            return user;
        }


    }
}