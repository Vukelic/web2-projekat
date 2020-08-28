using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class CarModel
    {
        public string Description { get; set; }
        public string ModelOfCar { get; set; }
        public string NumberOfSeats { get; set; }
        public string Price { get; set; } 
        public string Rating { get; set; }
        public string ImagePic { get; set; }
        public string NameOfCompany { get; set; }
        public string IsReserved { get; set; }
        public string AverageRating { get; set; }
    }
}
