using chess.Application.Services.MatchService;
using chess.Domain.Entities.DTO;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace chess.API.Controllers
{
    [Route("/api/v1/[controller]")]
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
            try
            {
                var matchs = matchService.GetAll().ToList();
                return Ok(matchs);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // GET: MatchController/{id}
        [HttpGet("{reference}")]
        public ActionResult Get(string reference)
        {
            try
            {
                var match = matchService.GetByReference(reference);
                if (match == null)
                    return NotFound();
                return Ok(match);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // POST: MatchController/
        [HttpPost]
        public ActionResult Create([FromBody] MatchDTO matchDTO)
        {
            try
            {
                bool hasAnyMatchWithSameReference = Get(matchDTO.Reference).GetType() != NotFound().GetType();
                if (hasAnyMatchWithSameReference) return Conflict();
                var match = matchService.Create(matchDTO);
                return Ok(match);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: MatchController/
        [HttpPut]
        public ActionResult Update([FromBody] MatchDTO matchDTO)
        {
            try
            {
                var match = matchService.Update(matchDTO);
                return Ok(match);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // DELETE: MatchController/{id}
        [HttpDelete("{reference}")]
        public ActionResult Delete(string reference)
        {
            try
            {
                var match = matchService.GetByReference(reference);
                if (match == null)
                    return NotFound();
                matchService.Delete(reference);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
