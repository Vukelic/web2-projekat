using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models.CarAdmin
{
    public class ReservationCar
    {
        [Key]
        public int Id { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public User User { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public Car Car { get; set; }
        public string PickUpLocation { get; set; }
        public string ReturnLocation { get; set; }
        public string PickUpTime { get; set; }
        public string ReturnTime { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string BabySeat { get; set; }
        public string Navigation { get; set; }
        public double TotalPrice { get; set; }
        public string CarPic { get; set; }
        public string PriceWithDiscount { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public Date Data { get; set; }
        public string DateId { get; set; }
        public bool isEnded { get; set; }
        public int Rating { get; set; }
        public int MyCarId { get; set; }
        public ReservationCar()
        {

        }

      
    }
}
