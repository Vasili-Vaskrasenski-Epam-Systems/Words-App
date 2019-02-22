using AutoMapper;
using DAL.Entities;
using WordApp.Models;

namespace WordApp.Infrastructure
{
    internal class MappingRules: Profile
    {
        public MappingRules()
        {
            CreateMap<WordEntity, WordModel>().ReverseMap();
        }
    }
}
