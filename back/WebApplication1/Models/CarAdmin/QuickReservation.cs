using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models.CarAdmin
{
    public class QuickReservation
    {
        [Key]
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public Car Car { get; set; }
        public int CarId { get; set; }
        public string CarPic { get; set; }
    }

    public class QuickReservationModel
    {
        public string Id { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string Car { get; set; }
        public string CarPic { get; set; }

        public string PriceWithDiscount { get; set; }
        public string TotalPrice { get; set; }
        public int CarId { get; set; }
        public string UserId { get; set; }
    }
}
