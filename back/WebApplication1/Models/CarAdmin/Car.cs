using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Car
    {
        [Key]
        public int Id { get; set; }
        public string Description { get; set; }
        public string ModelOfCar { get; set; }
        public int NumberOfSeats { get; set; }
        public double Price { get; set; } //per day
        public double Rating { get; set; }
        public string ImagePic { get; set; }

        [System.Text.Json.Serialization.JsonIgnore]
        public CarCompany MyCompany { get; set; }
        public bool IsReserved { get; set; }
    }
}
