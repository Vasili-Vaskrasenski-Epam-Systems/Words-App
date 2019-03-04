using System;
using System.Linq;
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

            CreateMap<IrregularVerbEntity, IrregularVerbModel>()
                .ForMember(dest => dest.Words, opt => opt.MapFrom(src => src.WordVerbs.Select(wv => wv.Word)));

            CreateMap<IrregularVerbModel, IrregularVerbEntity>()
                .ForMember(dest => dest.WordVerbs,
                    opt => opt.MapFrom(src => src.Words.Select(w => new WordVerbEntity()
                    {
                        //VerbId = src.Id != Guid.Empty ? src.Id : Guid.Empty,
                        WordId = w.Id,
                    })));
        }
    }
}
