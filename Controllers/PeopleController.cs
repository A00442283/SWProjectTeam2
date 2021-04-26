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
    public class PeopleController : Controller
    {
        private readonly inclassContext _context;

        public PeopleController(inclassContext context)
        {
            _context = context;
        }

        // GET: People
        public async Task<IActionResult> Index()
        {
            return View(await _context.Person.ToListAsync());
        }
        
        // GET: api/authors
        [HttpGet]
        //// [EnableCors("MyPolicy")]
        public JsonResult GetPersonInfo()
        {
            return Json(_context.Person.ToArray());
        }
        
        // POST: api/authors
        [HttpPost]
        //[EnableCors("MyPolicy")]
        public JsonResult PostSignInApiJson([FromBody]Person person)
        {
            Console.WriteLine("---------------");
            Console.WriteLine(person.Email);
            Console.WriteLine(person.Password);
            return Json(_context.Person.Single(a => a.Email == person.Email && a.Password == person.Password));
        }

        // POST: api/authors
        [HttpPost]
        //[EnableCors("MyPolicy")]
        public async Task<IActionResult> PostAddPersonApi([FromBody] Person person)
        {
            Console.WriteLine(person);
            _context.Add(person);
            await _context.SaveChangesAsync();
            return Json("Success");
        }
        [HttpPost]
        //[EnableCors("MyPolicy")]
        public async Task<IActionResult> PostAddPersonValidationApi([FromBody] Person person)
        {
            if (ModelState.IsValid)
            {
                _context.Add(person);
                await _context.SaveChangesAsync();
                return Json("Success");
            }
            else
            {
                return Json("Fail");
            }
        }
        
        // POST: Person/Delete/5
        [HttpPost]
        //[EnableCors("MyPolicy")]
        public async Task<IActionResult> PostDeletePersonApi(int id)
        {
            Console.WriteLine(id);
            var person = await _context.Person.FindAsync(id);
            _context.Person.Remove(person);
            await _context.SaveChangesAsync();
            return Json("Success");
        }
        
        [HttpPost]
        public async Task<IActionResult> PostEditPersonApi(int id, [FromBody]Person person)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    person.PersonId = id;
                    _context.Update(person);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PersonExists(person.PersonId))
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

        // GET: People/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var person = await _context.Person
                .FirstOrDefaultAsync(m => m.PersonId == id);
            if (person == null)
            {
                return NotFound();
            }

            return View(person);
        }

        // GET: People/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: People/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("PersonId,FirstName,LastName,Password,Contact,Email,City,Province,Postalcode,Country,IsAdmin,IsMember")] Person person)
        {
            if (ModelState.IsValid)
            {
                _context.Add(person);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(person);
        }

        // GET: People/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var person = await _context.Person.FindAsync(id);
            if (person == null)
            {
                return NotFound();
            }
            return View(person);
        }

        // POST: People/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("PersonId,FirstName,LastName,Password,Contact,Email,City,Province,Postalcode,Country,IsAdmin,IsMember")] Person person)
        {
            if (id != person.PersonId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(person);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PersonExists(person.PersonId))
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
            return View(person);
        }

        // GET: People/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var person = await _context.Person
                .FirstOrDefaultAsync(m => m.PersonId == id);
            if (person == null)
            {
                return NotFound();
            }

            return View(person);
        }

        // POST: People/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var person = await _context.Person.FindAsync(id);
            _context.Person.Remove(person);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool PersonExists(int id)
        {
            return _context.Person.Any(e => e.PersonId == id);
        }
    }
}
