using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models.CarAdmin
{
    public class Date
    {
        [Key]
        public int Id { get; set; }
        public string ReservedFrom { get; set; }
        public string ReservedTo { get; set; }

        [System.Text.Json.Serialization.JsonIgnore]
        public Car MyCarId { get; set; }

        public int IdOfCar { get; set; }


        public Date()
        {

        }
    }
}
