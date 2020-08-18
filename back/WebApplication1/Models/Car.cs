using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Car
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public string ModelOfCar { get; set; }
        public int TypeOfCar { get; set; }
        public int NumberOfSeats { get; set; }
        public double Price { get; set; } //per day
        public double Rating { get; set; }
        public string ImagePic { get; set; }
        public string NameOfCompany { get; set; }
        public bool IsReserved { get; set; }
    }
}
