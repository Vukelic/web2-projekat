using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using WebApplication1.Model.ApplicationSettings;
using WebApplication1.Model.Context;
using WebApplication1.Model.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppUserController : Controller
    {
        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;
        private readonly ApplicationSettings _appSettings;
        private ApplicationUsersContext _context2;

        public AppUserController(ApplicationUsersContext app2, UserManager<User> userManager, SignInManager<User> signInManager, IOptions<ApplicationSettings> appSettings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
            _context2 = app2;
        }

        [HttpPost]
        [Route("Register")]
        //POST : /api/ApplicationUser/Register
        public async Task<Object> Register(RegisterModel rm)
        {
            var user = await _userManager.FindByNameAsync(rm.username);
            if (user != null)
                return BadRequest(new { message = "Username already exists!." });
            var applicationUser = new User()
            {
                UserName = rm.username,
                Email = rm.email,
                FullName = rm.fullName,
                Address = rm.address,
                PhoneNumber = rm.phone,

            };

            try
            {
                IdentityResult result = await _userManager.CreateAsync(applicationUser, rm.password);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        }
}
