using System.IO;
using System.Reflection;
using AutoMapper;
using BL.Services;
using DAL.Entities;
using DAL.Helpers;
using DAL.Infrastructure;
using log4net;
using log4net.Config;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
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

            //var connectionString = Encrypters.Decrypt(this.Configuration.GetConnectionString("WordsDbConnectionString"));
            var connectionString =
                "Server=10.9.212.240,49172;Database=wordsDatabase; User Id=sa;password=qweasdzxc_123;Trusted_Connection=False;MultipleActiveResultSets=true;";
            services.AddDbContext<WordsDbContext>(opts => opts.UseSqlServer(connectionString));
            #endregion

            #region Business Services
            services.AddScoped(typeof(IEntityService<WordEntity>), typeof(WordService));
            services.AddScoped(typeof(IEntityService<IrregularVerbEntity>), typeof(IrregularVerbService));
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
