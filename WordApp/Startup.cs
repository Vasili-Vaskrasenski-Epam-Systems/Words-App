using AutoMapper;
using BL.Services;
using BL.Services.Task.VerbTaskServices;
using BL.Services.Task.WordTaskServices;
using DAL.Helpers;
using DAL.Infrastructure;
using Entities.Instances;
using Entities.Instances.Task;
using Entities.Instances.Task.VerbTask;
using Entities.Instances.Task.WordTask;
using Entities.Instances.Verb;
using Entities.Instances.Word;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS;
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

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            #region Auth
            services.AddAuthentication(IISServerDefaults.AuthenticationScheme);
            #endregion

            #region AutoMapper
            var mappingConfig = new MapperConfiguration(mc => mc.AddProfile(new MappingRules()));
            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);
            #endregion

            #region DbContext

            var connectionString = Encrypters.Decrypt(Configuration.GetConnectionString("WordsDbConnectionString"));
            services.AddDbContext<WordsDbContext>(opts => opts.UseSqlServer(connectionString));
            
            #endregion

            #region Business Services
            services.AddScoped(typeof(BaseEntityService<WordEntity>), typeof(WordService));
            services.AddScoped(typeof(BaseEntityService<VerbEntity>), typeof(VerbService));
            services.AddScoped(typeof(BaseEntityService<UserEntity>), typeof(UserService));
            services.AddScoped(typeof(BaseEntityService<WordTaskEntity>), typeof(WordTaskService));
            services.AddScoped(typeof(BaseEntityService<AssignedWordTaskEntity>), typeof(AssignedWordTaskService));
            services.AddScoped(typeof(BaseEntityService<VerbTaskEntity>), typeof(VerbTaskService));
            services.AddScoped(typeof(BaseEntityService<AssignedVerbTaskEntity>), typeof(AssignVerbTaskService));
            #endregion

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
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
        }
    }
}
