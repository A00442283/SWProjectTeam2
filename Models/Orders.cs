using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace eBikes1.Models
{
    public partial class Orders
    {
        public int OrderId { get; set; }
        public int? BatteryId { get; set; }
        public int? AccelerationModeId { get; set; }
        public int? BrakesId { get; set; }
        public int? WheelId { get; set; }
        public int? AccessoriesId { get; set; }
        public int BikeId { get; set; }
        public int CardId { get; set; }
        public int PersonId { get; set; }
    }
}
