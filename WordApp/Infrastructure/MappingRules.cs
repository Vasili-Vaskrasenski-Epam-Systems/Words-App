﻿using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Entities.Instances;
using WordApp.Models;
using WordApp.Models.TaskModels.WordTaskModels;

namespace WordApp.Infrastructure
{
    internal class MappingRules: Profile
    {
        public MappingRules()
        {
            CreateMap<WordEntity, WordModel>().ReverseMap();
            CreateMap<UserEntity, UserModel>().ReverseMap();
            CreateMap<AnswerEntity, AnswerModel>().ReverseMap();
            CreateMap<AnsweredWordEntity, AnsweredWordModel>().ReverseMap();

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

            CreateMap<AssignableWordTaskModel, AssignedWordTaskEntity>()
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.WordTask, opt => opt.Ignore());
            CreateMap<AssignedWordTaskEntity, AssignableWordTaskModel>();

            CreateMap<WordTaskEntity, WordTaskDetailsModel>()
                .ForMember(dest => dest.WordTask, opt => opt.MapFrom(src => src))
                .ForMember(dest => dest.Assignees, opt => opt.MapFrom(src => src.AssignedWordTasks))
                .ForMember(dest => dest.Words, opt => opt.MapFrom(src => src.TaskWords));

            //CreateMap<AnsweredWordTaskModel, List<AnsweredWordEntity>>()
            //.ForMember(dest => dest.., opt => opt.MapFrom(src => src.WordTask));
            ////.ForMember(dest => dest.AnsweredWords, opt => opt.MapFrom(src => src.AnsweredWords.Select(e =>
            ////    new AnsweredWordEntity()
            ////    {
            ////        AssignedTaskId = src.WordTask.Id,
            ////        WordId = e.Word.Id,
            ////        Answer = new AnswerEntity()
            ////        {
            ////            Answer = e.Answer.Answer,
            ////        }
            ////    })));

            #endregion
        }
    }
}
