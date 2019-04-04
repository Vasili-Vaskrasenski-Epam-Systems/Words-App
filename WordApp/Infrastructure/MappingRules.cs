using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using BL.Infrastructure.Encoders;
using Entities.Enums;
using Entities.Instances;
using Entities.Instances.Sentence;
using Entities.Instances.Task.SentenceTask;
using Entities.Instances.Task.VerbTask;
using Entities.Instances.Task.WordTask;
using Entities.Instances.User;
using Entities.Instances.Verb;
using Entities.Instances.Word;
using WordApp.Models;
using WordApp.Models.Sentences;
using WordApp.Models.TaskModels.SentenceTaskModels;
using WordApp.Models.TaskModels.VerbTaskModels;
using WordApp.Models.TaskModels.WordTaskModels;
using WordApp.Models.User;

namespace WordApp.Infrastructure
{
    internal class MappingRules : Profile
    {
        public MappingRules()
        {
            #region Word

            CreateMap<WordEntity, WordModel>().ReverseMap();
            CreateMap<WordAnswerEntity, WordAnswerModel>().ReverseMap();
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

            CreateMap<RelAnsweredVerbEntity, AnsweredVerbModel>();
            CreateMap<AnsweredVerbModel, RelAnsweredVerbEntity>().ForMember(dest => dest.Verb, opt => opt.Ignore());
            #endregion

            #region Sentence
            CreateMap<SentenceEntity, SentenceModel>().ReverseMap();
            CreateMap<SentenceTranslationEntity, SentenceTranslationModel>().ReverseMap();
            CreateMap<RelAnswerSentenceEntity, AnsweredSentenceModel>().ReverseMap();
            CreateMap<SentenceAnswerEntity, SentenceAnswerModel>().ReverseMap();
            #endregion

            #region User

            CreateMap<UserEntity, UserModel>().ReverseMap();
            CreateMap<UserProfileEntity, UserProfileModel>().ReverseMap();

            CreateMap<UserRegistrationModel, UserEntity>()
                .ForMember(dest => dest.Email, opts => opts.MapFrom(src => src.Email))
                .ForMember(dest => dest.Name, opts => opts.MapFrom(src => src.UserName))
                .ForMember(dest => dest.UserProfile, opts => opts.MapFrom(src => new UserProfileEntity()))
                .ForMember(dest => dest.UserType, opts => opts.MapFrom(src => UserType.Pupil));

            
            #endregion

            #region Word Task
            CreateMap<WordTaskEntity, WordTaskModel>()
                .ForMember(dest => dest.Words, opt => opt.MapFrom(src => src.TaskWords));
            CreateMap<WordTaskModel, WordTaskEntity>()
                .ForMember(dest => dest.TaskWords, opt => opt.MapFrom(src => src.Words.Select(w => new RelTaskWordEntity()
                {
                    WordId = w.Word.Id,
                    Order = w.Order,
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
                .ForMember(dest => dest.Verbs, opt => opt.MapFrom(src => src.TaskVerbs));
            CreateMap<VerbTaskModel, VerbTaskEntity>()
                .ForMember(dest => dest.TaskVerbs, opt => opt.MapFrom(src => src.Verbs.Select(w => new RelVerbTaskEntity()
                {
                    VerbId = w.Verb.Id,
                    Order = w.Order,
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

            #region Sentence Task
            CreateMap<SentenceTaskEntity, SentenceTaskModel>()
                .ForMember(dest => dest.Sentences, opt => opt.MapFrom(src => src.Sentences));
            CreateMap<SentenceTaskModel, SentenceTaskEntity>()
                .ForMember(dest => dest.Sentences, opt => opt.MapFrom(src => src.Sentences.Select(s => new RelSentenceTaskEntity()
                {
                    SentenceId = s.Sentence.Id,
                    Order = s.Order,
                })));

            #region AssignableSentenceTaskModel <-> AssignedSentenceTaskEntity
            CreateMap<AssignSentenceTaskModel, AssignedSentenceTaskEntity>()
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.SentenceTask, opt => opt.Ignore());
            CreateMap<AssignedSentenceTaskEntity, AssignSentenceTaskModel>();
            #endregion

            #region SentenceTaskEntity -> SentenceTaskDetailsModel

            CreateMap<SentenceTaskEntity, SentenceTaskDetailsModel>()
                .ForMember(dest => dest.SentenceTask, opt => opt.MapFrom(src => src))
                .ForMember(dest => dest.Assignees, opt => opt.MapFrom(src => src.AssignedSentenceTasks))
                .ForMember(dest => dest.Sentences, opt => opt.MapFrom(src => src.Sentences));
            #endregion

            #endregion

        }
    }
}
