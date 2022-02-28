using chess.API.Models.DTO;
using chess.API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace chess.API.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class MatchController : Controller
    {
        private readonly IMatchService matchService;
        public MatchController(IMatchService matchService)
        {
            this.matchService = matchService;
        }

        // GET: MatchController
        [HttpGet]
        public ActionResult Get()
        {
            var matchs = matchService.GetAll().ToList();
            return Ok(matchs);
        }

        // GET: MatchController/{id}
        [HttpGet("{reference}")]
        public ActionResult Get(string reference)
        {
            var match = matchService.GetByReference(reference);
            if (match == null)
                return NotFound();
            return Ok(match);
        }

        // POST: MatchController/
        [HttpPost]
        public ActionResult Create([FromBody] MatchDTO matchDTO)
        {
            
            var match = matchService.Create(matchDTO);
            return Ok(match);
        }

        // PUT: MatchController/
        [HttpPut]
        public ActionResult Update([FromBody] MatchDTO matchDTO)
        {

            var match = matchService.Update(matchDTO);
            return Ok(match);
        }

        // DELETE: MatchController/{id}
        [HttpDelete("{reference}")]
        public ActionResult Delete(string reference)
        {
            var match = matchService.GetByReference(reference);
            if (match == null)
                return NotFound();
            matchService.Delete(reference);
            return Ok();
        }
    }
}
