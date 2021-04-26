using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace eBikes1.Models
{
    public partial class Wheel
    {
        public int WheelId { get; set; }
        public int Capacity { get; set; }
        public string Type { get; set; }
        public int Price { get; set; }
        public int Weight { get; set; }
        public int RunningCost { get; set; }
        public int Range { get; set; }
        
    }
}
