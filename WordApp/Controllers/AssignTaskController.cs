using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WordApp.Models;

namespace WordApp.Controllers
{
    public class AssignTaskController: BaseController
    {
        public AssignTaskController(IMapper mapper) : base(mapper)
        {
        }

        [HttpPost]
        public IActionResult AssignTask(AssignableWordTaskModel model)
        {
            //var entitiesToCreate = base.Mapper.
            return Ok();
        }
    }
}
