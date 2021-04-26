using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace eBikes1.Models
{
    public class WheelsController : Controller
    {
        private readonly inclassContext _context;

        public WheelsController(inclassContext context)
        {
            _context = context;
        }

        // GET: Wheels
        public async Task<IActionResult> Index()
        {
            return View(await _context.Wheel.ToListAsync());
        }
        // GET: api/authors
        [HttpGet]
        [EnableCors("MyPolicy")]
        public JsonResult GetWheelInfo()
        {
            return Json(_context.Wheel.ToArray());
        }

        // POST: api/authors
        [HttpPost]
        [EnableCors("MyPolicy")]
        // [FromBody]dynamic wheel
        public async Task<IActionResult> PostAddWheelApi([FromBody] Wheel wheel)
        {
            Console.WriteLine(wheel);
            _context.Add(wheel);
            await _context.SaveChangesAsync();
            
            // return Json(_context.Wheel.Single(a => a.Capacity == wheel.Capacity));
            return Json("Success");
        }
        
        // POST: Wheel/Delete/5
        [HttpPost]
        [EnableCors("MyPolicy")]
        public async Task<IActionResult> PostDeleteWheelApi(int id)
        {
            Console.WriteLine(id);
            var wheel = await _context.Wheel.FindAsync(id);
            _context.Wheel.Remove(wheel);
            await _context.SaveChangesAsync();
            return Json("Success");
            // return RedirectToAction(nameof(Index));
        }
        
        [HttpPost]
        public async Task<IActionResult> PostEditWheelApi(int id, [FromBody]Wheel wheel)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    wheel.WheelId = id;
                    _context.Update(wheel);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!WheelExists(wheel.WheelId))
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

        // GET: Wheels/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var wheel = await _context.Wheel
                .FirstOrDefaultAsync(m => m.WheelId == id);
            if (wheel == null)
            {
                return NotFound();
            }

            return View(wheel);
        }

        // GET: Wheels/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Wheels/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("WheelId,Capacity,Type,Price,Weight,RunningCost,Range")] Wheel wheel)
        {
            if (ModelState.IsValid)
            {
                _context.Add(wheel);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(wheel);
        }

        // GET: Wheels/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var wheel = await _context.Wheel.FindAsync(id);
            if (wheel == null)
            {
                return NotFound();
            }
            return View(wheel);
        }

        // POST: Wheels/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("WheelId,Capacity,Type,Price,Weight,RunningCost,Range")] Wheel wheel)
        {
            if (id != wheel.WheelId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(wheel);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!WheelExists(wheel.WheelId))
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
            return View(wheel);
        }

        // GET: Wheels/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var wheel = await _context.Wheel
                .FirstOrDefaultAsync(m => m.WheelId == id);
            if (wheel == null)
            {
                return NotFound();
            }

            return View(wheel);
        }

        // POST: Wheels/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var wheel = await _context.Wheel.FindAsync(id);
            _context.Wheel.Remove(wheel);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool WheelExists(int id)
        {
            return _context.Wheel.Any(e => e.WheelId == id);
        }
    }
}
