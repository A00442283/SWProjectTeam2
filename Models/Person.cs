using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace eBikes1.Models
{
    public partial class Person
    {
        public int PersonId { get; set; }
        [Required(ErrorMessage = "First Name is mandatory")]
        [RegularExpression("^[a-zA-Z//s]+$", ErrorMessage = " Please enter valid characters")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is mandatory")]
        [RegularExpression("^[a-zA-Z//s]+$", ErrorMessage = "Please enter valid characters")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Password is mandatory")]
        [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", ErrorMessage = "Please enter minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Phone Number is mandatory")]
        [RegularExpression("^((\\+\\d{1}|1)[\\s.-]?)?\\(?[2-9](?!11)\\d{2}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$", ErrorMessage = "Invalid Phone Number!!")]
        public string Contact { get; set; }

        [Required(ErrorMessage = "Email ID is mandatory")]
        [RegularExpression("^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$", ErrorMessage = "Invalid Email ID !!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "City is mandatory")]
        [RegularExpression("^[a-zA-Z\\s]+$", ErrorMessage = "Please enter valid characters")]
        public string City { get; set; }

        [Required(ErrorMessage = "Province is mandatory")]
        [RegularExpression("^[a-zA-Z\\s]+$", ErrorMessage = "Please enter valid characters")]
        public string Province { get; set; }

        [Required(ErrorMessage = "Postal Code is mandatory")]
        [RegularExpression("^(\\d{5}(-\\d{4})?|[A-Z]\\d[A-Z] ?\\d[A-Z]\\d)$", ErrorMessage = "Please enter valid postal code")]
        public string Postalcode { get; set; }

        [Required(ErrorMessage = "Country is mandatory")]
        [RegularExpression("^[a-zA-Z\\s]+$", ErrorMessage = "Please enter valid characters")]
        public string Country { get; set; }

        public string IsAdmin { get; set; }
        public string IsMember { get; set; }
    }
}