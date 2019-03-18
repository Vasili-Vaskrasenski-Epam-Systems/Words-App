﻿using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Entities.Instances;
using Entities.Instances.Task;
using Entities.Instances.Task.VerbTask;
using Entities.Instances.Task.WordTask;
using Entities.Instances.Verb;
using Entities.Instances.Word;
using WordApp.Models;
using WordApp.Models.TaskModels.VerbTaskModels;
using WordApp.Models.TaskModels.WordTaskModels;

namespace WordApp.Infrastructure
{
    internal class MappingRules : Profile
    {
        public MappingRules()
        {
            #region Word

            CreateMap<WordEntity, WordModel>().ReverseMap();
            CreateMap<WordAnswerEntity, AnswerModel>().ReverseMap();
            CreateMap<RelAnswerWordEntity, AnsweredWordModel>().ReverseMap();

            #endregion

            #region Verb
            CreateMap<VerbEntity, VerbModel>()
                .ForMember(dest => dest.Words, opt => opt.MapFrom(src => src.WordVerbs.Select(wv => wv.Word)));

            CreateMap<VerbModel, VerbEntity>()
                .ForMember(dest => dest.WordVerbs,
                    opt => opt.MapFrom(src => src.Words.Select(w => new RelWordVerbEntity()
                    {
                        //VerbId = src.Id != Guid.Empty ? src.Id : Guid.Empty,
                        WordId = w.Id,
                    })));

            CreateMap<VerbAnswerEntity, VerbAnswerModel>().ReverseMap();
            CreateMap<RelAnsweredVerbEntity, AnsweredVerbModel>().ReverseMap();
            #endregion

            #region User
            CreateMap<UserEntity, UserModel>().ReverseMap();


            #endregion

            #region Word Task
            CreateMap<WordTaskEntity, WordTaskModel>()
                .ForMember(dest => dest.Words, opt => opt.MapFrom(src => src.TaskWords.Select(tw => tw.Word)));
            CreateMap<WordTaskModel, WordTaskEntity>()
                .ForMember(dest => dest.TaskWords, opt => opt.MapFrom(src => src.Words.Select(w => new RelTaskWordEntity()
                {
                    WordId = w.Id,
                })));

            #region AssignableWordTaskModel <-> AssignedWordTaskEntity
            CreateMap<AssignableWordTaskModel, AssignedWordTaskEntity>()
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.WordTask, opt => opt.Ignore());
            CreateMap<AssignedWordTaskEntity, AssignableWordTaskModel>();
            #endregion

            #region WordTaskEntity -> WordTaskDetailsModel

            CreateMap<WordTaskEntity, WordTaskDetailsModel>()
                .ForMember(dest => dest.WordTask, opt => opt.MapFrom(src => src))
                .ForMember(dest => dest.Assignees, opt => opt.MapFrom(src => src.AssignedWordTasks))
                .ForMember(dest => dest.Words, opt => opt.MapFrom(src => src.TaskWords));
            #endregion


            #endregion

            #region Verb Task
            CreateMap<VerbTaskEntity, VerbTaskModel>()
                .ForMember(dest => dest.Verbs, opt => opt.MapFrom(src => src.TaskVerbs.Select(tw => tw.Verb)));
            CreateMap<VerbTaskModel, VerbTaskEntity>()
                .ForMember(dest => dest.TaskVerbs, opt => opt.MapFrom(src => src.Verbs.Select(w => new RelVerbTaskEntity()
                {
                    VerbId = w.Id,
                })));

            #region AssignableVerbTaskModel <-> AssignedVerbTaskEntity
            CreateMap<AssignVerbTaskModel, AssignedVerbTaskEntity>()
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.VerbTask, opt => opt.Ignore());
            CreateMap<AssignedVerbTaskEntity, AssignVerbTaskModel>();
            #endregion

            #region VerbTaskEntity -> VerbTaskDetailsModel

            CreateMap<VerbTaskEntity, VerbTaskDetailsModel>()
                .ForMember(dest => dest.VerbTask, opt => opt.MapFrom(src => src))
                .ForMember(dest => dest.Assignees, opt => opt.MapFrom(src => src.AssignedVerbs))
                .ForMember(dest => dest.Verbs, opt => opt.MapFrom(src => src.TaskVerbs))
                ;
            #endregion
            #endregion
        }
    }
}
