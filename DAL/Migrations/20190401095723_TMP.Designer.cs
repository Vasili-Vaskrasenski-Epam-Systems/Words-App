﻿// <auto-generated />
using System;
using DAL.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DAL.Migrations
{
    [DbContext(typeof(WordsDbContext))]
    [Migration("20190401095723_TMP")]
    partial class TMP
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.2-servicing-10034")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Entities.Instances.RelWordVerbEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.Property<Guid>("VerbId");

                    b.Property<Guid>("WordId");

                    b.HasKey("Id");

                    b.HasIndex("VerbId");

                    b.HasIndex("WordId");

                    b.ToTable("RelWordVerbs");
                });

            modelBuilder.Entity("Entities.Instances.Sentence.RelAnswerSentenceEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("AssignedSentenceTaskId");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.Property<Guid>("SentenceAnswerId");

                    b.Property<Guid>("SentenceId");

                    b.HasKey("Id");

                    b.HasIndex("AssignedSentenceTaskId");

                    b.HasIndex("SentenceAnswerId");

                    b.HasIndex("SentenceId");

                    b.ToTable("RelAnsweredSentences");
                });

            modelBuilder.Entity("Entities.Instances.Sentence.SentenceAnswerEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Answer");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.HasKey("Id");

                    b.ToTable("SentenceAnswers");
                });

            modelBuilder.Entity("Entities.Instances.Sentence.SentenceEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.Property<string>("Text");

                    b.HasKey("Id");

                    b.ToTable("Sentences");
                });

            modelBuilder.Entity("Entities.Instances.Sentence.SentenceTranslationEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.Property<Guid>("SentenceId");

                    b.Property<string>("Translation");

                    b.HasKey("Id");

                    b.HasIndex("SentenceId");

                    b.ToTable("SentenceTranslations");
                });

            modelBuilder.Entity("Entities.Instances.Task.SentenceTask.AssignedSentenceTaskEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("CompleteDate");

                    b.Property<DateTime>("Deadline");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.Property<Guid>("SentenceTaskId");

                    b.Property<int>("TaskStatus");

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("SentenceTaskId");

                    b.HasIndex("UserId");

                    b.ToTable("AssignedSentenceTasks");
                });

            modelBuilder.Entity("Entities.Instances.Task.SentenceTask.RelSentenceTaskEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Order");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.Property<Guid>("SentenceId");

                    b.Property<Guid>("TaskId");

                    b.HasKey("Id");

                    b.HasIndex("SentenceId");

                    b.HasIndex("TaskId");

                    b.ToTable("RelSentenceTasks");
                });

            modelBuilder.Entity("Entities.Instances.Task.SentenceTask.SentenceTaskEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.HasKey("Id");

                    b.ToTable("SentenceTasks");
                });

            modelBuilder.Entity("Entities.Instances.Task.VerbTask.AssignedVerbTaskEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("CompleteDate");

                    b.Property<DateTime>("Deadline");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.Property<int>("TaskStatus");

                    b.Property<Guid>("UserId");

                    b.Property<Guid>("VerbTaskId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.HasIndex("VerbTaskId");

                    b.ToTable("AssignedVerbTasks");
                });

            modelBuilder.Entity("Entities.Instances.Task.VerbTask.RelVerbTaskEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Order");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.Property<Guid>("TaskVerbId");

                    b.Property<Guid>("VerbId");

                    b.HasKey("Id");

                    b.HasIndex("TaskVerbId");

                    b.HasIndex("VerbId");

                    b.ToTable("RelVerbTasks");
                });

            modelBuilder.Entity("Entities.Instances.Task.VerbTask.VerbTaskEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.HasKey("Id");

                    b.ToTable("VerbTasks");
                });

            modelBuilder.Entity("Entities.Instances.Task.WordTask.AssignedWordTaskEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("CompleteDate");

                    b.Property<DateTime>("Deadline");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.Property<int>("TaskStatus");

                    b.Property<Guid>("UserId");

                    b.Property<Guid>("WordTaskId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.HasIndex("WordTaskId");

                    b.ToTable("AssignedWordTasks");
                });

            modelBuilder.Entity("Entities.Instances.Task.WordTask.RelTaskWordEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Order");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.Property<Guid>("TaskId");

                    b.Property<Guid>("WordId");

                    b.HasKey("Id");

                    b.HasIndex("TaskId");

                    b.HasIndex("WordId");

                    b.ToTable("RelWordTasks");
                });

            modelBuilder.Entity("Entities.Instances.Task.WordTask.WordTaskEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("IsTranslationTask");

                    b.Property<string>("Name");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.HasKey("Id");

                    b.ToTable("WordTasks");
                });

            modelBuilder.Entity("Entities.Instances.User.ApplicationUserEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp");

                    b.Property<string>("Email");

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail");

                    b.Property<string>("NormalizedUserName");

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<Guid>("UserId");

                    b.Property<string>("UserName");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("ApplicationUsers");
                });

            modelBuilder.Entity("Entities.Instances.User.UserEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<string>("Password");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.Property<int>("UserType");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Entities.Instances.User.UserTokenEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AccessToken");

                    b.Property<bool>("IsActive");

                    b.Property<string>("RefreshToken");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserTokens");
                });

            modelBuilder.Entity("Entities.Instances.Verb.RelAnsweredVerbEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("AnswerId");

                    b.Property<Guid>("AssignedVerbTaskId");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.Property<Guid>("VerbId");

                    b.HasKey("Id");

                    b.HasIndex("AnswerId");

                    b.HasIndex("AssignedVerbTaskId");

                    b.HasIndex("VerbId");

                    b.ToTable("RelAnswerVerb");
                });

            modelBuilder.Entity("Entities.Instances.Verb.VerbAnswerEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("FirstForm");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.Property<string>("SecondForm");

                    b.Property<string>("ThirdForm");

                    b.HasKey("Id");

                    b.ToTable("VerbAnswers");
                });

            modelBuilder.Entity("Entities.Instances.Verb.VerbEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CommonWord");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.HasKey("Id");

                    b.ToTable("Verbs");
                });

            modelBuilder.Entity("Entities.Instances.Word.RelAnswerWordEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("AnswerId");

                    b.Property<Guid>("AssignedTaskId");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.Property<Guid>("WordId");

                    b.HasKey("Id");

                    b.HasIndex("AnswerId");

                    b.HasIndex("AssignedTaskId");

                    b.HasIndex("WordId");

                    b.ToTable("RelAnsweredWords");
                });

            modelBuilder.Entity("Entities.Instances.Word.WordAnswerEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Answer");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.HasKey("Id");

                    b.ToTable("WordAnswers");
                });

            modelBuilder.Entity("Entities.Instances.Word.WordEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.Property<string>("Transcription");

                    b.Property<string>("Translation");

                    b.Property<string>("Word");

                    b.HasKey("Id");

                    b.ToTable("Words");
                });

            modelBuilder.Entity("Entities.Instances.RelWordVerbEntity", b =>
                {
                    b.HasOne("Entities.Instances.Verb.VerbEntity", "Verb")
                        .WithMany("WordVerbs")
                        .HasForeignKey("VerbId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Entities.Instances.Word.WordEntity", "Word")
                        .WithMany("WordVerbEntities")
                        .HasForeignKey("WordId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Entities.Instances.Sentence.RelAnswerSentenceEntity", b =>
                {
                    b.HasOne("Entities.Instances.Task.SentenceTask.AssignedSentenceTaskEntity", "AssignedSentenceTask")
                        .WithMany("AnsweredSentences")
                        .HasForeignKey("AssignedSentenceTaskId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Entities.Instances.Sentence.SentenceAnswerEntity", "Answer")
                        .WithMany("AnsweredSentences")
                        .HasForeignKey("SentenceAnswerId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Entities.Instances.Sentence.SentenceEntity", "Sentence")
                        .WithMany("AnsweredSentences")
                        .HasForeignKey("SentenceId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Entities.Instances.Sentence.SentenceTranslationEntity", b =>
                {
                    b.HasOne("Entities.Instances.Sentence.SentenceEntity", "Sentence")
                        .WithMany("Translations")
                        .HasForeignKey("SentenceId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Entities.Instances.Task.SentenceTask.AssignedSentenceTaskEntity", b =>
                {
                    b.HasOne("Entities.Instances.Task.SentenceTask.SentenceTaskEntity", "SentenceTask")
                        .WithMany("AssignedSentenceTasks")
                        .HasForeignKey("SentenceTaskId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Entities.Instances.User.UserEntity", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Entities.Instances.Task.SentenceTask.RelSentenceTaskEntity", b =>
                {
                    b.HasOne("Entities.Instances.Sentence.SentenceEntity", "Sentence")
                        .WithMany("SentenceTasks")
                        .HasForeignKey("SentenceId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Entities.Instances.Task.SentenceTask.SentenceTaskEntity", "Task")
                        .WithMany("Sentences")
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Entities.Instances.Task.VerbTask.AssignedVerbTaskEntity", b =>
                {
                    b.HasOne("Entities.Instances.User.UserEntity", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Entities.Instances.Task.VerbTask.VerbTaskEntity", "VerbTask")
                        .WithMany("AssignedVerbs")
                        .HasForeignKey("VerbTaskId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Entities.Instances.Task.VerbTask.RelVerbTaskEntity", b =>
                {
                    b.HasOne("Entities.Instances.Task.VerbTask.VerbTaskEntity", "TaskVerb")
                        .WithMany("TaskVerbs")
                        .HasForeignKey("TaskVerbId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Entities.Instances.Verb.VerbEntity", "Verb")
                        .WithMany("VerbTasks")
                        .HasForeignKey("VerbId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Entities.Instances.Task.WordTask.AssignedWordTaskEntity", b =>
                {
                    b.HasOne("Entities.Instances.User.UserEntity", "User")
                        .WithMany("AssignedTasks")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Entities.Instances.Task.WordTask.WordTaskEntity", "WordTask")
                        .WithMany("AssignedWordTasks")
                        .HasForeignKey("WordTaskId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Entities.Instances.Task.WordTask.RelTaskWordEntity", b =>
                {
                    b.HasOne("Entities.Instances.Task.WordTask.WordTaskEntity", "WordTask")
                        .WithMany("TaskWords")
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Entities.Instances.Word.WordEntity", "Word")
                        .WithMany("TaskWords")
                        .HasForeignKey("WordId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Entities.Instances.User.ApplicationUserEntity", b =>
                {
                    b.HasOne("Entities.Instances.User.UserEntity", "User")
                        .WithOne("AppUser")
                        .HasForeignKey("Entities.Instances.User.ApplicationUserEntity", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Entities.Instances.User.UserTokenEntity", b =>
                {
                    b.HasOne("Entities.Instances.User.UserEntity", "User")
                        .WithMany("Tokens")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Entities.Instances.Verb.RelAnsweredVerbEntity", b =>
                {
                    b.HasOne("Entities.Instances.Verb.VerbAnswerEntity", "Answer")
                        .WithMany("AnsweredVerbs")
                        .HasForeignKey("AnswerId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Entities.Instances.Task.VerbTask.AssignedVerbTaskEntity", "AssignedVerbTask")
                        .WithMany("AnsweredVerbs")
                        .HasForeignKey("AssignedVerbTaskId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Entities.Instances.Verb.VerbEntity", "Verb")
                        .WithMany()
                        .HasForeignKey("VerbId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Entities.Instances.Word.RelAnswerWordEntity", b =>
                {
                    b.HasOne("Entities.Instances.Word.WordAnswerEntity", "Answer")
                        .WithMany("AnsweredWords")
                        .HasForeignKey("AnswerId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Entities.Instances.Task.WordTask.AssignedWordTaskEntity", "AssignedWordTask")
                        .WithMany("AnsweredWords")
                        .HasForeignKey("AssignedTaskId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Entities.Instances.Word.WordEntity", "Word")
                        .WithMany("AnsweredWord")
                        .HasForeignKey("WordId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
