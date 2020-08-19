using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class CarCompanyModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Rating { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string CityExpositure { get; set; }
        public string ImagePic { get; set; }
     //   public List<Car> Cars { get; set; }
        public string Cadmin { get; set; }

    }
}
