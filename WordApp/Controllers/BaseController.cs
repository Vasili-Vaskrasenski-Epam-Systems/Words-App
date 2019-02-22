using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace WordApp.Controllers
{
    public class BaseController: Controller
    {
        protected IMapper Mapper;

        protected BaseController(IMapper mapper)
        {
            this.Mapper = mapper;
        }
    }
}
