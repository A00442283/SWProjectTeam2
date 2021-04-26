using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace eBikes1.Models
{
    public partial class SavedConfiguration
    {
        public int ScId { get; set; }
        public int PId { get; set; }
        public int BikeId { get; set; }
        public int BId { get; set; }
    }
}
