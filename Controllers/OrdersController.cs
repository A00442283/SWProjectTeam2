using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using eBikes1.Models;
using Microsoft.AspNetCore.Cors;

namespace eBikes1.Controllers
{
    public class OrdersController : Controller
    {
        private readonly inclassContext _context;

        public OrdersController(inclassContext context)
        {
            _context = context;
        }

        // GET: Orders
        public async Task<IActionResult> Index()
        {
            return View(await _context.Orders.ToListAsync());
        }
        
           // GET: api/authors
        [HttpGet]
        [EnableCors("MyPolicy")]
        public JsonResult GetOrdersInfo()
        {
            return Json(_context.Orders.ToArray());
        }

        // POST: api/authors
        [HttpPost]
        [EnableCors("MyPolicy")]
        // [FromBody]dynamic Orders
        public async Task<IActionResult> PostAddOrdersApi([FromBody] Orders orders)
        {
            Console.WriteLine(orders);
            _context.Add(orders);
            await _context.SaveChangesAsync();
            
            // return Json(_context.Orders.Single(a => a.Capacity == Orders.Capacity))
            return Json(orders.OrderId);
            return Json("Success");
        }
        
        // POST: Orders/Delete/5
        [HttpPost]
        [EnableCors("MyPolicy")]
        public async Task<IActionResult> PostDeleteOrdersApi(int id)
        {
            Console.WriteLine(id);
            var Orders = await _context.Orders.FindAsync(id);
            _context.Orders.Remove(Orders);
            await _context.SaveChangesAsync();
            return Json("Success");
            // return RedirectToAction(nameof(Index));
        }
        
        [HttpPost]
        public async Task<IActionResult> PostEditOrdersApi(int id, [FromBody]Orders order)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    order.OrderId = id;
                    _context.Update(order);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!OrdersExists(order.OrderId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return Json("Success");
            }
            return Json("Fail");
        }


        // GET: Orders/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var orders = await _context.Orders
                .FirstOrDefaultAsync(m => m.OrderId == id);
            if (orders == null)
            {
                return NotFound();
            }

            return View(orders);
        }

        // GET: Orders/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Orders/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("OrderId,BatteryId,AccelerationModeId,BrakesId,WheelId,AccessoriesId,BikeId,CardId,PersonId")] Orders orders)
        {
            if (ModelState.IsValid)
            {
                _context.Add(orders);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(orders);
        }

        // GET: Orders/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var orders = await _context.Orders.FindAsync(id);
            if (orders == null)
            {
                return NotFound();
            }
            return View(orders);
        }

        // POST: Orders/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("OrderId,BatteryId,AccelerationModeId,BrakesId,WheelId,AccessoriesId,BikeId,CardId,PersonId")] Orders orders)
        {
            if (id != orders.OrderId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(orders);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!OrdersExists(orders.OrderId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(orders);
        }

        // GET: Orders/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var orders = await _context.Orders
                .FirstOrDefaultAsync(m => m.OrderId == id);
            if (orders == null)
            {
                return NotFound();
            }

            return View(orders);
        }

        // POST: Orders/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var orders = await _context.Orders.FindAsync(id);
            _context.Orders.Remove(orders);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool OrdersExists(int id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
    }
}
