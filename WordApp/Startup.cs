using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BL.Services;
using BL.Services.Task.SentenceTaskServices;
using BL.Services.Task.VerbTaskServices;
using BL.Services.Task.WordTaskServices;
using BL.Services.User;
using Configuration;
using DAL.Helpers;
using DAL.Infrastructure;
using Entities.Enums;
using Entities.Instances.Sentence;
using Entities.Instances.Task.SentenceTask;
using Entities.Instances.Task.VerbTask;
using Entities.Instances.Task.WordTask;
using Entities.Instances.User;
using Entities.Instances.Verb;
using Entities.Instances.Word;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using WordApp.Infrastructure;

namespace WordApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            #region Auth
                
            services
                .AddAuthentication()
                .AddGoogle(opts =>
                {
                    opts.ClientId =
                        Encrypters.Decrypt((string)this.Configuration.GetValue(typeof(string), Config.GoogleConstants.ClientId));
                    opts.ClientSecret =
                        Encrypters.Decrypt((string)this.Configuration.GetValue(typeof(string), Config.GoogleConstants.ClientSecret));
                });
            #endregion

            #region AutoMapper
            var mappingConfig = new MapperConfiguration(mc => mc.AddProfile(new MappingRules()));
            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);
            #endregion

            #region DbContext
            var connectionString = Encrypters.Decrypt(Configuration.GetConnectionString(Config.WordsDbConnectionStringName));
            services.AddDbContext<IdentityDbContext>(opts => opts.UseSqlServer(connectionString));
            services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<IdentityDbContext>()
                .AddDefaultTokenProviders();

            services.AddDbContext<WordsDbContext>(opts => opts.UseSqlServer(connectionString));
            #endregion

            #region Business Services

            services.AddScoped(typeof(BaseEntityService<WordEntity>), typeof(WordService));
            services.AddScoped(typeof(BaseEntityService<VerbEntity>), typeof(VerbService));
            services.AddScoped(typeof(BaseEntityService<UserEntity>), typeof(UserService));
            services.AddScoped(typeof(BaseEntityService<UserProfileEntity>), typeof(UserProfileService));
            services.AddScoped(typeof(BaseEntityService<WordTaskEntity>), typeof(WordTaskService));
            services.AddScoped(typeof(BaseEntityService<AssignedWordTaskEntity>), typeof(AssignedWordTaskService));
            services.AddScoped(typeof(BaseEntityService<VerbTaskEntity>), typeof(VerbTaskService));
            services.AddScoped(typeof(BaseEntityService<AssignedVerbTaskEntity>), typeof(AssignVerbTaskService));
            services.AddScoped(typeof(BaseEntityService<SentenceEntity>), typeof(SentenceService));
            services.AddScoped(typeof(BaseEntityService<SentenceTaskEntity>), typeof(SentenceTaskService));
            services.AddScoped(typeof(BaseEntityService<AssignedSentenceTaskEntity>), typeof(AssignSentenceTaskService));

            #endregion

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IServiceProvider services)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            loggerFactory.AddLog4Net();


            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });

            this.CreateRoles(services).Wait();
            this.CreateUsers(services).Wait();
        }


        private async Task CreateRoles(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetService<RoleManager<IdentityRole>>();

            var adminRoleExist = await roleManager.RoleExistsAsync(nameof(UserType.Administrator));
            if (!adminRoleExist)
            {
                await roleManager.CreateAsync(new IdentityRole(nameof(UserType.Administrator)));
            }

            var pupilRoleExist = await roleManager.RoleExistsAsync(nameof(UserType.Pupil));
            if (!pupilRoleExist)
            {
                await roleManager.CreateAsync(new IdentityRole(nameof(UserType.Pupil)));
            }

            var teacherRoleExists = await roleManager.RoleExistsAsync(nameof(UserType.Teacher));
            if (!teacherRoleExists)
            {
                await roleManager.CreateAsync(new IdentityRole(nameof(UserType.Teacher)));
            }
        }

        private async Task CreateUsers(IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetService<UserManager<ApplicationUser>>();

            var administratorUser = await userManager.FindByEmailAsync(Config.AdministratorEmailAddress);
            if (administratorUser == null)
            {
                await userManager.CreateAsync(
                     new ApplicationUser()
                     {
                         Email = Config.AdministratorEmailAddress,
                         UserName = Config.AdministratorName
                     }, Encrypters.Decrypt(Config.AdministratorPassword));
                administratorUser = await userManager.FindByEmailAsync(Config.AdministratorEmailAddress);

                var userService = serviceProvider.GetService<BaseEntityService<UserEntity>>();

                userService.CreateEntity(new UserEntity()
                {
                    UserType = UserType.Administrator,
                    Email = Config.AdministratorEmailAddress,
                    Name = Config.AdministratorName,
                    UserProfile = new UserProfileEntity()
                });
            }
            var administratoRoles = await userManager.GetRolesAsync(administratorUser);
            if (administratoRoles.All(r => r != nameof(UserType.Administrator)))
            {
                await userManager.AddToRoleAsync(administratorUser, nameof(UserType.Administrator));
            }
        }
    }
}
