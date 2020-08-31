using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using WebApplication1.Models.CarAdmin;

namespace WebApplication1.Models
{
    public class Car
    {
        [Key]
        public int Id { get; set; }
        public string Description { get; set; }
        public string ModelOfCar { get; set; }
        public int NumberOfSeats { get; set; }
        public double Price { get; set; } 
        public double Rating { get; set; }
        public string ImagePic { get; set; }

        [System.Text.Json.Serialization.JsonIgnore]
        public CarCompany MyCompany { get; set; }
        public bool IsReserved { get; set; }
        [NotMapped]
        public ICollection<Date> MyRentedDays { get; set; }
        public int CompanyId { get; set; }
        public int AverageRating { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public virtual ICollection<Date> ListRents { get; set; }
        public byte[] RowVersion { get; set; }
        public Car()
        {
          
        }
    }
}
