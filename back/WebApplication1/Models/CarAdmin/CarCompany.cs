using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class CarCompany
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public double Rating { get; set; }
        public string CityExpositure { get; set; }
        public string ImagePic { get; set; }
        public virtual List<Car> Cars { get; set; }
        public string Cadmin { get; set; } 
    }
}
