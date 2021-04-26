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
    public class AccessoriesController : Controller
    {
        private readonly inclassContext _context;

        public AccessoriesController(inclassContext context)
        {
            _context = context;
        }

        // GET: Accessories
        public async Task<IActionResult> Index()
        {
            return View(await _context.Accessories.ToListAsync());
        }
        // GET: api/authors
        [HttpGet]
        [EnableCors("MyPolicy")]
        public JsonResult GetAccessoriesInfo()
        {
            return Json(_context.Accessories.ToArray());
        }

        // POST: api/authors
        [HttpPost]
        [EnableCors("MyPolicy")]
        // [FromBody]dynamic battery
        public async Task<IActionResult> PostAddAccessoriesApi([FromBody] Accessories Accessories)
        {
            Console.WriteLine(Accessories);
            _context.Add(Accessories);
            await _context.SaveChangesAsync();
            return Json("Success");
        }
        
        // POST: Accessories/Delete/5
        [HttpPost]
        [EnableCors("MyPolicy")]
        public async Task<IActionResult> PostDeleteAccessoriesApi(int id)
        {
            Console.WriteLine(id);
            var Accessories = await _context.Accessories.FindAsync(id);
            _context.Accessories.Remove(Accessories);
            await _context.SaveChangesAsync();
            return Json("Success");
            // return RedirectToAction(nameof(Index));
        }
        
        [HttpPost]
        public async Task<IActionResult> PostEditAccessoriesApi(int id, [FromBody]Accessories Accessories)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Accessories.AccessoriesId = id;
                    _context.Update(Accessories);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AccessoriesExists(Accessories.AccessoriesId))
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

        // GET: Accessories/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var accessories = await _context.Accessories
                .FirstOrDefaultAsync(m => m.AccessoriesId == id);
            if (accessories == null)
            {
                return NotFound();
            }

            return View(accessories);
        }

        // GET: Accessories/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Accessories/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("AccessoriesId,Capacity,Type,Price,Weight,RunningCost,Range")] Accessories accessories)
        {
            if (ModelState.IsValid)
            {
                _context.Add(accessories);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(accessories);
        }

        // GET: Accessories/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var accessories = await _context.Accessories.FindAsync(id);
            if (accessories == null)
            {
                return NotFound();
            }
            return View(accessories);
        }

        // POST: Accessories/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("AccessoriesId,Capacity,Type,Price,Weight,RunningCost,Range")] Accessories accessories)
        {
            if (id != accessories.AccessoriesId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(accessories);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AccessoriesExists(accessories.AccessoriesId))
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
            return View(accessories);
        }

        // GET: Accessories/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var accessories = await _context.Accessories
                .FirstOrDefaultAsync(m => m.AccessoriesId == id);
            if (accessories == null)
            {
                return NotFound();
            }

            return View(accessories);
        }

        // POST: Accessories/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var accessories = await _context.Accessories.FindAsync(id);
            _context.Accessories.Remove(accessories);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool AccessoriesExists(int id)
        {
            return _context.Accessories.Any(e => e.AccessoriesId == id);
        }
    }
}
