using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models.CarAdmin
{
    public class ReservationCarModel
    {
        public string Id { get; set; }

        public string User { get; set; }
        public string Car { get; set; }
        public string PickUpLocation { get; set; }
        public string ReturnLocation { get; set; }
        public string PickUpTime { get; set; }
        public string ReturnTime { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string BabySeat { get; set; }
        public string Navigation { get; set; }
        public string TotalPrice { get; set; }

    }
}
