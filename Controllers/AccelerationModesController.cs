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
    public class AccelerationModesController : Controller
    {
        private readonly inclassContext _context;

        public AccelerationModesController(inclassContext context)
        {
            _context = context;
        }

        // GET: AccelerationModes
        public async Task<IActionResult> Index()
        {
            return View(await _context.AccelerationMode.ToListAsync());
        }
        
        // GET: api/authors
        [HttpGet]
        [EnableCors("MyPolicy")]
        public JsonResult GetAccelerationModeInfo()
        {
            return Json(_context.AccelerationMode.ToArray());
        }

        // POST: api/authors
        [HttpPost]
        [EnableCors("MyPolicy")]
        // [FromBody]dynamic AccelerationMode
        public async Task<IActionResult> PostAddAccelerationModeApi([FromBody] AccelerationMode AccelerationMode)
        {
            Console.WriteLine(AccelerationMode);
            _context.Add(AccelerationMode);
            await _context.SaveChangesAsync();
            
            // return Json(_context.AccelerationMode.Single(a => a.Capacity == AccelerationMode.Capacity));
            return Json("Success");
        }
        
        // POST: AccelerationMode/Delete/5
        [HttpPost]
        [EnableCors("MyPolicy")]
        public async Task<IActionResult> PostDeleteAccelerationModeApi(int id)
        {
            Console.WriteLine(id);
            var AccelerationMode = await _context.AccelerationMode.FindAsync(id);
            _context.AccelerationMode.Remove(AccelerationMode);
            await _context.SaveChangesAsync();
            return Json("Success");
            // return RedirectToAction(nameof(Index));
        }
        
        [HttpPost]
        public async Task<IActionResult> PostEditAccelerationModeApi(int id, [FromBody]AccelerationMode AccelerationMode)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    AccelerationMode.AccelerationModeId = id;
                    _context.Update(AccelerationMode);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AccelerationModeExists(AccelerationMode.AccelerationModeId))
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


        // GET: AccelerationModes/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var accelerationMode = await _context.AccelerationMode
                .FirstOrDefaultAsync(m => m.AccelerationModeId == id);
            if (accelerationMode == null)
            {
                return NotFound();
            }

            return View(accelerationMode);
        }

        // GET: AccelerationModes/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: AccelerationModes/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("AccelerationModeId,Capacity,Type,Price,Weight,RunningCost,Range")] AccelerationMode accelerationMode)
        {
            if (ModelState.IsValid)
            {
                _context.Add(accelerationMode);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(accelerationMode);
        }

        // GET: AccelerationModes/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var accelerationMode = await _context.AccelerationMode.FindAsync(id);
            if (accelerationMode == null)
            {
                return NotFound();
            }
            return View(accelerationMode);
        }

        // POST: AccelerationModes/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("AccelerationModeId,Capacity,Type,Price,Weight,RunningCost,Range")] AccelerationMode accelerationMode)
        {
            if (id != accelerationMode.AccelerationModeId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(accelerationMode);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AccelerationModeExists(accelerationMode.AccelerationModeId))
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
            return View(accelerationMode);
        }

        // GET: AccelerationModes/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var accelerationMode = await _context.AccelerationMode
                .FirstOrDefaultAsync(m => m.AccelerationModeId == id);
            if (accelerationMode == null)
            {
                return NotFound();
            }

            return View(accelerationMode);
        }

        // POST: AccelerationModes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var accelerationMode = await _context.AccelerationMode.FindAsync(id);
            _context.AccelerationMode.Remove(accelerationMode);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool AccelerationModeExists(int id)
        {
            return _context.AccelerationMode.Any(e => e.AccelerationModeId == id);
        }
    }
}
