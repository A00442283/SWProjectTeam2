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
    public class BrakesController : Controller
    {
        private readonly inclassContext _context;

        public BrakesController(inclassContext context)
        {
            _context = context;
        }

        // GET: Brakes
        public async Task<IActionResult> Index()
        {
            return View(await _context.Brakes.ToListAsync());
        }
        // GET: api/authors
        [HttpGet]
        [EnableCors("MyPolicy")]
        public JsonResult GetBrakesInfo()
        {
            return Json(_context.Brakes.ToArray());
        }

        // POST: api/authors
        [HttpPost]
        [EnableCors("MyPolicy")]
        // [FromBody]dynamic brakes
        public async Task<IActionResult> PostAddBrakesApi([FromBody] Brakes brakes)
        {
            Console.WriteLine(brakes);
            _context.Add(brakes);
            await _context.SaveChangesAsync();
            
            // return Json(_context.Brakes.Single(a => a.Capacity == brakes.Capacity));
            return Json("Success");
        }
        
        // POST: Brakes/Delete/5
        [HttpPost]
        [EnableCors("MyPolicy")]
        public async Task<IActionResult> PostDeleteBrakesApi(int id)
        {
            Console.WriteLine(id);
            var brakes = await _context.Brakes.FindAsync(id);
            _context.Brakes.Remove(brakes);
            await _context.SaveChangesAsync();
            return Json("Success");
            // return RedirectToAction(nameof(Index));
        }
        
        [HttpPost]
        public async Task<IActionResult> PostEditBrakesApi(int id, [FromBody]Brakes brakes)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    brakes.BrakesId = id;
                    _context.Update(brakes);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BrakesExists(brakes.BrakesId))
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

        // GET: Brakes/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var brakes = await _context.Brakes
                .FirstOrDefaultAsync(m => m.BrakesId == id);
            if (brakes == null)
            {
                return NotFound();
            }

            return View(brakes);
        }

        // GET: Brakes/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Brakes/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("BrakesId,Capacity,Type,Price,Weight,RunningCost,Range")] Brakes brakes)
        {
            if (ModelState.IsValid)
            {
                _context.Add(brakes);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(brakes);
        }

        // GET: Brakes/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var brakes = await _context.Brakes.FindAsync(id);
            if (brakes == null)
            {
                return NotFound();
            }
            return View(brakes);
        }

        // POST: Brakes/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("BrakesId,Capacity,Type,Price,Weight,RunningCost,Range")] Brakes brakes)
        {
            if (id != brakes.BrakesId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(brakes);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BrakesExists(brakes.BrakesId))
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
            return View(brakes);
        }

        // GET: Brakes/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var brakes = await _context.Brakes
                .FirstOrDefaultAsync(m => m.BrakesId == id);
            if (brakes == null)
            {
                return NotFound();
            }

            return View(brakes);
        }

        // POST: Brakes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var brakes = await _context.Brakes.FindAsync(id);
            _context.Brakes.Remove(brakes);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool BrakesExists(int id)
        {
            return _context.Brakes.Any(e => e.BrakesId == id);
        }
    }
}
