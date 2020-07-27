using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Model.Models
{
    public class User : IdentityUser
    {
        [Column(TypeName = "nvarchar(150)")]
        public string FullName { get; set; }
        public string Address { get; set; }
        public DateTime Birthday { get; set; }
        public string Passport { get; set; }
        public int Points { get; set; }
        public int CompanyId { get; set; }
        public bool ChangedPassword { get; set; }
        public bool MainWebsiteAdministrator { get; set; }
    


    }
}
