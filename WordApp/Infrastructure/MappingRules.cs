﻿using System.Linq;
using AutoMapper;
using Entities.Instances;
using WordApp.Models;

namespace WordApp.Infrastructure
{
    internal class MappingRules: Profile
    {
        public MappingRules()
        {
            CreateMap<WordEntity, WordModel>().ReverseMap();
            CreateMap<UserEntity, UserModel>().ReverseMap();
            //CreateMap<WordTaskEntity, WordTaskModel>().ReverseMap();


            #region Irregular Verb
            CreateMap<IrregularVerbEntity, IrregularVerbModel>()
                .ForMember(dest => dest.Words, opt => opt.MapFrom(src => src.WordVerbs.Select(wv => wv.Word)));

            CreateMap<IrregularVerbModel, IrregularVerbEntity>()
                .ForMember(dest => dest.WordVerbs,
                    opt => opt.MapFrom(src => src.Words.Select(w => new WordVerbEntity()
                    {
                        //VerbId = src.Id != Guid.Empty ? src.Id : Guid.Empty,
                        WordId = w.Id,
                    })));
            #endregion

            #region Word Task

            CreateMap<WordTaskEntity, WordTaskModel>()
                .ForMember(dest => dest.Words, opt => opt.MapFrom(src => src.TaskWords.Select(tw => tw.Word)));
            CreateMap<WordTaskModel, WordTaskEntity>()
                .ForMember(dest => dest.TaskWords, opt => opt.MapFrom(src => src.Words.Select(w => new TaskWordEntity()
                {
                    WordId = w.Id,
                })));

            #endregion

        }
    }
}
