﻿
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Model.Models
{
    public class Role : IdentityRole
    {
        public string Description { get; set; }
    }
}
