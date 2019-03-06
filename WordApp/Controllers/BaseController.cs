using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace WordApp.Controllers
{
    [Route("api/[controller]")]
    public abstract class BaseController: Controller
    {
        protected IMapper Mapper;
        
        protected BaseController(IMapper mapper)
        {
            this.Mapper = mapper;
        }
    }
}
