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
    public class BikesController : Controller
    {
        private readonly inclassContext _context;

        public BikesController(inclassContext context)
        {
            _context = context;
        }

        // GET: Bikes
        public async Task<IActionResult> Index()
        {
            return View(await _context.Bikes.ToListAsync());
        }
        // GET: api/authors
        [HttpGet]
        [EnableCors("MyPolicy")]
        public JsonResult GetBikesInfo()
        {
            return Json(_context.Bikes.ToArray());
        }
        
        // POST: api/authors
        [HttpPost]
        [EnableCors("MyPolicy")]
        public async Task<IActionResult> PostAddBikesApi([FromBody]Bikes bikes)
        {
            _context.Add(bikes);
            await _context.SaveChangesAsync();
            
            return Json(_context.Bikes.Single(a => a.Name == bikes.Name));
            // return Json("Success");
        }
        
        // POST: Bikes/Delete/5
        [HttpPost]
        [EnableCors("MyPolicy")]
        public async Task<IActionResult> PostDeleteBikesApi(int id)
        {
            Console.WriteLine(id);
            var bikes = await _context.Bikes.FindAsync(id);
            _context.Bikes.Remove(bikes);
            await _context.SaveChangesAsync();
            return Json("Success");
            // return RedirectToAction(nameof(Index));
        }
        
        [HttpPost]
        public async Task<IActionResult> PostEditBikesApi(int id,[FromBody]Bikes bikes)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    bikes.BikeId = id;
                    _context.Update(bikes);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BikesExists(bikes.BikeId))
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

        // GET: Bikes/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var bikes = await _context.Bikes
                .FirstOrDefaultAsync(m => m.BikeId == id);
            if (bikes == null)
            {
                return NotFound();
            }

            return View(bikes);
        }

        // GET: Bikes/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Bikes/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("BikeId,Name,Description,Price,Weight,RunningCost,Range")] Bikes bikes)
        {
            if (ModelState.IsValid)
            {
                _context.Add(bikes);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(bikes);
        }

        // GET: Bikes/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var bikes = await _context.Bikes.FindAsync(id);
            if (bikes == null)
            {
                return NotFound();
            }
            return View(bikes);
        }

        // POST: Bikes/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("BikeId,Name,Description,Price,Weight,RunningCost,Range")] Bikes bikes)
        {
            if (id != bikes.BikeId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(bikes);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BikesExists(bikes.BikeId))
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
            return View(bikes);
        }

        // GET: Bikes/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var bikes = await _context.Bikes
                .FirstOrDefaultAsync(m => m.BikeId == id);
            if (bikes == null)
            {
                return NotFound();
            }

            return View(bikes);
        }

        // POST: Bikes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var bikes = await _context.Bikes.FindAsync(id);
            _context.Bikes.Remove(bikes);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool BikesExists(int id)
        {
            return _context.Bikes.Any(e => e.BikeId == id);
        }
    }
}
