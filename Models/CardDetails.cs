using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace eBikes1.Models
{
    public partial class CardDetails
    {
        public int CardId { get; set; }

        [Required(ErrorMessage = "Card type is mandatory")]
        public string Type { get; set; }

        [Required(ErrorMessage = "Card Number is mandatory")]
        //[CardValidate]
        [RegularExpression("((4[0-9]{15})|(5[1-5][0-9]{14})|(3[4,7][0-9]{13}))", ErrorMessage = "Please enter valid credit card number!")]
        public String Digits { get; set; }


        [Required(ErrorMessage = "Expiry month is mandatory")]
        [RegularExpression("(0[1-9]|1[012])", ErrorMessage = "Please enter valid month")]
        public String ExpirationMonth { get; set; }

        [Required(ErrorMessage = "Expiry year is mandatory")]
        [RegularExpression("(20[2][1-9]|20[3][0-6])", ErrorMessage = "Year must be between 2021 to 2036")]
        public String ExpirationYear { get; set; }
    }
}