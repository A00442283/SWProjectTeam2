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
    public class CardDetailsController : Controller
    {
        private readonly inclassContext _context;

        public CardDetailsController(inclassContext context)
        {
            _context = context;
        }

        // GET: CardDetails
        public async Task<IActionResult> Index()
        {
            return View(await _context.CardDetails.ToListAsync());
        }
        // GET: api/authors
        [HttpGet]
        [EnableCors("MyPolicy")]
        public JsonResult GetCardDetailsInfo()
        {
            return Json(_context.CardDetails.ToArray());
        }

        // POST: api/authors
        [HttpPost]
        [EnableCors("MyPolicy")]
        // [FromBody]dynamic cardDetails
        public async Task<IActionResult> PostAddCardDetailsApi([FromBody] CardDetails cardDetails)
        {
            Console.WriteLine(cardDetails);
            _context.Add(cardDetails);
            await _context.SaveChangesAsync();
            return Json(cardDetails.CardId);
        }
        
        [HttpPost]
        [EnableCors("MyPolicy")]
        public async Task<IActionResult> PostAddCardDetailsValidationApi([FromBody] CardDetails cardDetails)
        {
            if (ModelState.IsValid)
            {
                _context.Add(cardDetails);
                await _context.SaveChangesAsync();
                return Json(cardDetails.CardId);

            }
            else
            {
                return Json("Fail");
            }
            
        }
        
        // POST: CardDetails/Delete/5
        [HttpPost]
        [EnableCors("MyPolicy")]
        public async Task<IActionResult> PostDeleteCardDetailsApi(int id)
        {
            Console.WriteLine(id);
            var cardDetails = await _context.CardDetails.FindAsync(id);
            _context.CardDetails.Remove(cardDetails);
            await _context.SaveChangesAsync();
            return Json("Success");
            // return RedirectToAction(nameof(Index));
        }
        
        [HttpPost]
        public async Task<IActionResult> PostEditCardDetailsApi(int id, [FromBody]CardDetails cardDetails)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    cardDetails.CardId = id;
                    _context.Update(cardDetails);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CardDetailsExists(cardDetails.CardId))
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


        // GET: CardDetails/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var cardDetails = await _context.CardDetails
                .FirstOrDefaultAsync(m => m.CardId == id);
            if (cardDetails == null)
            {
                return NotFound();
            }

            return View(cardDetails);
        }

        // GET: CardDetails/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: CardDetails/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("CardId,Type,Digits,ExpirationMonth,ExpirationYear")] CardDetails cardDetails)
        {
            if (ModelState.IsValid)
            {
                _context.Add(cardDetails);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(cardDetails);
        }

        // GET: CardDetails/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var cardDetails = await _context.CardDetails.FindAsync(id);
            if (cardDetails == null)
            {
                return NotFound();
            }
            return View(cardDetails);
        }

        // POST: CardDetails/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("CardId,Type,Digits,ExpirationMonth,ExpirationYear")] CardDetails cardDetails)
        {
            if (id != cardDetails.CardId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(cardDetails);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CardDetailsExists(cardDetails.CardId))
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
            return View(cardDetails);
        }

        // GET: CardDetails/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var cardDetails = await _context.CardDetails
                .FirstOrDefaultAsync(m => m.CardId == id);
            if (cardDetails == null)
            {
                return NotFound();
            }

            return View(cardDetails);
        }

        // POST: CardDetails/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var cardDetails = await _context.CardDetails.FindAsync(id);
            _context.CardDetails.Remove(cardDetails);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CardDetailsExists(int id)
        {
            return _context.CardDetails.Any(e => e.CardId == id);
        }
    }
}
