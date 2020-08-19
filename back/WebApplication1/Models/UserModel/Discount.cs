using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Discount
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public double SilverD { get; set; }
        public double GoldD { get; set; }

        public double RentAirD { get; set; }

    }

    public class DiscountModel
    {
        public string SilverD { get; set; }
        public string GoldD { get; set; }
        public string RentAirD { get; set; }
    }
}
