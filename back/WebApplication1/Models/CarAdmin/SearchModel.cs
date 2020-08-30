using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models.CarAdmin
{
    public class SearchModel
    {

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public double TotalPrice { get; set; }
        public string CarPic { get; set; }
        public string DateId { get; set; }
        public bool isEnded { get; set; }
        public int Rating { get; set; }
        public int MyCarId { get; set; }
        public string Model { get; set; }
        public string Seats { get; set; }
        public int MyCompanyId { get; set; }
        public SearchModel()
        {

        }

    }
}
