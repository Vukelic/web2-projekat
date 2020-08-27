using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models.CarAdmin
{
    public class MyRate
    {

        [Key]
        public int RateID { get; set; }
        public string CarRating { get; set; }
        public string ServiceRating { get; set; }
        public int MyCarId { get; set; }
        public int MyServiceId { get; set; }
        public MyRate()
        {

        }
    }
}
