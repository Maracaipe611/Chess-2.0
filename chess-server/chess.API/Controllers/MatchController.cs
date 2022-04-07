using AutoMapper;
using chess.Application.Facades.MatchFacade;
using chess.Domain.Entities;
using chess.Domain.Entities.DTO;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace chess.API.Controllers
{
    [Route("/api/v1/[controller]")]
    [ApiController]
    public class MatchController : Controller
    {
        private readonly MatchFacade matchFacade;
        private readonly IMapper mapper;
        public MatchController(MatchFacade matchFacade, IMapper mapper)
        {
            this.matchFacade = matchFacade;
            this.mapper = mapper;
        }

        // GET: MatchController
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                var matchs = matchFacade.GetAll().ToList();
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
                var match = matchFacade.GetByReference(reference);
                if (match == null)
                    return NotFound();
                return Ok(match);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // GET: MatchController/{id}/{playerName}
        [HttpGet("{reference}/{playerName}")]
        public ActionResult JoinMatch(string reference, string playerName)
        {
            try
            {
                var match = matchFacade.GetByReference(reference);
                if (match == null)
                    return NotFound();
                match = matchFacade.AddPlayerToMatch(match, playerName);
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
                var match = matchFacade.Create(matchDTO);
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
                var players = mapper.Map<List<Player>>(matchDTO.Players);
                var match = new Match(matchDTO.Reference, players, matchDTO.Board);
                var newMatch = matchFacade.Update(match);
                return Ok(newMatch);
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
                var match = matchFacade.GetByReference(reference);
                if (match == null)
                    return NotFound();
                matchFacade.Delete(reference);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
